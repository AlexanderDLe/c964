import React from 'react';
import { Bar } from 'react-chartjs-2'

const highestVals = {
  ph: 14,
  Hardness: 323,
  Solids: 61227,
  Chloramines: 13,
  Sulfate: 481,
  Conductivity: 753,
  OrganicCarbon: 28,
  Trihalomethanes: 124,
  Turbidity: 7
}

const Charts = ({ph, Hardness, Solids, Chloramines, Sulfate, Conductivity, OrganicCarbon, Trihalomethanes, Turbidity}) => {
  return (
    <>
      <p style={{margin: '16px 5px', color: '#999', fontSize: '.9em'}}>* Values are compared to the highest values in the dataset used</p>
      <RenderBarChart label={'ph'} data={ph} color={'Red'} highestVal={highestVals.ph} />
      <RenderBarChart label={'Hardness'} data={Hardness} color={'Blue'} highestVal={highestVals.Hardness} />
      <RenderBarChart label={'Solids'} data={Solids} color={'Green'} highestVal={highestVals.Solids} />
      <RenderBarChart label={'Chloramines'} data={Chloramines} color={'Yellow'} highestVal={highestVals.Chloramines} />
      <RenderBarChart label={'Sulfate'} data={Sulfate} color={'Orange'} highestVal={highestVals.Sulfate} />
      <RenderBarChart label={'Conductivity'} data={Conductivity} color={'Purple'} highestVal={highestVals.Conductivity} />
      <RenderBarChart label={'OrganicCarbon'} data={OrganicCarbon} color={'Grey'} highestVal={highestVals.OrganicCarbon} />
      <RenderBarChart label={'Trihalomethanes'} data={Trihalomethanes} color={'Cyan'} highestVal={highestVals.Trihalomethanes} />
      <RenderBarChart label={'Turbidity'} data={Turbidity} color={'Pink'} highestVal={highestVals.Turbidity} />
      
    </>
  );
};

const RenderBarChart = ({label, data, color, highestVal}) => {
  return <div>
    <Bar
        data={{
          labels: [label],
          datasets: [{
            label: `${label} level`,
            data: [data],
            backgroundColor: [color]
          }]
        }}
        height={300}
        width={300}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 0,
              max: highestVal
            }
          }
        }}  
        />
  </div>
}

export default Charts;