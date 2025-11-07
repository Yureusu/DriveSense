import useIsMobile from "../../../hooks/useIsMobile"
import type { UserInfo } from "../../../App";
import EditDisplayName from "../Settings/EditDisplayName";
import type { SetStateAction } from "react";
import Theme from "../../Global/Theme";
import { getAuth, signOut } from "firebase/auth";

type SettingsProps = {
    isDark: boolean;
    setIsDark: React.Dispatch<SetStateAction<boolean>>;
    user: UserInfo | null;
    setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

function Settings({isDark, user, setUser, setIsDark, setIsLoggedIn}: SettingsProps) {

    const isMobile = useIsMobile();

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Signed out successfully!");   
            setIsLoggedIn(false);
        }).catch((err) => {
            console.error(err);
        });
    }

    return (
        <div className={`${isDark? "text-[var(--light-color)]" : "text-[var(--dark-color)]"}
            ${isMobile? "h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-full"}
            flex flex-col items-center justify-start h-full flex-5 border-[var(--border-color)]`}>

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                
                <div className="w-full flex flex-row items-center justify-between gap-[calc(0.4vw+0.6rem)]">
                    <span className={`${isMobile? "text-[calc(0.6vw+0.9rem)]" : "text-[calc(0.6vw+1rem)]"}
                        font-semibold cursor-pointer hovered`}>Settings</span>     
                    <div className="flex flex-row items-center justify-between gap-[calc(0.4vw+0.6rem)]">
                        <span className="text-[calc(0.4vw+0.6rem)]">Sign Out</span>
                        <i className='bx bx-arrow-out-right-square-half bx-tada-hover text-[calc(0.4vw+1.3rem)] hover:text-red-500 transition duration-300 ease-in-out cursor-pointer'
                            onClick={() => handleLogout()}></i>
                    </div>
                    
                </div>

                <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                    <EditDisplayName isDark={isDark} user={user} setUser={setUser}/>

                    <div className="h-full w-full flex flex-row items-start justify-between">
                        <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer">{`Change Theme :`}</span>
                        <Theme isDark={isDark} setIsDark={setIsDark}/>
                    </div>
                </div>
        
            </div>

        </div>
    )
}

export default Settings