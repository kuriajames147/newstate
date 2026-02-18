import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiDollarSign, FiCreditCard, FiSmartphone, FiBank,
  FiCheckCircle, FiClock, FiAlertCircle, FiArrowLeft,
  FiInfo, FiTrendingUp, FiShield, FiLock, FiCopy,
  FiExternalLink, FiChevronRight, FiGift
} from 'react-icons/fi';
import './withdraw.css';

function Withdraw() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('mpesa');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [step, setStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  // User data (should come from context/state management)
  const user = {
    balance: 2450,
    points: 7850,
    minWithdraw: 100,
    maxWithdraw: 5000,
    pendingWithdrawals: 0,
    totalWithdrawn: 12500,
    phone: '+254 712 345 678',
    bankAccount: {
      bank: 'Equity Bank',
      accountName: 'John Doe',
      accountNumber: '1234567890'
    },
    mpesa: {
      name: 'John Doe',
      phone: '0712345678'
    },
    withdrawalHistory: [
      { id: 1, amount: 500, method: 'M-Pesa', status: 'completed', date: '2024-01-15', reference: 'MPE123456' },
      { id: 2, amount: 1000, method: 'Bank', status: 'completed', date: '2024-01-10', reference: 'BNK789012' },
      { id: 3, amount: 250, method: 'M-Pesa', status: 'pending', date: '2024-01-18', reference: 'MPE345678' }
    ]
  };

  const withdrawalMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: <FiSmartphone />,
      description: 'Instant withdrawal to your M-Pesa',
      fee: 'Ksh 0',
      min: 100,
      max: 5000,
      processingTime: 'Instant',
      color: '#00a1b0'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <FiBank />,
      description: '1-3 business days to your bank',
      fee: 'Ksh 50',
      min: 500,
      max: 50000,
      processingTime: '1-3 days',
      color: '#3b82f6'
    },
    {
      id: 'card',
      name: 'Visa/Mastercard',
      icon: <FiCreditCard />,
      description: 'Withdraw to your debit/credit card',
      fee: '2%',
      min: 1000,
      max: 25000,
      processingTime: '2-5 days',
      color: '#10b981'
    }
  ];

  // Quick amount suggestions
  const quickAmounts = [100, 250, 500, 1000, 2000, 5000];

  // Show toast notification
  const showSimpleToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle amount selection
  const handleAmountSelect = (amount) => {
    setWithdrawAmount(amount.toString());
  };

  // Handle withdraw submission
  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    // Validation
    if (!withdrawAmount || amount < user.minWithdraw) {
      showSimpleToast(`Minimum withdrawal is Ksh ${user.minWithdraw}`);
      return;
    }
    
    if (amount > user.maxWithdraw) {
      showSimpleToast(`Maximum withdrawal is Ksh ${user.maxWithdraw}`);
      return;
    }
    
    if (amount > user.balance) {
      showSimpleToast('Insufficient balance');
      return;
    }

    setProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      setStep(3); // Success step
      showSimpleToast('Withdrawal request submitted successfully!');
    }, 2000);
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showSimpleToast('Copied to clipboard!');
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'status-success';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      default: return '';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <FiCheckCircle />;
      case 'pending': return <FiClock />;
      case 'failed': return <FiAlertCircle />;
      default: return null;
    }
  };

  return (
    <div className="withdraw-container">
      {/* Toast Notification */}
      {showToast && (
        <div className="withdraw-toast">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="withdraw-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft /> Back to Dashboard
        </button>
        <h1>Withdraw Earnings</h1>
        <p>Convert your points to real money</p>
      </div>

      {/* Balance Cards */}
      <div className="balance-cards">
        <div className="balance-card">
          <div className="balance-icon">
            <FiDollarSign />
          </div>
          <div className="balance-info">
            <span className="balance-label">Available Balance</span>
            <span className="balance-value">Ksh {user.balance.toLocaleString()}</span>
          </div>
        </div>

        <div className="balance-card">
          <div className="balance-icon points">
            <FiGift />
          </div>
          <div className="balance-info">
            <span className="balance-label">Points Balance</span>
            <span className="balance-value">{user.points.toLocaleString()} pts</span>
          </div>
          <div className="balance-note">100 pts = Ksh 1</div>
        </div>
      </div>

      {/* Main Withdraw Card */}
      <div className="withdraw-card">
        {step === 1 && (
          <>
            <div className="card-title">
              <h2>Select Withdrawal Method</h2>
              <p>Choose how you want to receive your money</p>
            </div>

            <div className="methods-grid">
              {withdrawalMethods.map((method) => (
                <div
                  key={method.id}
                  className={`method-card ${selectedMethod === method.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="method-header">
                    <div className="method-icon" style={{ backgroundColor: method.color + '20', color: method.color }}>
                      {method.icon}
                    </div>
                    <div className="method-name">{method.name}</div>
                  </div>
                  
                  <div className="method-details">
                    <div className="method-detail">
                      <span>Fee</span>
                      <strong>{method.fee}</strong>
                    </div>
                    <div className="method-detail">
                      <span>Min/Max</span>
                      <strong>Ksh {method.min} - {method.max}</strong>
                    </div>
                    <div className="method-detail">
                      <span>Processing</span>
                      <strong>{method.processingTime}</strong>
                    </div>
                  </div>

                  <div className="method-description">
                    {method.description}
                  </div>
                </div>
              ))}
            </div>

            <div className="action-buttons">
              <button
                className="continue-button"
                onClick={() => setStep(2)}
              >
                Continue <FiChevronRight />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="card-title">
              <h2>Enter Withdrawal Amount</h2>
              <p>Minimum: Ksh {user.minWithdraw} | Maximum: Ksh {user.maxWithdraw}</p>
            </div>

            {/* Quick Amounts */}
            <div className="quick-amounts">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  className={`quick-amount-btn ${parseFloat(withdrawAmount) === amount ? 'active' : ''}`}
                  onClick={() => handleAmountSelect(amount)}
                >
                  Ksh {amount}
                </button>
              ))}
            </div>

            {/* Amount Input */}
            <div className="amount-input-group">
              <span className="currency">Ksh</span>
              <input
                type="number"
                className="amount-input"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min={user.minWithdraw}
                max={user.maxWithdraw}
              />
            </div>

            {/* Selected Method Details */}
            <div className="selected-method-details">
              <h3>Withdrawal Details</h3>
              
              {selectedMethod === 'mpesa' && (
                <div className="method-detail-card">
                  <div className="detail-row">
                    <span>M-Pesa Number</span>
                    <strong>{user.mpesa.phone}</strong>
                    <button className="copy-btn" onClick={() => copyToClipboard(user.mpesa.phone)}>
                      <FiCopy />
                    </button>
                  </div>
                  <div className="detail-row">
                    <span>Account Name</span>
                    <strong>{user.mpesa.name}</strong>
                  </div>
                </div>
              )}

              {selectedMethod === 'bank' && (
                <div className="method-detail-card">
                  <div className="detail-row">
                    <span>Bank</span>
                    <strong>{user.bankAccount.bank}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Account Name</span>
                    <strong>{user.bankAccount.accountName}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Account Number</span>
                    <strong>{user.bankAccount.accountNumber}</strong>
                    <button className="copy-btn" onClick={() => copyToClipboard(user.bankAccount.accountNumber)}>
                      <FiCopy />
                    </button>
                  </div>
                </div>
              )}

              {selectedMethod === 'card' && (
                <div className="method-detail-card">
                  <div className="card-inputs">
                    <input type="text" placeholder="Card Number" className="card-input" />
                    <div className="card-row">
                      <input type="text" placeholder="MM/YY" className="card-input small" />
                      <input type="text" placeholder="CVV" className="card-input small" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="withdrawal-summary">
              <div className="summary-row">
                <span>Amount</span>
                <strong>Ksh {parseFloat(withdrawAmount).toLocaleString() || '0'}</strong>
              </div>
              <div className="summary-row">
                <span>Fee</span>
                <strong>
                  {selectedMethod === 'mpesa' && 'Ksh 0'}
                  {selectedMethod === 'bank' && 'Ksh 50'}
                  {selectedMethod === 'card' && '2%'}
                </strong>
              </div>
              <div className="summary-row total">
                <span>You'll Receive</span>
                <strong>
                  Ksh {parseFloat(withdrawAmount) - (selectedMethod === 'bank' ? 50 : selectedMethod === 'card' ? parseFloat(withdrawAmount) * 0.02 : 0) || '0'}
                </strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="back-step-btn" onClick={() => setStep(1)}>
                Back
              </button>
              <button
                className={`withdraw-button ${processing ? 'processing' : ''}`}
                onClick={handleWithdraw}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Confirm Withdrawal'}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="success-step">
            <div className="success-icon">
              <FiCheckCircle />
            </div>
            <h2>Withdrawal Initiated!</h2>
            <p>Your withdrawal request has been submitted successfully</p>
            
            <div className="success-details">
              <div className="detail-box">
                <span>Amount</span>
                <strong>Ksh {parseFloat(withdrawAmount).toLocaleString()}</strong>
              </div>
              <div className="detail-box">
                <span>Method</span>
                <strong>{withdrawalMethods.find(m => m.id === selectedMethod)?.name}</strong>
              </div>
              <div className="detail-box">
                <span>Reference</span>
                <strong>WD{Math.floor(Math.random() * 1000000)}</strong>
              </div>
              <div className="detail-box">
                <span>Processing Time</span>
                <strong>{withdrawalMethods.find(m => m.id === selectedMethod)?.processingTime}</strong>
              </div>
            </div>

            <div className="action-buttons">
              <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </button>
              <button className="new-withdrawal-btn" onClick={() => { setStep(1); setWithdrawAmount(''); }}>
                New Withdrawal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Withdrawal History */}
      <div className="withdrawal-history">
        <div className="history-header">
          <h3>Withdrawal History</h3>
          <button className="view-all-btn">
            View All <FiExternalLink />
          </button>
        </div>

        <div className="history-list">
          {user.withdrawalHistory.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-icon">
                {item.method === 'M-Pesa' ? <FiSmartphone /> : <FiBank />}
              </div>
              <div className="history-details">
                <div className="history-title">
                  <span className="history-amount">Ksh {item.amount}</span>
                  <span className={`history-status ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)} {item.status}
                  </span>
                </div>
                <div className="history-meta">
                  <span>{item.method}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="history-ref">{item.reference}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Information Cards */}
      <div className="info-cards">
        <div className="info-card">
          <FiShield className="info-icon" />
          <h4>Secure Withdrawals</h4>
          <p>All withdrawals are processed securely with encryption</p>
        </div>
        <div className="info-card">
          <FiTrendingUp className="info-icon" />
          <h4>Higher Limits</h4>
          <p>Increase your withdrawal limits by completing tasks</p>
        </div>
        <div className="info-card">
          <FiClock className="info-icon" />
          <h4>Processing Times</h4>
          <p>M-Pesa: Instant | Bank: 1-3 days | Card: 2-5 days</p>
        </div>
      </div>

      {/* Important Notes */}
      <div className="withdraw-notes">
        <FiInfo className="notes-icon" />
        <div className="notes-content">
          <h4>Important Information</h4>
          <ul>
            <li>Minimum withdrawal amount is Ksh {user.minWithdraw}</li>
            <li>Maximum withdrawal per transaction is Ksh {user.maxWithdraw}</li>
            <li>Withdrawals are processed 24/7, including weekends</li>
            <li>Make sure your payment details are correct to avoid delays</li>
            <li>Contact support if you experience any issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;