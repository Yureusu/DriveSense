import { useState, type SetStateAction } from "react";
import Header from "../layouts/Dashboard/Header"
import Content from "../layouts/Dashboard/Content";
import type { UserInfo, DriverInfo, VehicleInfo, FuelInfo } from "../App";

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
}

function Dashboard({user, driverInfo, setDriverInfo, vehicleInfo, setVehicleInfo, 
    fuelInfo, setFuelInfo, isLoggedIn,setIsLoggedIn}: DashboardProps) {

    const [isDark, setIsDark] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header isDark={isDark} setIsDark={setIsDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Content isDark={isDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user}
                driverInfo={driverInfo} setDriverInfo={setDriverInfo} 
                vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo}   
                fuelInfo={fuelInfo} setFuelInfo={setFuelInfo}
                />
        </div>
    )
}

export default Dashboard