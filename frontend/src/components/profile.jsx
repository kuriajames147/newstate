import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiCalendar,
  FiAward, FiTrendingUp, FiShield, FiLock, FiEdit2,
  FiSave, FiCamera, FiCheckCircle, FiClock, FiAlertCircle,
  FiArrowLeft, FiGift, FiStar, FiZap, FiCopy, FiShare2,
  FiSettings, FiCreditCard, FiSmartphone, FiGlobe
} from 'react-icons/fi';
import './profile.css';

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // User data (should come from context/state management)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    joinDate: 'January 15, 2024',
    avatar: 'JD',
    bio: 'Passionate earner and content creator. Love exploring new ways to earn online.',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    language: 'English',
    timezone: 'East Africa Time (EAT)',
    
    // Stats
    earnings: 2450,
    points: 7850,
    referrals: 18,
    rank: 32,
    level: 'Silver',
    streak: 7,
    tasksCompleted: 156,
    daysActive: 45,
    
    // Badges
    badges: [
      { id: 1, name: 'Early Adopter', icon: '🚀', color: '#8b5cf6' },
      { id: 2, name: 'Referral Master', icon: '👥', color: '#10b981' },
      { id: 3, name: 'Task Champion', icon: '🏆', color: '#f59e0b' },
      { id: 4, name: '7-Day Streak', icon: '🔥', color: '#ef4444' },
      { id: 5, name: 'Content Creator', icon: '📝', color: '#3b82f6' },
      { id: 6, name: 'Silver Member', icon: '🥈', color: '#9ca3af' }
    ],
    
    // Account settings
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    
    // Payment methods
    paymentMethods: [
      { id: 1, type: 'mpesa', number: '0712345678', name: 'John Doe', default: true },
      { id: 2, type: 'bank', name: 'Equity Bank', account: '1234567890', default: false }
    ],
    
    // Referral info
    referralCode: 'NEWSTATE123',
    referralLink: 'http://localhost:5173/register?ref=NEWSTATE123',
    
    // Recent activity
    recentActivity: [
      { id: 1, action: 'Completed watching 3 videos', points: '+30', date: '2 hours ago' },
      { id: 2, action: 'Referred a new user', points: '+50', date: '5 hours ago' },
      { id: 3, action: 'Daily spin reward', points: '+100', date: '1 day ago' },
      { id: 4, action: 'Read 2 articles', points: '+30', date: '2 days ago' }
    ]
  });

  const [copied, setCopied] = useState(false);

  // Show toast notification
  const showSimpleToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save profile changes
  const handleSaveProfile = () => {
    setIsEditing(false);
    showSimpleToast('Profile updated successfully!');
  };

  // Copy referral link
  const copyReferralLink = () => {
    navigator.clipboard.writeText(user.referralLink);
    setCopied(true);
    showSimpleToast('Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle two factor
  const toggleTwoFactor = () => {
    setUser(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }));
    showSimpleToast(`2FA ${!user.twoFactorEnabled ? 'enabled' : 'disabled'}`);
  };

  // Get level color
  const getLevelColor = (level) => {
    switch(level) {
      case 'Bronze': return '#cd7f32';
      case 'Silver': return '#c0c0c0';
      case 'Gold': return '#ffd700';
      case 'Platinum': return '#e5e4e2';
      default: return '#c0c0c0';
    }
  };

  return (
    <div className="profile-container">
      {/* Toast Notification */}
      {showToast && (
        <div className="profile-toast">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft /> Back to Dashboard
        </button>
        <h1>My Profile</h1>
        <p>Manage your personal information and account settings</p>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Left Column - Profile Card & Stats */}
        <div className="profile-left">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="avatar-wrapper">
                <div className="profile-avatar">
                  {user.avatar}
                </div>
                <button className="avatar-edit">
                  <FiCamera />
                </button>
              </div>
              
              {!isEditing ? (
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                  <FiEdit2 /> Edit Profile
                </button>
              ) : (
                <button className="save-profile-btn" onClick={handleSaveProfile}>
                  <FiSave /> Save Changes
                </button>
              )}
            </div>

            <div className="profile-info">
              {isEditing ? (
                <div className="profile-edit-form">
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Phone Number"
                  />
                  <input
                    type="text"
                    name="location"
                    value={user.location}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Location"
                  />
                  <textarea
                    name="bio"
                    value={user.bio}
                    onChange={handleInputChange}
                    className="edit-textarea"
                    placeholder="Bio"
                    rows="3"
                  />
                </div>
              ) : (
                <>
                  <h2 className="profile-name">{user.name}</h2>
                  <p className="profile-bio">{user.bio}</p>
                  
                  <div className="profile-details">
                    <div className="detail-item">
                      <FiMail className="detail-icon" />
                      <span>{user.email}</span>
                    </div>
                    <div className="detail-item">
                      <FiPhone className="detail-icon" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="detail-item">
                      <FiMapPin className="detail-icon" />
                      <span>{user.location}</span>
                    </div>
                    <div className="detail-item">
                      <FiCalendar className="detail-icon" />
                      <span>Joined {user.joinDate}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Level Progress */}
            <div className="level-progress">
              <div className="level-header">
                <span className="level-name">
                  <FiStar style={{ color: getLevelColor(user.level) }} />
                  {user.level} Level
                </span>
                <span className="level-points">2,450 / 10,000 pts</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: '24.5%',
                    background: `linear-gradient(90deg, ${getLevelColor(user.level)}, ${getLevelColor(user.level)}dd)`
                  }}
                ></div>
              </div>
              <div className="level-next">
                <span>Next: Gold Level</span>
                <span>7,550 pts needed</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="profile-stats-grid">
              <div className="stat-item">
                <div className="stat-icon earnings">
                  <FiTrendingUp />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Total Earnings</span>
                  <span className="stat-value">Ksh {user.earnings.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon points">
                  <FiAward />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Points</span>
                  <span className="stat-value">{user.points.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon referrals">
                  <FiUser />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Referrals</span>
                  <span className="stat-value">{user.referrals}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon rank">
                  <FiZap />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Global Rank</span>
                  <span className="stat-value">#{user.rank}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon streak">
                  <FiCalendar />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Day Streak</span>
                  <span className="stat-value">{user.streak} days</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon tasks">
                  <FiCheckCircle />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Tasks Done</span>
                  <span className="stat-value">{user.tasksCompleted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="badges-section">
            <h3>Earned Badges</h3>
            <div className="badges-grid">
              {user.badges.map((badge) => (
                <div key={badge.id} className="badge-item">
                  <div className="badge-icon" style={{ backgroundColor: badge.color + '20', color: badge.color }}>
                    {badge.icon}
                  </div>
                  <span className="badge-name">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Tabs Content */}
        <div className="profile-right">
          {/* Tabs Navigation */}
          <div className="profile-tabs">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
            <button
              className={`tab-btn ${activeTab === 'referrals' ? 'active' : ''}`}
              onClick={() => setActiveTab('referrals')}
            >
              Referrals
            </button>
            <button
              className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="overview-tab">
                {/* Personal Info */}
                <div className="info-section">
                  <h4>Personal Information</h4>
                  <div className="info-grid">
                    <div className="info-row">
                      <span>Full Name</span>
                      <strong>{user.name}</strong>
                    </div>
                    <div className="info-row">
                      <span>Email Address</span>
                      <strong>{user.email}</strong>
                    </div>
                    <div className="info-row">
                      <span>Phone Number</span>
                      <strong>{user.phone}</strong>
                    </div>
                    <div className="info-row">
                      <span>Date of Birth</span>
                      <strong>{user.dateOfBirth}</strong>
                    </div>
                    <div className="info-row">
                      <span>Gender</span>
                      <strong>{user.gender}</strong>
                    </div>
                    <div className="info-row">
                      <span>Location</span>
                      <strong>{user.location}</strong>
                    </div>
                    <div className="info-row">
                      <span>Language</span>
                      <strong>{user.language}</strong>
                    </div>
                    <div className="info-row">
                      <span>Timezone</span>
                      <strong>{user.timezone}</strong>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="info-section">
                  <div className="section-header">
                    <h4>Payment Methods</h4>
                    <button className="add-btn">Add New</button>
                  </div>
                  <div className="payment-methods">
                    {user.paymentMethods.map((method) => (
                      <div key={method.id} className="payment-method-card">
                        <div className="method-icon">
                          {method.type === 'mpesa' ? <FiSmartphone /> : <FiCreditCard />}
                        </div>
                        <div className="method-details">
                          <div className="method-name">
                            {method.type === 'mpesa' ? 'M-Pesa' : 'Bank Account'}
                            {method.default && <span className="default-badge">Default</span>}
                          </div>
                          <div className="method-info">
                            {method.type === 'mpesa' ? method.number : method.account}
                          </div>
                        </div>
                        <button className="method-actions">•••</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="account-tab">
                {/* Security Settings */}
                <div className="info-section">
                  <h4>Security Settings</h4>
                  <div className="settings-list">
                    <div className="setting-item">
                      <div className="setting-info">
                        <FiLock className="setting-icon" />
                        <div>
                          <div className="setting-name">Two-Factor Authentication</div>
                          <div className="setting-desc">Add an extra layer of security to your account</div>
                        </div>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={user.twoFactorEnabled}
                          onChange={toggleTwoFactor}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <FiShield className="setting-icon" />
                        <div>
                          <div className="setting-name">Change Password</div>
                          <div className="setting-desc">Update your password regularly</div>
                        </div>
                      </div>
                      <button className="setting-action">Change</button>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="info-section">
                  <h4>Notification Preferences</h4>
                  <div className="settings-list">
                    <div className="setting-item">
                      <div className="setting-info">
                        <FiMail className="setting-icon" />
                        <div>
                          <div className="setting-name">Email Notifications</div>
                          <div className="setting-desc">Receive updates via email</div>
                        </div>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={user.emailNotifications}
                          onChange={() => setUser(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <FiPhone className="setting-icon" />
                        <div>
                          <div className="setting-name">SMS Notifications</div>
                          <div className="setting-desc">Get alerts on your phone</div>
                        </div>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={user.smsNotifications}
                          onChange={() => setUser(prev => ({ ...prev, smsNotifications: !prev.smsNotifications }))}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <FiGlobe className="setting-icon" />
                        <div>
                          <div className="setting-name">Marketing Emails</div>
                          <div className="setting-desc">Receive promotions and offers</div>
                        </div>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={user.marketingEmails}
                          onChange={() => setUser(prev => ({ ...prev, marketingEmails: !prev.marketingEmails }))}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="info-section">
                  <h4>Account Actions</h4>
                  <div className="account-actions">
                    <button className="action-btn download">
                      Download Account Data
                    </button>
                    <button className="action-btn deactivate">
                      Deactivate Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Referrals Tab */}
            {activeTab === 'referrals' && (
              <div className="referrals-tab">
                {/* Referral Link */}
                <div className="info-section">
                  <h4>Your Referral Link</h4>
                  <div className="referral-link-container">
                    <input 
                      type="text" 
                      value={user.referralLink} 
                      readOnly 
                      className="referral-link-input"
                    />
                    <button 
                      className={`copy-link-btn ${copied ? 'copied' : ''}`}
                      onClick={copyReferralLink}
                    >
                      <FiCopy /> {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  
                  <div className="share-buttons">
                    <button className="share-btn whatsapp">
                      <FiShare2 /> WhatsApp
                    </button>
                    <button className="share-btn telegram">
                      <FiShare2 /> Telegram
                    </button>
                    <button className="share-btn facebook">
                      <FiShare2 /> Facebook
                    </button>
                    <button className="share-btn twitter">
                      <FiShare2 /> Twitter
                    </button>
                  </div>
                </div>

                {/* Referral Stats */}
                <div className="info-section">
                  <h4>Referral Statistics</h4>
                  <div className="referral-stats">
                    <div className="stat-box">
                      <span className="stat-label">Total Referrals</span>
                      <span className="stat-value">{user.referrals}</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-label">Active Referrals</span>
                      <span className="stat-value">15</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-label">Pending</span>
                      <span className="stat-value">3</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-label">Earnings</span>
                      <span className="stat-value">Ksh 900</span>
                    </div>
                  </div>
                </div>

                {/* Referral List */}
                <div className="info-section">
                  <h4>Recent Referrals</h4>
                  <div className="referral-list">
                    <div className="referral-item">
                      <div className="referral-avatar">SA</div>
                      <div className="referral-details">
                        <div className="referral-name">Sarah Akinyi</div>
                        <div className="referral-date">Joined 2 days ago</div>
                      </div>
                      <div className="referral-status active">
                        <FiCheckCircle /> Active
                      </div>
                    </div>
                    <div className="referral-item">
                      <div className="referral-avatar">MO</div>
                      <div className="referral-details">
                        <div className="referral-name">Mike Otieno</div>
                        <div className="referral-date">Joined 5 days ago</div>
                      </div>
                      <div className="referral-status pending">
                        <FiClock /> Pending
                      </div>
                    </div>
                    <div className="referral-item">
                      <div className="referral-avatar">JW</div>
                      <div className="referral-details">
                        <div className="referral-name">Jane Wanjiku</div>
                        <div className="referral-date">Joined 1 week ago</div>
                      </div>
                      <div className="referral-status active">
                        <FiCheckCircle /> Active
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="activity-tab">
                <div className="info-section">
                  <h4>Recent Activity</h4>
                  <div className="activity-timeline">
                    {user.recentActivity.map((activity) => (
                      <div key={activity.id} className="timeline-item">
                        <div className="timeline-icon">
                          <FiCheckCircle />
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-title">{activity.action}</div>
                          <div className="timeline-meta">
                            <span className="timeline-points">{activity.points} points</span>
                            <span className="timeline-date">{activity.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Summary */}
                <div className="info-section">
                  <h4>Activity Summary</h4>
                  <div className="activity-summary">
                    <div className="summary-item">
                      <span>Videos Watched</span>
                      <strong>47</strong>
                    </div>
                    <div className="summary-item">
                      <span>Articles Read</span>
                      <strong>32</strong>
                    </div>
                    <div className="summary-item">
                      <span>Spins Completed</span>
                      <strong>18</strong>
                    </div>
                    <div className="summary-item">
                      <span>Referrals Made</span>
                      <strong>18</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;