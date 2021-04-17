import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Profile from './Profile'
import './App.css';
import './HeroSection.css'
import { Button } from "./Button";
import Navbar from './Navbar.js';
import Home from './HomePage/Home';
import SignUp from './SignUpPage/SignUp';
import SignIn from './SignInPage/SignIn';

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/leaderboard' exact component={Leaderboard}/>
        <Route path='/profile' exact component={Profile}/>
        <Route path='/sign-up' exact component={SignUp}/>
        <Route path='/sign-in' exact component={SignIn}/>
      </Switch>
    </Router>
  );
}

function Leaderboard() {
  return <h2>Leaderboard</h2>;
}