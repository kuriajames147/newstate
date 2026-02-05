// components/Activate.js
import React, { useState } from 'react';

function Activate() {
  const [receipt, setReceipt] = useState('');

  const handleActivate = async () => {
    const res = await fetch('http://localhost:5000/api/auth/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, mpesaReceipt: receipt })
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h3>Activate Account</h3>
      <input type="text" value={receipt} onChange={(e) => setReceipt(e.target.value)} placeholder="Enter M-PESA Code" />
      <button onClick={handleActivate}>Activate</button>
    </div>
  );
}

export default Activate;
