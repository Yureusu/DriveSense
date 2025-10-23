import DashboardCard from "../DashboardCard"
import BarChart from "../../../chartjs/Dashboard/BarChart";
import useIsMobile from "../../../hooks/useIsMobile"
import type { UserInfo } from "../../../App";
import { useEffect, useState } from "react";
import { useFetchFuels } from "../../../hooks/Fetch/useFetchFuel";
import { useFetchVehicle } from "../../../hooks/Fetch/useFetchVehicle";
import { useFetchDriver } from "../../../hooks/Fetch/useFetchDriver";
import { useFetchMaintenance } from "../../../hooks/Fetch/useFetchMaintenance";

type changeTheme = {
    isDark: boolean;
    user: UserInfo | null;
}

function Dashboard({isDark, user} : changeTheme) {

    const { fuelInfo } = useFetchFuels(user);
    const { vehicleInfo } = useFetchVehicle(user);
    const { driverInfo } = useFetchDriver(user);
    const { maintenanceInfo } = useFetchMaintenance(user);

    const isMobile = useIsMobile(); 

    const [vehicleCount, setVehicleCount] = useState<number>(0);
    const [fuelCost, setFuelCost] = useState<number[]>([]);
    const [driverCount, setDriverCount] = useState<string>("0");
    const [maintenanceCount, setMaintenanceCount] = useState<string>("0");

    const [totalFuelCost, setTotalFuelCost] = useState<number>(0);

    useEffect(() => {
        //fetch fuel costs
        const fetchFuelCosts = fuelInfo.map((fuel) => Number(fuel.cost));
        setFuelCost(fetchFuelCosts);
        console.log("Fuel cost arr: ", fuelCost);
        //fetch vehicle count
        const fetchVehicleCount = vehicleInfo.length;
        setVehicleCount(fetchVehicleCount);
        //fetch drivers count
        const fetchDriverCount = driverInfo.length;
        setDriverCount((fetchDriverCount).toString());
        //fetch maintenance logs
        const fetchMaintenanceCount = maintenanceInfo.length;
        setMaintenanceCount((fetchMaintenanceCount).toString());

    }, [fuelInfo]);
    
    useEffect(() => {
        if (fuelCost.length > 0 && vehicleCount > 0) {

            const totalCost = fuelCost?.reduce((acc, val) => acc + val, 0)

            setTotalFuelCost(totalCost);
        } else {
            setTotalFuelCost(0);
        }
    }, [fuelCost]);

    return (
        <section id="main" className={`${isMobile? "p-[calc(0.4vw+0.6rem)]" : "border-l px-[calc(0.4vw+0.6rem)]"}
        flex flex-col items-center justify-start h-full w-full flex-5 border-[var(--border-color)]`}>

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">

                <span className="text-[calc(0.8vw+1.2rem)] font-semibold cursor-pointer hovered">Dashboard</span>
                <span className="text-[calc(0.4vw+0.8rem)] cursor-pointer hovered">Welcome back, {user?.displayName}</span>

                {!isMobile && <div className={`h-auto w-full flex flex-row items-center justify-center gap-[calc(0.4vw+0.6rem)]`}>
                    
                    <DashboardCard title={"Total Vehicles"} descrip={(vehicleCount).toString() ?? "0"} isDark={isDark}/>
                    <DashboardCard title={"Monthly Fuel Cost"} descrip={(totalFuelCost)?.toString() ?? "0"} isDark={isDark}/>                 
                    <DashboardCard title={"Total Drivers"} descrip={driverCount} isDark={isDark}/>  
                    <DashboardCard title={"Maintenance Logs"} descrip={maintenanceCount} isDark={isDark}/>  
                    
                </div>}
                {isMobile && <div className={`h-auto w-full flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)]`}>
                    
                    <div className="h-auto w-full flex flex-row items-center jsutify-between gap-[calc(0.4vw+0.6rem)]">
                        <DashboardCard title={"Total Vehicles"} descrip={(vehicleCount).toString() ?? "0"} isDark={isDark}/>
                        <DashboardCard title={"Monthly Fuel Cost"} descrip={(totalFuelCost)?.toString() ?? "0"} isDark={isDark}/>  
                    </div> 
                    <div className="h-auto w-full flex flex-row items-center jsutify-between gap-[calc(0.4vw+0.6rem)]">             
                        <DashboardCard title={"Mileage Efficiency"} descrip={driverCount} isDark={isDark}/>  
                        <DashboardCard title={"Total Trips"} descrip={maintenanceCount} isDark={isDark}/>  
                    </div>
                    
                </div>}

            </div> 

            <div className={`${isMobile? "flex-col items-center mt-[calc(0.4vw+0.6rem)]" : "flex-row items-start"}
                h-full w-full flex justify-start gap-[calc(0.4vw+0.6rem)]`}>
                <div className={`${isMobile? "w-full" : "flex-1"}
                    h-full flex flex-row items-center justify-center p-[calc(0.4vw+0.6rem)] rounded-lg bordered`}>
                    <BarChart isDark={isDark} user={user}/>
                </div>

                <div className={`${isMobile? "w-full" : "flex-1"}
                    h-full flex flex-col items-start justify-center p-[calc(0.4vw+0.6rem)] rounded-lg bordered`}>
                    <span className="text-[calc(0.6vw+0.8rem)] p-[calc(0.4vw+0.6rem)] pl-0 cursor-pointer">Recent Activity</span>
                    <div className="h-full w-full flex flex-row items-start justify-around py-[calc(0.4vw+0.6rem)]">

                        <div className="w-full flex flex-row items-center justify-start">
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Activity</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Date</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Time</span>
                        </div>
        
                    </div>
                </div>

            </div> 

        </section>
    )
}

export default Dashboard