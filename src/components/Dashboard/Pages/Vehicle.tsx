import { useState } from "react";
import useIsMobile from "../../../hooks/useIsMobile"
import AddVehicle from "../AddVehicle";
import type { UserInfo } from "../../../App";

type changeTheme = {
    isDark: boolean;
    user: UserInfo | null;
}

function Vehicle({isDark, user} : changeTheme) {

    const isMobile = useIsMobile(); 

    const [isVisible, setIsVisible] = useState(false);

    return (
        <section id="main" className={`${isMobile? "p-[calc(0.4vw+0.6rem)] h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-full"}
        ${isDark? "" : ""}
        flex flex-col items-start justify-start w-full flex-5 border-[var(--border-color)] gap-[calc(0.4vw+0.6rem)]`}>

            <div className="flex-1 w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.8vw+1.2rem)] font-semibold cursor-pointer hovered">Vehicle Information</span>
                <span className="text-[calc(0.4vw+0.5rem)] text-[var(--light-color)] bg-[var(--purple-color)] 
                px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-lg cursor-pointer"
                onClick={() => setIsVisible((prev) => !prev)}>Add Vehicle</span>
            </div>

            {isVisible && <AddVehicle user={user} />}

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)] rounded-xl bordered">

            </div>
            

        </section>
    )
}

export default Vehicle