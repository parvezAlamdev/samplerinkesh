import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (<React.Fragment>
    {/* <div className="header-menu">
      <div className="header-menu-inner">
        <ul>

          <li> <a href="#" className="active">Home</a> </li>
          <li> <a href="#">Home</a> </li>
          <li> <a href="#">Home</a> </li>
          <li> <a href="#">Home</a> </li>
        </ul>
      </div>

    </div> */}
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div></React.Fragment>

  );
}

export default App;
