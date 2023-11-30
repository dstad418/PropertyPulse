import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

interface HorizontalBarChartProps {
  labels: string[];
  data: number[];
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ labels, data }) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<Bar | null>(null);

  useEffect(() => {
    // Destroy previous chart instance before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart instance
    const ctx = canvasRef.current?.chartInstance?.canvas;
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Data',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.4)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: data,
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Cleanup when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [labels, data]);

  return <Bar ref={canvasRef} data={{ labels, datasets: [{ data }] }} />;
};

export default HorizontalBarChart;
