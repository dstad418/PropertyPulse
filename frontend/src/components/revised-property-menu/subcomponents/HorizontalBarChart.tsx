import React from 'react';
import { Bar } from 'react-chartjs-2';
import { backgroundColors, borderColors } from '../src/chartingValues';

interface HorizontalBarChartProps {
  labels: string[];
  data: number[];
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Data',
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Horizontal Bar Chart</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default HorizontalBarChart;

