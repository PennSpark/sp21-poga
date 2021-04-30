import React, { useState } from "react";
import './Profile.css'

import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


const timeData = [
  { day: 'Sunday', time: 10.525 },
  { day: 'Monday', time: 0 },
  { day: 'Tuesday', time: 2 },
  { day: 'Wednesday', time: 15 },
  { day: 'Thursday', time: 0 },
  { day: 'Friday', time: 6 },
  { day: 'Saturday', time: 8 },
];

export default function StatsChart() {
  return (
    <Chart
      data={timeData}
      height='315'
    >
      <ArgumentAxis 
      />
      <ValueAxis max={7} />

      <BarSeries
        valueField="time"
        argumentField="day"
        color= "#724CF9"
      />
      <Animation />
    </Chart>
  );
}
