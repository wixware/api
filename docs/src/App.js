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
      </header>
      Find us on
      <a
        className="App-link"
        href="https://facebook.com/wixware?utm_source=api.wixware.com"
        target="_blank"
      >
        Facebook
      </a>
      or go to
      <a
        className="App-link"
        href="https://www.wixware.com?utm_source=api.wixware.com"
        target="_blank"
      >
        Wixware Software Center
      </a>
      to download apps.
    </div>
  );
}

export default App;
