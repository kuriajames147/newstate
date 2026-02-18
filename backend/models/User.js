const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      User.hasMany(models.Transaction, {
        foreignKey: 'userId',
        as: 'transactions'
      });
    }

    // Instance method to verify password
    async verifyPassword(password) {
      return await bcrypt.compare(password, this.password_hash);
    }

    // Instance method to get dashboard stats
    async getDashboardStats() {
      const userId = this.id;
      
      // Get recent activities
      const activities = await sequelize.query(
        `SELECT * FROM activities 
         WHERE user_id = ? 
         ORDER BY created_at DESC 
         LIMIT 10`,
        {
          replacements: [userId],
          type: sequelize.QueryTypes.SELECT
        }
      );

      // Get referral stats
      const referralStats = await sequelize.query(
        `SELECT 
            COUNT(*) as total_referrals,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_referrals,
            SUM(earned_points) as total_points_from_referrals
         FROM referrals 
         WHERE referrer_id = ?`,
        {
          replacements: [userId],
          type: sequelize.QueryTypes.SELECT,
          plain: true
        }
      );

      // Get today's earnings
      const todayEarnings = await sequelize.query(
        `SELECT COALESCE(SUM(amount), 0) as today_earnings
         FROM transactions 
         WHERE user_id = ? 
         AND DATE(created_at) = DATE('now')
         AND status = 'completed'`,
        {
          replacements: [userId],
          type: sequelize.QueryTypes.SELECT,
          plain: true
        }
      );

      return {
        user: {
          id: this.id,
          username: this.username,
          email: this.email,
          full_name: this.full_name,
          points: this.points,
          referrals: this.referrals,
          total_earnings: this.total_earnings,
          referral_code: this.referral_code
        },
        activities,
        referral_stats: referralStats || { total_referrals: 0, completed_referrals: 0, total_points_from_referrals: 0 },
        today_earnings: todayEarnings?.today_earnings || 0
      };
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referral_code: {
      type: DataTypes.STRING,
      unique: true
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    referrals: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    total_earnings: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    last_login: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password_hash) {
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
        // Generate referral code
        if (!user.referral_code) {
          user.referral_code = user.username.slice(0, 4).toUpperCase() + 
                              Math.floor(1000 + Math.random() * 9000);
        }
      }
    }
  });

  return User;
};