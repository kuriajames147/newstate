import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiZap, FiDownload, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';

function Mpesa() {
  const navigate = useNavigate();

  return (
    <div className="mpesa-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft /> Back to Dashboard
        </button>
        <h1><FiCreditCard /> M-PESA Services</h1>
      </div>
      
      <div className="mpesa-services">
        <div className="service-card activate" onClick={() => navigate('/mpesa/activate')}>
          <FiZap className="service-icon" />
          <h3>Activate Account</h3>
          <p>Activate your account to unlock all features</p>
          <div className="service-price">Ksh 250</div>
          <button className="service-btn">Activate Now</button>
        </div>
        
        <div className="service-card deposit" onClick={() => navigate('/mpesa/deposit')}>
          <FiDownload className="service-icon" />
          <h3>Deposit Funds</h3>
          <p>Add funds to your account via M-PESA</p>
          <button className="service-btn">Deposit</button>
        </div>
        
        <div className="service-card withdraw" onClick={() => navigate('/mpesa/withdraw')}>
          <FiRefreshCw className="service-icon" />
          <h3>Withdraw Funds</h3>
          <p>Withdraw your earnings to M-PESA</p>
          <div className="minimum-amount">Minimum: Ksh 100</div>
          <button className="service-btn">Withdraw</button>
        </div>
      </div>
      
      <div className="transaction-history">
        <h2>Recent Transactions</h2>
        <p>View your M-PESA transaction history</p>
        {/* Add transaction history component here */}
      </div>
    </div>
  );
}

export default Mpesa;