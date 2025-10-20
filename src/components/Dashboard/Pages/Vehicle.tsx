import { useState, type SetStateAction } from "react";
import useIsMobile from "../../../hooks/useIsMobile"
import AddVehicle from "../AddVehicle";
import type { UserInfo, DriverInfo, VehicleInfo } from "../../../App";

type changeTheme = {
    isDark: boolean;
    user: UserInfo | null;
    driverInfo:  DriverInfo[];
    vehicleInfo: VehicleInfo[];
    setVehicleInfo: React.Dispatch<SetStateAction<VehicleInfo[]>>;
    fetchVehicles: () => void;
}

function Vehicle({isDark, user, driverInfo, vehicleInfo, setVehicleInfo, fetchVehicles} : changeTheme) {

    const isMobile = useIsMobile(); 

    const [isVisible, setIsVisible] = useState(false);

    return (
        <section id="main" className={`${isMobile? "p-[calc(0.4vw+0.6rem)] h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-full"}
            ${isDark? "" : ""}
            flex flex-col items-start justify-start w-full flex-5 border-[var(--border-color)] gap-[calc(0.4vw+0.6rem)]`}>

            <div className="flex-1 w-full flex flex-row items-center justify-between gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.6vw+1rem)] font-semibold cursor-pointer hovered">Vehicle Information</span>
                <div className="flex flex-row items-center jsutify-center rounded-md cursor-pointer text-[calc(0.4vw+0.5rem)] 
                    text-[var(--light-color)] bg-[var(--purple-color)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] gap-[calc(0.2vw+0.3rem)]"
                    onClick={() => setIsVisible((prev) => !prev)}>
                    <i className='bx bx-plus bx-tada-hover'></i> 
                    <span className="">Add Vehicle</span>
                </div>
            </div>

            {isVisible && <AddVehicle user={user} driverInfo={driverInfo} isDark={isDark} vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo}/>}

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                <div className="h-auto w-full flex flex-col items-start justify-start bg-[var(--purple-color)] text-[var(--light-color)] p-[calc(0.4vw+0.6rem)]">
                    <div className="h-auto w-full flex flex-row items-start justify-start">
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Id</span>  
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Driver</span>   
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Plate no.</span>  
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Model</span>  
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Created At</span>  
                        <div className="flex-1 flex flex-row itens-center justify-end cursor-pointer text-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]">
                            <i title="Refresh" className='bxr bx-refresh-cw bx-spin-hover hover:text-[var(--dark-color)] text-[calc(0.6vw+1rem)] transition duration-300 ease-in-out cursor-pointer'
                                onClick={() => fetchVehicles()}></i> 
                        </div>
                    </div>        
                </div>
                {vehicleInfo.map((vehicle) => (
                    <div key={vehicle.id} className="h-auto w-full flex flex-col items-start justify-start p-[calc(0.4vw+0.6rem)] border-b border-[var(--border-color)]">
                        <div className="h-auto w-full flex flex-row items-start justify-start ">
                        <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{vehicle.id ?? "null"}</span>  
                        <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{vehicle.driver ?? "null"}</span>  
                        <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{vehicle.plateNumber ?? "null"}</span>   
                        <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{vehicle.model ?? "null"}</span>  
                        <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{vehicle.createdAt ?? "null"}</span>  
                        <div className="flex-1 flex flex-row items-center justify-end cursor-pointer text-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]">
                            <i className='bx bx-edit bx-tada-hover hovered text-[calc(0.8vw+1rem)] cursor-pointer'></i> 
                            <i className='bx bx-trash bx-tada-hover text-[calc(0.8vw+1rem)] hover:text-red-500 transition duration-300 ease-in-out gap-[calc(0.4vw+0.6rem)] cursor-pointer'></i> 
                        </div>
                        </div>        
                    </div>
                ))}
            </div>
            
        </section>
    )
}

export default Vehicle