import React from 'react';
import type { ChartOptions } from 'chart.js';
import type { ChartData } from 'chart.js';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  isDark: boolean;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ isDark }) => {
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDark ? '#FFFCE1' : '#0E100F',
        },
      },
      title: {
        display: true,
        text: 'Total Expenses',
        color: isDark ? '#FFFCE1' : '#0E100F', 
      },
      tooltip: {
        backgroundColor: isDark ? '#0E100F' : '#FFFCE1',
        titleColor: isDark ? '#FFFCE1' : '#0E100F',
        bodyColor: isDark ? '#FFFCE1' : '#0E100F',
        borderColor: isDark ? '#555' : '#ccc',
        borderWidth: 1,
      },
    },
  };

  const data: ChartData<'doughnut', number[], string> = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Expenses',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(101, 119, 255, 1)',
          'rgba(100, 205, 253, 1)',
          'rgba(7, 76, 145, 1)',
        ],
        borderColor: isDark ? '#0E100F' : '#FFFCE1', 
        borderWidth: 2,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;