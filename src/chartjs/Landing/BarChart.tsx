import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  isDark: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ isDark }) => {
  const data = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Fuel Consumption',
        data: [20, 42, 88],
        backgroundColor: [
          'rgba(101, 119, 255, 1)',
          'rgba(100, 205, 253, 1)',
          'rgba(7, 76, 145, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#FFFCE1' : '#0E100F',
        },
      },
      title: {
        display: true,
        text: 'Fuel Consumption Overview',
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

  return <Bar data={data} options={options} />;
};

export default BarChart;