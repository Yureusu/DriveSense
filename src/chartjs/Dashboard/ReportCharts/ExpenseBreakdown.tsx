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
import type { UserInfo } from '../../../App';
import { useFetchFuels } from '../../../hooks/Fetch/useFetchFuel';
import { useFetchMaintenance } from '../../../hooks/Fetch/useFetchMaintenance';
import { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
    isDark: boolean;
    user: UserInfo | null
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ isDark, user }) => {

    const { fuelInfo } = useFetchFuels(user);
    const { maintenanceInfo } = useFetchMaintenance(user);

    const [fuelCosts, setFuelCosts] = useState<number[]>([]);
    const [fuelLogDates, setFuelLogDates] = useState<string[]>([]);
    const [maintenanceCost, seMaintenanceCosts] = useState<number[]>([]);
    const [maintenanceCreatedAt, setMaintenanceCreatedAt] = useState<string[]>([]);
        
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

    const totalFuelCost = fuelCosts.reduce((sum, val) => sum + val, 0);
    const totalMaintenanceCost = maintenanceCost.reduce((sum, val) => sum + val, 0);

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
            text: 'Expense Breakdown',
            color: isDark ? '#FFFCE1' : '#0E100F', 
            align: 'center',
            font: {
                size: 18,
            },
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
        labels: ["Fuel Costs", "Maintenance Costs"],
        datasets: [
        {
            label: 'Expenses',
            data: [totalFuelCost, totalMaintenanceCost],
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