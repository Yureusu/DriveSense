import DashboardCard from "../DashboardCard"
import BarChart from "../../../chartjs/Dashboard/BarChart";
import useIsMobile from "../../../hooks/useIsMobile"
import type { UserInfo } from "../../../App";
import { useEffect, useState } from "react";
import { db } from '../../../server/Firebase/Firebase'; 
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

type changeTheme = {
    isDark: boolean;
    user: UserInfo | null;
}

function Dashboard({isDark, user} : changeTheme) {

    const isMobile = useIsMobile(); 

    const [totalVehicle, setTotalVehicle] = useState("0");
    const [fuelCost, setFuelCost] = useState("0");
    const [mileAge, setMileAge] = useState("0");
    const [totalTrips, setTotalTrips] = useState("0");


    useEffect(() => {
        const userData = async ()  => {
            try {
                if(!user || !user.uid) {
                    console.warn("User not available.");
                    return;
                }

                const dashboardDataRef = collection(db, "users", user?.uid, "dashboard-data");
                const snapshot = await getDocs(dashboardDataRef);

                const count = snapshot.size;
                console.log(`Total documents in dashboard-data: ${count}`);
                
                const docRef = doc(db, "users", user?.uid, "dashboard-data", "2026 Ford Mustang"); 
                const docSnap = await getDoc(docRef);
      
                if(docSnap.exists()) {
                    const data = docSnap.data(); 
                    console.log("Dashboard data:", data);
   
                    setTotalVehicle(data.totalVehicle ?? count);
                    setFuelCost(data.fuelCost ?? "0");
                    setMileAge(data.mileAge ?? "0");
                    setTotalTrips(data.totalTrips ?? "0");
                } else {
                    console.log("No such document!");
                }

                return count;
                
            } catch(err) {
                console.error("Error fetching dashboard data:", err);
            }
        };

        userData();

    }, []);

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

                        <div className="h-full flex-1 flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]  text-[calc(0.4vw+0.6rem)]">
                            <span className="hovered w-full p-[calc(0.3vw+0.4rem)] border-b border-[var(--border-color)] cursor-pointer pl-0">Activity</span>
                            <span className="cursor-pointer hovered">Refuel</span>
                            <span className="cursor-pointer hovered">Trip</span>
                            <span className="cursor-pointer hovered">Maintenance</span>    
                            <span className="cursor-pointer hovered">Refuel</span>             
                        </div>
                        <div className="h-full flex-1 flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]  text-[calc(0.4vw+0.6rem)]">
                            <span className=" hovered w-full p-[calc(0.3vw+0.4rem)] border-b border-[var(--border-color)] cursor-pointer pl-0">Date</span>
                            <span className="cursor-pointer hovered">Sep 23, 2025</span>
                            <span className="cursor-pointer hovered">Sep 23, 2025</span>
                            <span className="cursor-pointer hovered">Oct 04, 2025</span>    
                            <span className="cursor-pointer hovered">Oct 18, 2025</span>             
                        </div>
                        <div className="h-full flex-1 flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]  text-[calc(0.4vw+0.6rem)]">
                            <span className="hovered w-full p-[calc(0.3vw+0.4rem)] border-b border-[var(--border-color)] cursor-pointer pl-0">Time</span>
                            <span className="cursor-pointer hovered">9:15 AM</span>
                            <span className="cursor-pointer hovered">1:20 PM</span>
                            <span className="cursor-pointer hovered">4:32 PM</span>    
                            <span className="cursor-pointer hovered">8:44 PM</span>             
                        </div>
        
                    </div>
                </div>

            </div> 

        </section>
    )
}

export default Dashboard