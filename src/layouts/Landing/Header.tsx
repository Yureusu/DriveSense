import { useState, type SetStateAction } from "react";
import Theme from "../../components/Global/Theme";
import DarkIcon from "../../assets/ui/dark-icon.png"
import LightIcon from "../../assets/ui/light-icon.png"
import useIsMobile from "../../hooks/useIsMobile";

type headerProps = {
    isDark: boolean;
    setIsDark: React.Dispatch<SetStateAction<boolean>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

function Header({isDark, setIsDark, isLoggedIn, setIsLoggedIn}: headerProps) {

    const isMobile = useIsMobile();

    const [isSidenavActive, setIsSidenavActive] = useState(false);

    const handleSignIn = () => {
        setIsLoggedIn((prev) => !prev);
        console.log('loggedIn')
    }

    return (
        <div className={`${isLoggedIn? "" : ""}
            ${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
            fade-in sticky top-0 left-0 z-2 h-auto w-full flex flex-row items-center justify-between border-b border-[var(--border-color)] p-[12px]`}>
            <div className="flex flex-row items-center gap-[calc(0.4vw+0.6rem)]">
                {isMobile && <i className="bx bx-menu bx-bounce-hover text-[calc(0.8vw+1.2rem)] cursor-pointer" 
                    onClick={() => setIsSidenavActive((prev) => !prev)}></i>}
                <img src={isDark? DarkIcon : LightIcon} className="h-[calc(1vw+1.4rem)] w-[calc(1vw+1.4rem)] cursor-pointer hovered"/>
                <span className="text-[calc(0.6vw+0.8rem)] cursor-pointer font-semibold hovered">DriveSense</span>
            </div>

            {!isMobile && <div className="flex flex-row items-center gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Home</span>
                <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Features</span>
                <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Github</span>
            </div>}
                
            <div className="flex flex-row items-center gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Docs</span>
                <span className={`${isDark? "text-[var(--dark-color)] bg-[var(--light-color)] text-[calc(0.4vw+0.5rem)]" : "text-[var(--light-color)] bg-[var(--dark-color)] text-[calc(0.4vw+0.5rem)]"}
                    px-[calc(0.4vw+0.6rem)] py-[calc(0.2vw+0.3rem)] rounded-md cursor-pointer
                    hover:bg-[var(--purple-color)] transition duration-300 ease-in-out hover:text-[var(--light-color)] font-semibold`}
                    onClick={() => handleSignIn()}>
                    Sign In
                </span>
                <Theme isDark={isDark} setIsDark={setIsDark}/>
            </div>

            {isMobile && isSidenavActive && <div className="h-screen w-screen bg-[rgba(0,0,0,0.50)] absolute top-0 left-0">
                <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
                    h-screen w-[50vw] absolute top-0 left-0 flex flex-col items-start justify-start gap-[calc(0.4vw+1rem)] p-[calc(0.4vw+0.7rem)]`}>
                    <i className="bx bx-x bx-rotate-hover text-[calc(0.6vw+1rem)] cursor-pointer mt-[calc(0.2vw+0.2rem)]"
                        onClick={() => setIsSidenavActive((prev) => !prev)}></i>
                    <span className="text-[calc(0.5vw+0.6rem)] w-full cursor-pointer hovered font-semibold">Home</span>
                    <span className="text-[calc(0.5vw+0.6rem)] w-full cursor-pointer hovered font-semibold">Features</span>
                    <span className="text-[calc(0.5vw+0.6rem)] w-full cursor-pointer hovered font-semibold">Github</span>
                </div>
            </div>}

        </div>
    )
}

export default Header