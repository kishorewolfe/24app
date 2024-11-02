import * as React from 'react';
import { LineChart, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';

const xLabels = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];


export default function LinesDataChart({ residentialCount, commercialCount }: any) {
  // Type assertion to ensure values are treated as number[]
  const rValues: any[] = Object.values(residentialCount).map(value => value ?? 0);
  const cValues: any[] = Object.values(commercialCount).map(value => value ?? 0);

  return (
    <LineChart
      sx={{
        [`& .${lineElementClasses.root}`]: {
          stroke: '#FE820C',
          strokeWidth: 2,
        },
        [`& .${markElementClasses.root}`]: {
          stroke: '#053E6C',
          scale: '0.6',
          fill: '#fff',
          strokeWidth: 2,
        },
      }}
      width={500}
      height={300}
      series={[
        { data: rValues, label: 'Residential' },
        { data: cValues, label: 'Commercial' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
