import { useState } from "react";
import { SidenavCard } from "../../components/Dashboard/SidenavCard"
import useIsMobile from "../../hooks/useIsMobile";
import Dashboard from "../../components/Dashboard/Pages/Dashboard";
import Vehicle from "../../components/Dashboard/Pages/Vehicle";

type changeTheme = {
    isDark: boolean;
}

function Content({isDark}: changeTheme) {

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const navItems = [
        { icon: "bx bx-dashboard bx-tada-hover hovered", title: "Dashboard" },
        { icon: "bx bx-car bx-tada-hover hovered", title: "Vehicle" },
        { icon: "bx bx-petrol-pump bx-tada-hover hovered", title: "Fuel" },
        { icon: "bx bx-map bx-tada-hover hovered", title: "Trip" },
        { icon: "bx bx-spanner bx-tada-hover hovered", title: "Maintenance" },
        { icon: "bx bx-report bx-tada-hover hovered", title: "Reports" },
        { icon: "bx bx-user bx-tada-hover hovered", title: "Users" },
        { icon: "bx bx-cog bx-tada-hover hovered", title: "Settings" }
    ];

    const dashboardPages = [
        <Dashboard isDark={isDark} />,
        <Vehicle isDark={isDark} />
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
            
            {dashboardPages[activeIndex] ?? <Dashboard isDark={isDark} />}
            
        </div>
    )
}

export default Content