import { type SetStateAction } from "react";
import { SidenavCard } from "../../components/Dashboard/SidenavCard"
import useIsMobile from "../../hooks/useIsMobile";
import Dashboard from "../../components/Dashboard/Pages/Dashboard";
import Vehicle from "../../components/Dashboard/Pages/Vehicle";
import Driver from "../../components/Dashboard/Pages/Driver";
import type { UserInfo, DriverInfo } from "../../App";

type contentProps = {
    isDark: boolean;
    activeIndex: number;
    setActiveIndex: React.Dispatch<SetStateAction<number>>
    user: UserInfo | null;
    driverInfo:  DriverInfo[];
    setDriverInfo: React.Dispatch<SetStateAction<DriverInfo[]>>;
}

function Content({isDark , activeIndex, setActiveIndex, user, driverInfo, setDriverInfo}: contentProps) {  

    const navItems = [
        { icon: "bx bx-dashboard bx-tada-hover hovered", title: "Dashboard" },
        { icon: "bx bx-user bx-tada-hover hovered", title: "Drivers" },
        { icon: "bx bx-car bx-tada-hover hovered", title: "Vehicles" },
        { icon: "bx bx-petrol-pump bx-tada-hover hovered", title: "Fuel" },
        { icon: "bx bx-map bx-tada-hover hovered", title: "Trip" },
        { icon: "bx bx-spanner bx-tada-hover hovered", title: "Maintenance" },
        { icon: "bx bx-report bx-tada-hover hovered", title: "Reports" },
        { icon: "bx bx-user bx-tada-hover hovered", title: "Users" },
        { icon: "bx bx-cog bx-tada-hover hovered", title: "Settings" }
    ];

    const dashboardPages = [
        <Dashboard isDark={isDark} user={user}/>,
        <Driver isDark={isDark} user={user} driverInfo={driverInfo} setDriverInfo={setDriverInfo}/>,
        <Vehicle isDark={isDark} user={user} />
    ]

    const isMobile = useIsMobile();

    return (
        <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
            ${isMobile? "h-auto" : "h-screen"}
            fade-in w-full flex flex-row items-center justify-center p-[calc(0.4vw+0.6rem)]`}>
            
            {!isMobile && <section id="side-nav" className="h-full w-full flex-1">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className={`${
                        activeIndex === index ? "text-[var(--dark-color)] bg-[var(--border-color)]" : ""
                        } flex flex-row items-center justify-start p-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)] 
                        cursor-pointer transition duration-300 ease-in-out`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <SidenavCard icon={item.icon} title={item.title} />
                    </div>
                ))}
            </section>}
            
            {dashboardPages[activeIndex] ?? <Dashboard isDark={isDark} user={user}/>}
            
        </div>
    )
}

export default Content