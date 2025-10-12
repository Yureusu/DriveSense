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
import type { ChartOptions } from 'chart.js';

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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    ],
    datasets: [
      {
        label: 'Fuel Consumption',
        data: [20, 42, 98, 66, 32, 52, 44, 80, 74],
        backgroundColor: [
          'rgba(101, 119, 255, 1)',
          'rgba(101, 119, 255, 1)',
          'rgba(101, 119, 255, 1)',
          'rgba(101, 119, 255, 1)',
          'rgba(101, 119, 255, 1)',
          'rgba(101, 119, 255, 1)',
          'rgba(101, 119, 255, 1)',
          'rgba(101, 119, 255, 1)',
          'rgba(101, 119, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#FFFCE1' : '#0E100F',
        },
      },
      title: {
        display: true,
        text: 'Fuel Consumption',
        color: isDark ? '#FFFCE1' : '#0E100F',
        align: 'start',
        font: {
          size: 16,
        },
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