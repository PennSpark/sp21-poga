import React, { useState } from "react";
import './Profile.css'

import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 18,
    borderRadius: 10,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#724CF9"
  },
}))(LinearProgressWithLabel);

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" width="100%" >
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box>
        {Math.round(props.value)}/100 points
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default BorderLinearProgress;