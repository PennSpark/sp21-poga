import React, { useState } from "react";
import './Profile.css'
import ProfileTabs from './ProfileTabs'
import ProfileProgressBar from './ProfileProgressBar'
import StatsChart from './StatsChart'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import plant_animation from './plant.gif'; //TODO: DEF not right, but idk why i can't access when i put in images folder

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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {

        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, currentPoints);
      });
    }, 150);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div id="profile">
      
      {/* PROFILE PICTURE + DETAILS: change image and link when given logo and homepage */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {/*  dummy profile picture */}
          <div id="profile_picture">
            <div class="icon">
              <img src = "https://www.pngkit.com/png/full/281-2812821_user-account-management-logo-user-icon-png.png" alt = "profile picture"
              width="170" height="170"/>
            </div>
            
            <div id="profile_details">
              <p class="name"><b>John Doe</b></p>
              <small class="detail_text">johndoe@gmail.com </small> 
              <p class="detail_text">
                Bio Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                <div id="plant_animation">
                  <img src={plant_animation} alt="animation" width="140" height="190"/>
                </div>
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
  )
}