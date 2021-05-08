import React, {useState, useCallback} from "react";
import '../../style/Profile.css'
import ProfileTabs from './ProfileTabs'
import ProfileProgressBar from './ProfileProgressBar'
import StatsChart from './StatsChart'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import Animation from './Animation'

import firebase from "firebase/app";
import "firebase/auth";
import config from '../SignUpPage/config';
import { IfFirebaseAuthed, IfFirebaseUnAuthed, FirebaseAuthProvider } from "@react-firebase/auth";

import { Link, useHistory } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../../components/Button';
// import '../style/Navbar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
  }
}));




export default function Profile() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [currentPoints, setcurrentPoints] = React.useState(75);

  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  const [userDetails, setUserDetails] = useState(null)
  

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }
  const innerFunction = useCallback(() => {
    if (user !== null && userDetails === null) {
      var db = firebase.firestore();
      db.collection('user').doc(uid).get()
          .then((data) => {
            setUserDetails(data.data());
            setcurrentPoints(data.data() ? data.data().score : 0);
          })
    }
  });

  React.useEffect(() => {

    
    innerFunction()
    const timer = setInterval(() => {
      setProgress((oldProgress) => {

        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, currentPoints);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [innerFunction]);

  const [button, setButton] = useState(true);
  if (user != null) {
    return (
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <div id="profile">
        {/* PROFILE PICTURE + DETAILS: change image and link when given logo and homepage */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <div id="profile_picture">
              <div class="icon">
                {/* <img src = "https://www.pngkit.com/png/full/281-2812821_user-account-management-logo-user-icon-png.png" alt = "profile picture"
                width="170" height="170"/> */}
                <img src = {photoUrl} alt = "profile picture"
                width="170" height="170"/>
              </div>
              
              <div id="profile_details">
                <p class="name"><b>{name}</b></p>
                <small class="detail_text">{email}</small> 
                <p class="detail_text">
                  {userDetails ? userDetails.bio : "No bio."}
                </p> 
                <br/>
                <br/>
              </div>
            </div>
          </Grid>
  
          {/* PLANT ANIMATION + POINTS/LEVEL */}
          <Grid item xs={12} sm={6}>
            <Card className={classes.card} variant="outlined">
              <Grid container spacing={10}>
                <Grid item xs={3}>
                  <Animation />
                </Grid>
                <Grid item xs={9} id="profile_stats">
                    <p>Earn {100 - currentPoints} more points to grow your plant to the next level!</p>
                    <ProfileProgressBar variant="determinate" value={progress} />
                </Grid>
              </Grid>
            </Card>
          </Grid>
  
          {/* POSES TABLE */}
          <Grid item xs={12} sm={6}>
            <ProfileTabs/>
          </Grid>
  
          {/* STATS */}
          <Grid item xs={12} sm={6}>
            <StatsChart/> 
          </Grid>
  
        </Grid>

        </div>
      </FirebaseAuthProvider>

    )
  }

  
  return (
    <div id="profile">
      <IfFirebaseUnAuthed>
                    {button ? (
                      <Link to='/sign-up' className='btn-link'>
                        <Button buttonStyle='btn--outline'>SIGN IN</Button>
                      </Link>
                    ) : (
                      <Link to='/sign-up' className='btn-link'>
                        <Button
                          buttonStyle='btn--outline'
                          buttonSize='btn--mobile'
                        >
                          SIGN IN
                        </Button>
                      </Link>
                    )}
                    </IfFirebaseUnAuthed>
    </div>
  )
}