import React from 'react';

function Blogs() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Read Blogs and Earn</h2>
      <ul>
        <li><a href="https://example.com/blog1" target="_blank" rel="noopener noreferrer">How to make money online</a></li>
        <li><a href="https://example.com/blog2" target="_blank" rel="noopener noreferrer">Best savings tips for youth</a></li>
      </ul>
      {/* Later: Track if blog is visited and reward */}
    </div>
  );
}

export default Blogs;
