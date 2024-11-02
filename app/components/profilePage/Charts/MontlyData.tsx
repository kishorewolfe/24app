import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset, valueFormatter } from './dataset/userReport';

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

export default function MontlyData() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'Plot', label: 'Plot', valueFormatter },
        { dataKey: 'House', label: 'House', valueFormatter },
        { dataKey: 'Flat', label: 'Flat', valueFormatter },
        { dataKey: 'Others', label: 'Others', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
