import { useState, type SetStateAction } from "react";
import Header from "../layouts/Dashboard/Header"
import Content from "../layouts/Dashboard/Content";
import type { UserInfo, DriverInfo, VehicleInfo, FuelInfo, MaintenanceInfo, RecentActivities } from "../App";

type DashboardProps ={
    user: UserInfo | null;
    setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
    driverInfo:  DriverInfo[];
    setDriverInfo: React.Dispatch<SetStateAction<DriverInfo[]>>;
    vehicleInfo: VehicleInfo[];
    setVehicleInfo: React.Dispatch<SetStateAction<VehicleInfo[]>>;
    fuelInfo: FuelInfo[];
    setFuelInfo: React.Dispatch<SetStateAction<FuelInfo[]>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
    maintenanceInfo: MaintenanceInfo[];
    setMaintenanceInfo: React.Dispatch<SetStateAction<MaintenanceInfo[]>>;
    recentActivity: RecentActivities[];
}

function Dashboard({user, setUser, driverInfo, setDriverInfo, vehicleInfo, setVehicleInfo, 
    maintenanceInfo, isLoggedIn, setIsLoggedIn, fuelInfo, recentActivity}: DashboardProps) {

    const [isDark, setIsDark] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header isDark={isDark} setIsDark={setIsDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Content isDark={isDark} setIsDark={setIsDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user} setUser={setUser}
            driverInfo={driverInfo} setDriverInfo={setDriverInfo}
            vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo}
            maintenanceInfo={maintenanceInfo} fuelInfo={fuelInfo}
            recentActivity={recentActivity} setIsLoggedIn={setIsLoggedIn}/>
        </div>
    )
}

export default Dashboard