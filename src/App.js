import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
// import { User } from '../backend/User.js';

// import { v4 as uuidv4 } from 'uuid';

// const crypto = require("crypto");

// var mysql = require('mysql');

// var db = mysql.createConnection({
//   host: 'host',
//   user: 'root',
//   password: 'password',
//   database: 'tracker_data',
// });

function App() {
  return (
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
    </div>
  );
}

export default App;
