import DashboardCard from "../DashboardCard"
import BarChart from "../../../chartjs/Dashboard/BarChart";
import useIsMobile from "../../../hooks/useIsMobile"
import type { UserInfo, VehicleInfo } from "../../../App";
import { useEffect, useState } from "react";
import { db } from '../../../server/Firebase/Firebase'; 
import { getDocs, collection } from 'firebase/firestore';

type changeTheme = {
    isDark: boolean;
    user: UserInfo | null;
    vehicleInfo: VehicleInfo[];
}

function Dashboard({isDark, user} : changeTheme) {

    const isMobile = useIsMobile(); 

    const [totalVehicle, setTotalVehicle] = useState("0");
    const [fuelCost, setFuelCost] = useState("0");
    const [mileAge, setMileAge] = useState("0");
    const [totalTrips, setTotalTrips] = useState("0");

    const userData = async ()  => {
        try {
            if(!user || !user.uid) {
                console.warn("User not available.");
                return;
            }

            const dashboardDataRef = collection(db, "users", user?.uid, "vehicles");
            const snapshot = await getDocs(dashboardDataRef);

            const count = snapshot.size;
            // console.log(`Total documents in dashboard-data: ${count}`);
            
            setTotalVehicle(String(count) ?? "0");
            setFuelCost("0");
            setMileAge("0");
            setTotalTrips("0");

            return count;
            
        } catch(err) {
            console.error("Error fetching dashboard data:", err);
        }
    };

    useEffect(() => {    
        userData();
    }, [userData]);

    return (
        <section id="main" className={`${isMobile? "p-[calc(0.4vw+0.6rem)]" : "border-l px-[calc(0.4vw+0.6rem)]"}
        flex flex-col items-center justify-start h-full w-full flex-5 border-[var(--border-color)]`}>

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">

                <span className="text-[calc(0.8vw+1.2rem)] font-semibold cursor-pointer hovered">Dashboard</span>
                <span className="text-[calc(0.4vw+0.8rem)] cursor-pointer hovered">Welcome back, {user?.displayName}</span>

                {!isMobile && <div className={`h-auto w-full flex flex-row items-center justify-center gap-[calc(0.4vw+0.6rem)]`}>
                    
                    <DashboardCard title={"Total Vehicles"} descrip={totalVehicle} isDark={isDark}/>
                    <DashboardCard title={"Monthly Fuel Cost"} descrip={fuelCost} isDark={isDark}/>                 
                    <DashboardCard title={"Mileage Efficiency"} descrip={mileAge} isDark={isDark}/>  
                    <DashboardCard title={"Total Trips"} descrip={totalTrips} isDark={isDark}/>  
                    
                </div>}
                {isMobile && <div className={`h-auto w-full flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)]`}>
                    
                    <div className="h-auto w-full flex flex-row items-center jsutify-between gap-[calc(0.4vw+0.6rem)]">
                        <DashboardCard title={"Total Vehicles"} descrip={totalVehicle} isDark={isDark}/>
                        <DashboardCard title={"Monthly Fuel Cost"} descrip={fuelCost} isDark={isDark}/>  
                    </div> 
                    <div className="h-auto w-full flex flex-row items-center jsutify-between gap-[calc(0.4vw+0.6rem)]">             
                        <DashboardCard title={"Mileage Efficiency"} descrip={mileAge} isDark={isDark}/>  
                        <DashboardCard title={"Total Trips"} descrip={totalTrips} isDark={isDark}/>  
                    </div>
                    
                </div>}

            </div> 

            <div className={`${isMobile? "flex-col items-center mt-[calc(0.4vw+0.6rem)]" : "flex-row items-start"}
                h-full w-full flex justify-start gap-[calc(0.4vw+0.6rem)]`}>
                <div className={`${isMobile? "w-full" : "flex-1"}
                    h-full flex flex-row items-center justify-center p-[calc(0.4vw+0.6rem)] rounded-lg bordered`}>
                    <BarChart isDark={isDark} />
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