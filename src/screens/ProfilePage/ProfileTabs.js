import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EcoIcon from '@material-ui/icons/Eco';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import ImageTable from './ImageTable'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ProfileTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Paper className={classes.root} variant="outlined">
      <AppBar position="static" color="default" variant="outlined">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered       
        >
          {/* can't really change tab font unfortunately */}
          <Tab label="Favorites" icon={<FavoriteIcon style={{fill: "#724CF9"}}/>}{...a11yProps(0)} /> 
          <Tab label="Completed" icon={<StarIcon style={{fill: "#724CF9"}}/>}{...a11yProps(1)} />
          <Tab label="All" icon={<EcoIcon style={{fill: "#724CF9"}}/>} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ImageTable/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ImageTable/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ImageTable/>
        </TabPanel>
      </SwipeableViews>
    </Paper>
  );
}

