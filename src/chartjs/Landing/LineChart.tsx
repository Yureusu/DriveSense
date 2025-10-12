import type { ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  isDark: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ isDark }) => {

  const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Mileage',
        data: [40, 52, 70, 88],
        fill: false,
        borderColor: 'rgba(101, 119, 255, 1)',
        tension: 0.1, 
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#FFFCE1' : '#0E100F',
        },
      },
      title: {
        display: true,
        text: 'Mileage Efficiency',
        color: isDark ? '#FFFCE1' : '#0E100F',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#FFFCE1' : '#0E100F',
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', 
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: isDark ? '#FFFCE1' : '#0E100F',
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;