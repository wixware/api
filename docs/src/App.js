import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi, we're building APIs for you.
        </p>
        <a
          className="App-link"
          href="https://www.wixware.com?utm_source=api.wixware.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Wixware
        </a>
      </header>
    </div>
  );
}

export default App;
