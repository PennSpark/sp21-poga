import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import '../style/App.css';
import '../style/HeroSection.css'
import Navbar from '../components/Navbar';
import Home from './HomePage/Home';
import Leaderboard from './LeaderboardPage/Leaderboard';
import SignUp from './SignUpPage/SignUp';
import SignIn from './SignInPage/SignIn';
import TFPage from './TFPage/TF';
import Profile from './ProfilePage/Profile';

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/leaderboard' exact component={Leaderboard}/>
        <Route path='/sign-up' exact component={SignUp}/>
        <Route path='/sign-in' exact component={SignIn}/>
        <Route path='/tf-page' exact component={TFPage}/>
        <Route path='/profile' exact component={Profile}/>
      </Switch>
    </Router>
  );
}

