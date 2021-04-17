import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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

// function Home() {
//   return (
//     <div className='home-container'>
//       <h1>Start Your Yoga Adventure Here!</h1>
//       <p>Here @ Poga, you'll be learning yoga with your customizable plant buddy! 
//         You'll be able to level up your profile, compete with real life friends, 
//         and grow spiritually with your cool litle plant buddy!</p>
//       <div className='home-btns'>
//         <Button className='btns' buttonStyle='btn--outline'
//          buttonSize='btn--large'>
//            Create Profile
//         </Button>
//         <Button className='btns' buttonStyle='btn--primary'
//          buttonSize='btn--large'>
//            Log In
//         </Button>
//       </div>
//     </div>
//   );
// }

function Profile() {
  return <h2>Profile</h2>;
}

function Leaderboard() {
  return <h2>Leaderboard</h2>;
}