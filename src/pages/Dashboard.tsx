import { useState, type SetStateAction } from "react";
import Header from "../layouts/Dashboard/Header"
import Content from "../layouts/Dashboard/Content";
import type { UserInfo, DriverInfo, VehicleInfo, FuelInfo, MaintenanceInfo } from "../App";

type DashboardProps ={
    user: UserInfo | null;
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
}

function Dashboard({user, driverInfo, setDriverInfo, vehicleInfo, setVehicleInfo, 
    maintenanceInfo, isLoggedIn, setIsLoggedIn, fuelInfo}: DashboardProps) {

    const [isDark, setIsDark] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header isDark={isDark} setIsDark={setIsDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Content isDark={isDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user}
            driverInfo={driverInfo} setDriverInfo={setDriverInfo}
            vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo}
            maintenanceInfo={maintenanceInfo} fuelInfo={fuelInfo}/>
        </div>
    )
}

export default Dashboard