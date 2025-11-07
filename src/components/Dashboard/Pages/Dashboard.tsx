import DashboardCard from "../DashboardCard"
import BarChart from "../../../chartjs/Dashboard/BarChart";
import useIsMobile from "../../../hooks/useIsMobile"
import type { UserInfo } from "../../../App";
import { useEffect, useState } from "react";
import { useFetchFuels } from "../../../hooks/Fetch/useFetchFuel";
import { useFetchVehicle } from "../../../hooks/Fetch/useFetchVehicle";
import { useFetchDriver } from "../../../hooks/Fetch/useFetchDriver";
import { useFetchMaintenance } from "../../../hooks/Fetch/useFetchMaintenance";
import { useFetchActivities } from "../../../hooks/Fetch/useFetchActivities";

type changeTheme = {
    isDark: boolean;
    user: UserInfo | null;
}

function Dashboard({isDark, user} : changeTheme) {

    console.log(user);

    const { fuelInfo } = useFetchFuels(user);
    const { vehicleInfo } = useFetchVehicle(user);
    const { driverInfo } = useFetchDriver(user);
    const { maintenanceInfo } = useFetchMaintenance(user);
    const { recentActivity } = useFetchActivities(user);
    
    console.log("vehicleInfo", vehicleInfo)
    console.log("fuelInfo", fuelInfo)
    console.log("driverInfo", driverInfo)
    console.log("maintenanceInfo", maintenanceInfo)

    const isMobile = useIsMobile(); 

    const [vehicleCount, setVehicleCount] = useState<number>(0);
    const [driverCount, setDriverCount] = useState<string>("0");
    const [maintenanceCount, setMaintenanceCount] = useState<number>(0);

    const [totalFuelCost, setTotalFuelCost] = useState<number>(0);

    useEffect(() => {
        if (!fuelInfo || !vehicleInfo || !driverInfo || !maintenanceInfo) return;
      
        const totalFuel = fuelInfo.reduce((acc, fuel) => acc + Number(fuel.cost || 0), 0);
        const totalMaintenance = maintenanceInfo.reduce((acc, maintenance) => acc + Number(maintenance.cost || 0), 0);
      
        setVehicleCount(vehicleInfo.length);
        setDriverCount(driverInfo.length.toString());
        setMaintenanceCount(totalMaintenance);
        setTotalFuelCost(totalFuel);
      
        console.log({
          totalFuel,
          vehicleCount: vehicleInfo.length,
          driverCount: driverInfo.length,
          maintenanceCount: maintenanceInfo.length,
        });
      
    }, [fuelInfo, vehicleInfo, driverInfo, maintenanceInfo]); 
    
    useEffect(() => {
        console.log("Recent activities: ", recentActivity);
    }, [recentActivity]);

    return (
        <div id="main" className={`${isMobile? "h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-full"}
        flex flex-col items-start justify-start w-full flex-5 border-[var(--border-color)]`}>

            <div className={`${isMobile? "" : "pb-[calc(0.4vw+0.6rem)]"}
                w-full h-auto flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]`}>

                <span className="text-[calc(0.8vw+1.2rem)] font-semibold cursor-pointer hovered">Dashboard</span>
                <span className="text-[calc(0.4vw+0.8rem)] cursor-pointer hovered">Welcome back, {user?.displayName?.split(" ")[0]}</span>

                {!isMobile && <div className={`h-auto w-full flex flex-row items-center justify-center gap-[calc(0.4vw+0.6rem)]`}>
                    
                    <DashboardCard title={"Total Drivers"} descrip={driverCount} isDark={isDark}/>  
                    <DashboardCard title={"Total Vehicles"} descrip={(vehicleCount).toString() ?? "0"} isDark={isDark}/>
                    <DashboardCard title={"Total Fuel Cost"} descrip={(totalFuelCost)?.toString() ?? "0"} isDark={isDark}/>                 
                    <DashboardCard title={"Total Maintenance Costs"} descrip={(maintenanceCount)?.toString() ?? "0"} isDark={isDark}/>  
                    
                </div>}
                {isMobile && <div className={`h-auto w-full flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)]`}>
                    
                    <div className="h-auto w-full flex flex-row items-center jsutify-between gap-[calc(0.4vw+0.6rem)]">
                        <DashboardCard title={"Total Vehicles"} descrip={(vehicleCount).toString() ?? "0"} isDark={isDark}/>
                        <DashboardCard title={"Monthly Fuel Cost"} descrip={(totalFuelCost)?.toString() ?? "0"} isDark={isDark}/>  
                    </div> 
                    <div className="h-auto w-full flex flex-row items-center jsutify-between gap-[calc(0.4vw+0.6rem)]">             
                        <DashboardCard title={"Total Drivers"} descrip={driverCount} isDark={isDark}/>  
                        <DashboardCard title={"Maintenance Logs"} descrip={(maintenanceCount)?.toString() ?? "0"} isDark={isDark}/>  
                    </div>
                    
                </div>}

            </div> 

            <div className={`${isMobile? "flex-col items-start mt-[calc(0.4vw+0.6rem)]" : "flex-row items-start"}
                h-full w-full flex justify-start gap-[calc(0.4vw+0.6rem)]`}>
                <div className={`${isMobile? "w-full max-h-[240px]" : "flex-1 h-full"}
                    flex flex-row items-center justify-center p-[calc(0.4vw+0.6rem)] rounded-lg bordered`}>
                    <BarChart isDark={isDark} user={user}/>
                </div>

                {/* recentActivity */}
                <div className={`${isMobile? "w-full max-h-[240px]" : "flex-1 max-h-[382px]"}
                    flex flex-col items-start justify-center p-[calc(0.4vw+0.6rem)] rounded-lg bordered`}>
                    <span className="text-[calc(0.6vw+0.8rem)] p-[calc(0.4vw+0.6rem)] pl-0 cursor-pointer">Recent Activity</span>
                    <div className="h-full w-full overflow-y-scroll  flex flex-col items-start justify-start py-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]">

                        <div className="w-full flex flex-row items-center justify-start">
                            <span className="flex-2 text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Activity</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Date</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Time</span>
                        </div>

                        {recentActivity.sort((a, b) => new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime())
                            .map((act, index) => (
                            <div key={index} className="w-full flex flex-row items-center justify-start flex-wrap">
                                <span className="flex-2 text-[calc(0.4vw+0.6rem)]">{act.activity}</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{act.date}</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{act.time}</span>
                            </div>
                        ))}
        
                    </div>
                </div>

            </div> 

        </div>
    )
}

export default Dashboard