import * as React from 'react';
import { LineChart, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';
import { useAppSelector } from '@/lib/hooks';
import { selectCommercialCount, selectResidentialCount } from '@/lib/features/property/propertySlice';

const xLabels = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];


interface LinesDataChartProps {
  residentialCount: number[];
  commercialCount: number[];
}

export default function LinesDataChart() {
  let commercialCount = useAppSelector(selectCommercialCount);
  let residentialCount = useAppSelector(selectResidentialCount);
  console.log(commercialCount)

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
        { data: commercialCount, label: 'Residential' },
        { data:  residentialCount, label: 'Commercial' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
