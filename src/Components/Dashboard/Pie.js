import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Context } from '../../Context';

export default function BasicPie() {
  
  const palette = ['orange', 'green', 'pink'];
  const {countOfAssets} = React.useContext(Context);
  return (
    <div className='-mt-5 ml-10'>
    <PieChart
    colors={palette}
      series={[
        {
          data: [
            { id: 0, value: countOfAssets, label: 'Assets' },
            { id: 1, value: 98, label: 'Consumables' },
            { id: 2, value: 148, label: 'Accessories' },
          ],
          innerRadius: 30,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -182,
      endAngle: 180,
      cx: 150,
      cy: 150,
        },
      ]}
      width={430}
      height={300}
    />
    </div>
  );
}
