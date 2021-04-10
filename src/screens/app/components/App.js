import logo from '../../../images/logo.svg';
import './App.css';
import firebase from '../../../firebase/config.js';
import React, { useState, useEffect } from "react";

function App() {

  const [users, setUsers] = useState([]);
  const ref = firebase.firestore().collection('users');
  
  function getUsers() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUsers(items);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          {users.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.score}</p>
              <p>{user.age}</p>
            </div>
          ))}
        </div>


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
