import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter } from './webUsageStats';

export default function PieActiveArc() {
  return (
    <PieChart
    colors={['rgb(254, 130, 12)', 'rgb(5, 62, 108)', 'rgb(187, 74, 124)','rgb(224, 82, 81)','rgb(186, 168, 155)','rgb(0, 64, 177)']}
      series={[
        {
          data: desktopOS,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={400}
    />
  );
}