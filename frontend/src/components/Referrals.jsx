import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiCheckCircle, FiClock, FiDollarSign, FiArrowLeft } from 'react-icons/fi';

function Referrals() {
  const navigate = useNavigate();
  
  const referralsData = {
    total: 18,
    active: 12,
    pending: 6,
    earnings: 600
  };

  return (
    <div className="referrals-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft /> Back to Dashboard
        </button>
        <h1><FiUsers /> Referrals</h1>
      </div>
      
      <div className="referrals-stats">
        <div className="stat-card">
          <FiUsers className="stat-icon" />
          <h3>Total Referrals</h3>
          <p className="stat-value">{referralsData.total}</p>
        </div>
        
        <div className="stat-card success">
          <FiCheckCircle className="stat-icon" />
          <h3>Active Referrals</h3>
          <p className="stat-value">{referralsData.active}</p>
        </div>
        
        <div className="stat-card warning">
          <FiClock className="stat-icon" />
          <h3>Pending Referrals</h3>
          <p className="stat-value">{referralsData.pending}</p>
        </div>
        
        <div className="stat-card primary">
          <FiDollarSign className="stat-icon" />
          <h3>Total Earnings</h3>
          <p className="stat-value">Ksh {referralsData.earnings}</p>
        </div>
      </div>
      
      <div className="referrals-list">
        <h2>Your Referrals</h2>
        <p>Manage and track your referred users here</p>
        {/* Add referral list component here */}
      </div>
    </div>
  );
}

export default Referrals;