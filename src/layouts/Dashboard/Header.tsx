import { useState, type SetStateAction } from "react";
import Theme from "../../components/Global/Theme";
import DarkIcon from "../../assets/ui/dark-icon.png"
import LightIcon from "../../assets/ui/light-icon.png"
import useIsMobile from "../../hooks/useIsMobile";
import { SidenavCard } from "../../components/Dashboard/SidenavCard"

type changeTheme = {
    isDark: boolean;
    setIsDark: React.Dispatch<SetStateAction<boolean>>;
}

function Header({isDark, setIsDark}: changeTheme) {

    const isMobile = useIsMobile();

    const [isSidenavActive, setIsSidenavActive] = useState(false);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

    return (
        <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
            fade-in sticky top-0 left-0 z-2 h-auto w-full flex flex-row items-center justify-between border-b border-[var(--border-color)] p-[12px]`}>
            <div className="flex flex-row items-center gap-[calc(0.4vw+0.6rem)]">
                {isMobile && <i className="bx bx-menu bx-bounce-hover text-[calc(0.8vw+1.2rem)] cursor-pointer" 
                    onClick={() => setIsSidenavActive((prev) => !prev)}></i>}
                <img src={isDark? DarkIcon : LightIcon} className="h-[calc(1vw+1.4rem)] w-[calc(1vw+1.4rem)] cursor-pointer hovered"/>
                <span className="text-[calc(0.6vw+0.8rem)] cursor-pointer font-semibold hovered">DriveSense</span>
            </div>
                
            <div className="flex flex-row items-center gap-[calc(0.4vw+0.6rem)]">
                <i className='bx bx-user-circle bx-tada-hover hovered text-[calc(1vw+1.2rem)] cursor-pointer'></i> 
                <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">@Username</span>
                <Theme isDark={isDark} setIsDark={setIsDark}/>
            </div>

            {isMobile && isSidenavActive && <div className="h-screen w-screen bg-[rgba(0,0,0,0.50)] absolute top-0 left-0">
                <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
                    h-screen w-[50vw] absolute top-0 left-0 flex flex-col items-start justify-start gap-[calc(0.4vw+1rem)] p-[calc(0.4vw+0.7rem)]`}>
                    <i className="bx bx-x bx-rotate-hover text-[calc(0.6vw+1rem)] cursor-pointer mt-[calc(0.2vw+0.2rem)]"
                        onClick={() => setIsSidenavActive((prev) => !prev)}></i>
                    
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className={`${
                            activeIndex === index ? "bg-[var(--border-color)]" : ""
                            } flex flex-row items-center justify-start gap-[calc(0.4vw+0.6rem)] 
                            cursor-pointer transition duration-300 ease-in-out`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <SidenavCard icon={item.icon} title={item.title} />
                        </div>
                    ))}
                </div>
            </div>}

        </div>
    )
}

export default Header