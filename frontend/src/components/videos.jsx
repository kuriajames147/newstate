import React from 'react';

function videos() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Watch YouTube Videos and Earn</h2>
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Earn by watching"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      {/* Later: Add logic to reward user after viewing */}
    </div>
  );
}

export default videos;
