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
import { useFetchMaintenance } from '../../../hooks/Fetch/useFetchMaintenance';
import type { UserInfo } from '../../../App';
import { useState, useEffect } from 'react';

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
    user: UserInfo | null;
}

const LineChart: React.FC<LineChartProps> = ({ isDark, user }) => {

    const { maintenanceInfo } = useFetchMaintenance(user);

    const [maintenanceCost, seMaintenanceCosts] = useState<number[]>([]);
    const [maintenanceCreatedAt, setMaintenanceCreatedAt] = useState<string[]>([]);
        
    useEffect(() => {
        if (!maintenanceInfo || maintenanceInfo.length === 0) {
            seMaintenanceCosts([]);
            setMaintenanceCreatedAt([]);
        return;
        }
    
        const fetchMaintenanceCosts = maintenanceInfo.map((maintenance) => Number(maintenance.cost) || 0);
        seMaintenanceCosts(fetchMaintenanceCosts);
    
        const fetchCreatedAt = maintenanceInfo
        .map(f => {
            if (!f.createdAt) return null;
            const date = new Date(f.createdAt);
            if (isNaN(date.getTime())) return null;
            return date.toISOString().split('T')[0];
        })
        .filter((d): d is string => !!d);
    
        setMaintenanceCreatedAt(fetchCreatedAt);
    
    }, [maintenanceInfo]);
    
    console.log(maintenanceCreatedAt);

    const data = {
        labels: maintenanceCreatedAt,
        datasets: [
        {
            label: 'Maintenane',
            data: maintenanceCost,
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
            text: 'Maintenance Cost',
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

    return <Line data={data} options={options} />;
};

export default LineChart;