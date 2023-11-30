import React from 'react';
import HorizontalBarChart from './HorizontalBarChart';

const IssuesBarChart: React.FC = () => {
  // Mock data for demonstration purposes
  const chartLabels = ['Category A', 'Category B', 'Category C'];
  const chartData = [25, 50, 75];

  return (
    <div>
      <h1>Parent Component</h1>
      {/* Other components or content can go here */}
      <HorizontalBarChart labels={chartLabels} data={chartData} />
    </div>
  );
};

export default IssuesBarChart;