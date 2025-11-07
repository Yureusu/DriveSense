import React, { useEffect, useState } from 'react';
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
import { useFetchFuels } from '../../../hooks/Fetch/useFetchFuel';
import type { UserInfo } from '../../../App';

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
  user: UserInfo | null;
}

const BarChart: React.FC<BarChartProps> = ({ isDark, user }) => {

  const { fuelInfo } = useFetchFuels(user);

  const [fuelCosts, setFuelCosts] = useState<number[]>([]);
  const [fuelLogDates, setFuelLogDates] = useState<string[]>([]);

  useEffect(() => {
    if (!fuelInfo || fuelInfo.length === 0) {
      setFuelCosts([]);
      setFuelLogDates([]);
      return;
    }

    const fetchFuelCosts = fuelInfo.map((fuel) => Number(fuel.cost) || 0);
    setFuelCosts(fetchFuelCosts);

    const fetchLogDates = fuelInfo
      .map(f => {
        if (!f.logDate) return null;
        const date = new Date(f.logDate);
        if (isNaN(date.getTime())) return null;
        return date.toISOString().split('T')[0];
      })
      .filter((d): d is string => !!d);

    setFuelLogDates(fetchLogDates);

  }, [fuelInfo]);

  console.log(fuelLogDates);

  const data = {
    labels: fuelLogDates,
    datasets: [
      {
        label: 'Fuel',
        data: fuelCosts,
        backgroundColor: [
          'rgba(100, 205, 253, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
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
        align: 'center',
        font: {
          size: 18,
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

  return(
    <div style={{ width: '100%', height: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;