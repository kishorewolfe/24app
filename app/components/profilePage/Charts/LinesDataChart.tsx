import * as React from 'react';
import { LineChart, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';

const xLabels = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];


export default function LinesDataChart({ residentialCount, commercialCount }: any) {
  // Ensure rValues is an array of numbers
  const rValues: any[] = Object.values(residentialCount).map(value => value ?? 0); // e.g., [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
  const cValues: any[] = Object.values(commercialCount).map(value => value ?? 0);

const cValuesX: any[] = Object.values(cValues[0])
const rValuesX: any[] = Object.values(rValues[0])


  

  
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
        { data: rValuesX, label: 'Residential' },
        { data: cValuesX, label: 'Commercial' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}

