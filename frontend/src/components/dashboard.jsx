import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiGift, FiPlayCircle, FiBookOpen,
  FiDollarSign, FiLogOut, FiCopy, FiTrendingUp, FiAward,
  FiZap, FiBell, FiChevronRight, FiCheckCircle, FiClock,
  FiActivity, FiArrowUp, FiShare2, FiMenu, FiX,
  FiSearch, FiSettings, FiHelpCircle, FiBarChart2,
  FiUser, FiCreditCard, FiShield,  FiExternalLink
} from 'react-icons/fi';
import './dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [notifications] = useState(3);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'JD',
    referralCode: 'NEWSTATE123',
    isActivated: false,
    earnings: 2450,
    points: 7850,
    referrals: 18,
    rank: 32,
    level: 'Silver',
    streak: 7,
    phone: '+254 712 345 678'
  };

  const [loading, setLoading] = useState(true);

  // Show toast notification
  const showSimpleToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Copy referral link
  const copyReferralLink = () => {
    const link = `http://localhost:5173/register?ref=${user.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    showSimpleToast('Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Navigation functions
  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    showSimpleToast('Logged out successfully!');
    setTimeout(() => navigate('/login'), 1000);
  };

  const activateAccount = () => {
    showSimpleToast('Redirecting to activation...');
    setTimeout(() => navigate('/activate'), 1000);
  };

  const shareReferral = (platform) => {
    const message = `Join NewStateHela12 and start earning! Use my referral code: ${user.referralCode}`;
    const link = `http://localhost:5173/register?ref=${user.referralCode}`;
    
    let shareUrl = '';
    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + ' ' + link)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('Join using my referral!')}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
    }
    
    window.open(shareUrl, '_blank');
    showSimpleToast(`Sharing via ${platform}...`);
  };

  // Mock data
  const stats = [
    {
      id: 1,
      title: 'Total Earnings',
      value: `Ksh ${user.earnings.toLocaleString()}`,
      change: '+12.5%',
      isPositive: true,
      icon: <FiTrendingUp />,
      color: 'primary',
      trend: [30, 40, 35, 50, 49, 60, 70]
    },
    {
      id: 2,
      title: 'Referrals',
      value: user.referrals,
      change: '+18%',
      isPositive: true,
      icon: <FiUsers />,
      color: 'success',
      trend: [10, 12, 15, 18, 14, 16, 18]
    },
    {
      id: 3,
      title: 'Points Earned',
      value: user.points.toLocaleString(),
      change: '+450',
      isPositive: true,
      icon: <FiAward />,
      color: 'warning',
      trend: [200, 300, 400, 500, 600, 700, 785]
    },
    {
      id: 4,
      title: 'Current Rank',
      value: `#${user.rank}`,
      change: '↑ 5',
      isPositive: true,
      icon: <FiZap />,
      color: 'secondary',
      trend: [50, 45, 40, 38, 35, 33, 32]
    }
  ];

  const activities = [
    {
      id: 1,
      title: 'Refer Friends',
      description: 'Invite friends and earn ksh50  for each successful referral',
      icon: <FiUsers />,
      reward: 'Ksh 50 per referral',
      time: '5 mins',
      points: '+50',
      color: 'referrals',
      status: 'active',
      path: '/Referrals'
    },
    {
      id: 2,
      title: 'Spin & Win',
      description: 'Spin daily to win exciting rewards and bonus points',
      icon: <FiGift />,
      reward: 'Daily free spin',
      time: '2 mins',
      points: '+100',
      color: 'spin',
      status: 'available',
      path: '/spin'
    },
    {
      id: 3,
      title: 'Watch Videos',
      description: 'Watch short videos and earn points for each view',
      icon: <FiPlayCircle />,
      reward: 'Ksh 10 per video',
      time: '3-5 mins',
      points: '+25',
      color: 'watch',
      status: 'active',
      path: '/watch'
    },
    {
      id: 4,
      title: 'Read Articles',
      description: 'Read articles and earn points while learning',
      icon: <FiBookOpen />,
      reward: 'Ksh 15 per article',
      time: '10 mins',
      points: '+35',
      color: 'read',
      status: 'available',
      path: '/read'
    },
    {
      id: 5,
      title: 'Daily Check-in',
      description: 'Check in daily to maintain your streak and earn bonus points',
      icon: <FiClock />,
      reward: 'Streak bonus',
      time: '1 min',
      points: '+10',
      color: 'streak',
      status: 'pending',
      path: '/daily'
    },
    {
      id: 6,
      title: 'Withdraw Earnings',
      description: 'Convert your points to real money and withdraw instantly',
      icon: <FiDollarSign />,
      reward: 'Instant withdrawal',
      time: '2 mins',
      points: 'Cash out',
      color: 'withdraw',
      status: 'available',
      path: '/withdraw'
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      title: 'Earned 50 points from referral', 
      time: '2 hours ago', 
      type: 'earnings',
      points: '+50',
      icon: <FiTrendingUp />
    },
    { 
      id: 2, 
      title: 'Completed daily spin', 
      time: '5 hours ago', 
      type: 'spin',
      points: '+100',
      icon: <FiGift />
    },
    { 
      id: 3, 
      title: 'Watched 3 videos', 
      time: '1 day ago', 
      type: 'watch',
      points: '+30',
      icon: <FiPlayCircle />
    },
    { 
      id: 4, 
      title: 'Read 2 articles', 
      time: '2 days ago', 
      type: 'read',
      points: '+30',
      icon: <FiBookOpen />
    }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
    { id: 'referrals', label: 'Referrals', icon: <FiUsers />, path: '/referrals', badge: user.referrals },
    { id: 'spin', label: 'Spin & Win', icon: <FiGift />, path: '/spin' },
    { id: 'watch', label: 'Watch & Earn', icon: <FiPlayCircle />, path: '/watch' },
    { id: 'read', label: 'Read & Earn', icon: <FiBookOpen />, path: '/read' },
    { id: 'withdraw', label: 'Withdraw', icon: <FiDollarSign />, path: '/withdraw' },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 />, path: '/analytics' },
    { id: 'profile', label: 'Profile', icon: <FiUser />, path: '/profile' },
    { id: 'settings', label: 'Settings', icon: <FiSettings />, path: '/settings' },
    { id: 'help', label: 'Help Center', icon: <FiHelpCircle />, path: '/help' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Simple Toast */}
      {showToast && (
        <div className="simple-toast">
          {toastMessage}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo">
              <span className="logo-icon">💎</span>
              <span className="logo-text">NewStateHela</span>
            </div>
            <span className="logo-badge">PRO</span>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        {/* User Profile */}
        <div className="user-profile-sidebar">
          <div className="user-avatar-large">
            {user.avatar}
          </div>
          <div className="user-info">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
          </div>
          <div className="user-level">
            <span className="level-badge">⭐ {user.level}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item ${window.location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.path)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge">+{item.badge}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
          <div className="sidebar-version">
            v1.0.0 • © 2024
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
              <FiMenu />
            </button>
            
            <div className={`search-container ${searchOpen ? 'open' : ''}`}>
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search dashboard..." 
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          </div>

          <div className="header-right">
            <button className="notification-btn">
              <FiBell />
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </button>

            <div className="quick-stats">
              <div className="stat">
                <span className="stat-label">Balance</span>
                <span className="stat-value">Ksh {user.earnings.toLocaleString()}</span>
              </div>
            </div>

            <div className="user-menu-container">
              <button 
                className="user-menu-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="user-avatar-small">
                  {user.avatar}
                </div>
                <div className="user-info-small">
                  <span className="user-name-small">{user.name}</span>
                  <span className="user-status-small">
                    {user.isActivated ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <span className={`dropdown-icon ${userMenuOpen ? 'open' : ''}`}>▼</span>
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {user.avatar}
                    </div>
                    <div>
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={() => handleNavigate('/profile')}>
                    <FiUser /> Profile Settings
                  </button>
                  <button className="dropdown-item" onClick={() => handleNavigate('/settings')}>
                    <FiShield /> Account Security
                  </button>
                  <button className="dropdown-item" onClick={() => handleNavigate('/withdraw')}>
                    <FiCreditCard /> Billing & Payments
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="dashboard-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <div className="welcome-card">
              <div className="welcome-header">
                <div className="welcome-text">
                  <h1>Welcome back, <span className="user-name-highlight">{user.name}</span>! 👋</h1>
                  <p className="welcome-subtitle">Here's what's happening with your account today.</p>
                </div>
                <div className={`account-status ${user.isActivated ? 'active' : 'inactive'}`}>
                  {user.isActivated ? (
                    <>
                      <FiCheckCircle /> Account Activated
                    </>
                  ) : (
                    <>
                      <FiClock /> Account Inactive
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.id} className={`stat-card ${stat.color}`}>
                <div className="stat-header">
                  <div className="stat-title">{stat.title}</div>
                  <div className={`stat-icon ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                    {stat.isPositive ? <FiArrowUp /> : <FiArrowDown />}
                    {stat.change}
                  </div>
                </div>
                
                <div className="stat-trend">
                  <div className="trend-chart">
                    {stat.trend.map((value, i) => (
                      <div 
                        key={i}
                        className="trend-bar"
                        style={{ 
                          height: `${(value / Math.max(...stat.trend)) * 30}px`
                        }}
                      />
                    ))}
                  </div>
                  <div className="trend-label">Last 7 days</div>
                </div>
              </div>
            ))}
          </div>

          {/* Referral Section */}
          <div className="referral-section">
            <div className="referral-card">
              <div className="referral-header">
                <div className="header-content">
                  <h2>Invite Friends & Earn More</h2>
                  <p>Share your referral link and earn Ksh 50 for every friend who joins</p>
                </div>
                <div className="referral-code-display">
                  <span className="code-label">Your Code:</span>
                  <span className="code-value">{user.referralCode}</span>
                </div>
              </div>

              <div className="referral-link-container">
                <div className="link-input-wrapper">
                  <input 
                    type="text" 
                    readOnly 
                    value={`http://localhost:5173/register?ref=${user.referralCode}`}
                    className="referral-link-input"
                  />
                  <button 
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={copyReferralLink}
                  >
                    <FiCopy /> {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>

              <div className="share-section">
                <h3>Share via</h3>
                <div className="share-buttons">
                  <button className="share-btn" onClick={() => shareReferral('whatsapp')}>
                    <FiShare2 /> WhatsApp
                  </button>
                  <button className="share-btn" onClick={() => shareReferral('telegram')}>
                    <FiShare2 /> Telegram
                  </button>
                  <button className="share-btn" onClick={() => shareReferral('facebook')}>
                    <FiShare2 /> Facebook
                  </button>
                  <button className="share-btn" onClick={() => shareReferral('twitter')}>
                    <FiShare2 /> Twitter
                  </button>
                </div>
              </div>

              <div className="referral-stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">
                    <FiUsers />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{user.referrals}</div>
                    <div className="stat-label">Total Referrals</div>
                  </div>
                  <div className="stat-change positive">
                    +3
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <FiTrendingUp />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">Ksh {user.referrals * 50}</div>
                    <div className="stat-label">Earned from Referrals</div>
                  </div>
                  <div className="stat-change positive">
                    +Ksh 150
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <FiAward />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">Ksh 0</div>
                    <div className="stat-label">Pending Referrals</div>
                  </div>
                  <div className="stat-change">
                    0
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <FiTrendingUp />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">42%</div>
                    <div className="stat-label">Conversion Rate</div>
                  </div>
                  <div className="stat-change positive">
                    +5%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activation Banner */}
          {!user.isActivated && (
            <div className="activation-banner">
              <div className="activation-content">
                <div className="activation-icon">🚀</div>
                <div className="activation-text">
                  <h3>Unlock Full Potential</h3>
                  <p>Activate your account to access all features and increase earning limits</p>
                </div>
                <button 
                  className="activate-button"
                  onClick={activateAccount}
                >
                  <FiDollarSign /> Activate Now - Ksh 250
                </button>
              </div>
            </div>
          )}

          {/* Activities Grid */}
          <div className="activities-section">
            <div className="section-header">
              <h2>Earning Activities</h2>
              <p className="section-subtitle">Complete these activities to earn more points</p>
            </div>
            
            <div className="activities-grid">
              {activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="activity-card"
                  onClick={() => handleNavigate(activity.path)}
                >
                  <div className="card-header">
                    <div 
                      className="activity-icon-wrapper"
                      style={{ 
                        background: activity.color === 'referrals' ? '#6366f1' :
                                   activity.color === 'spin' ? '#10b981' :
                                   activity.color === 'watch' ? '#f59e0b' :
                                   activity.color === 'read' ? '#8b5cf6' :
                                   activity.color === 'streak' ? '#3b82f6' : '#ec4899'
                      }}
                    >
                      {activity.icon}
                    </div>
                    <div className="activity-status">
                      <span className={`status-badge ${activity.status}`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>

                  <div className="card-content">
                    <h3 className="activity-title">{activity.title}</h3>
                    <p className="activity-description">{activity.description}</p>
                    
                    <div className="activity-meta">
                      <div className="meta-item">
                        <FiAward className="meta-icon" />
                        <span>{activity.reward}</span>
                      </div>
                      <div className="meta-item">
                        <FiClock className="meta-icon" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="points-badge">
                      <FiZap />
                      <span>{activity.points}</span>
                    </div>
                    <button className="start-btn">
                      Start <FiChevronRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
              <button className="view-all" onClick={() => handleNavigate('/activity')}>
                View All <FiExternalLink />
              </button>
            </div>
            
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon-small">
                    {activity.icon}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title-small">{activity.title}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                  <div className="activity-points">
                    <span className="points-badge">{activity.points}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;