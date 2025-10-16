import { useState, type SetStateAction } from "react";
import Header from "../layouts/Dashboard/Header"
import Content from "../layouts/Dashboard/Content";
import type { UserInfo, DriverInfo, VehicleInfo } from "../App";

type DashboardProps ={
    user: UserInfo | null;
    driverInfo:  DriverInfo[];
    setDriverInfo: React.Dispatch<SetStateAction<DriverInfo[]>>;
    vehicleInfo: VehicleInfo[];
    setVehicleInfo: React.Dispatch<SetStateAction<VehicleInfo[]>>;
}

function Dashboard({user, driverInfo, setDriverInfo, vehicleInfo, setVehicleInfo}: DashboardProps) {

    const [isDark, setIsDark] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header isDark={isDark} setIsDark={setIsDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user}/>
            <Content isDark={isDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user}
                driverInfo={driverInfo} setDriverInfo={setDriverInfo} vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo}/>
        </div>
    )
}

export default Dashboard