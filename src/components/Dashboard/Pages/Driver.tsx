import { useState, type SetStateAction } from "react";
import useIsMobile from "../../../hooks/useIsMobile"
import AddDriver from "../AddDriver";
import type { UserInfo, DriverInfo } from "../../../App";
import DeleteDriver from "../DeleteDriver";

type driverProps = {
    isDark: boolean;
    user: UserInfo | null;
    driverInfo:  DriverInfo[];
    setDriverInfo: React.Dispatch<SetStateAction<DriverInfo[]>>;
    fetchDrivers: () => void;
}

function Driver({isDark, user, driverInfo, setDriverInfo, fetchDrivers}: driverProps) {

    const isMobile = useIsMobile(); 

    const [isVisible, setIsVisible] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
    const [selectedDriverIndex, setSelectedDriverIndex] = useState<number | null>(null);

    console.log("DriverInfo: ", driverInfo);

    return (
        <section id="main" className={`${isMobile? "p-[calc(0.4vw+0.6rem)] h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-full"}
            ${isDark? "" : ""}
            flex flex-col items-start justify-start w-full flex-5 border-[var(--border-color)] gap-[calc(0.4vw+0.6rem)]`}>

            <div className="flex-1 w-full flex flex-row items-center justify-between gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.6vw+1rem)] font-semibold cursor-pointer hovered">Driver Information</span>
                <div className="flex flex-row items-center jsutify-center rounded-lg cursor-pointer text-[calc(0.4vw+0.5rem)] 
                    text-[var(--light-color)] bg-[var(--purple-color)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] gap-[calc(0.2vw+0.3rem)]"
                    onClick={() => setIsVisible((prev) => !prev)}>
                    <i className='bx bx-plus bx-tada-hover'></i> 
                    <span className="">Add Driver</span>
                </div>
            </div>

            {isVisible && <AddDriver user={user} driverInfo={driverInfo} setDriverInfo={setDriverInfo}/>}

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                <div className="h-auto w-full flex flex-col items-start justify-start bg-[var(--purple-color)] text-[var(--light-color)] p-[calc(0.4vw+0.6rem)]">
                    <div className="h-auto w-full flex flex-row items-start justify-start gap-[calc(0.6vw+1rem)]">
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Id</span>  
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Name</span>   
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Contact</span>  
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">License</span>  
                        <div className="flex-1 flex flex-row itens-center justify-end cursor-pointer text-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]">
                            <i title="Refresh" className='bxr bx-refresh-cw bx-spin-hover hover:text-[var(--dark-color)] text-[calc(0.6vw+1rem)] transition duration-300 ease-in-out cursor-pointer'
                                onClick={fetchDrivers}></i> 
                        </div>
                    </div>        
                </div>
                
                {driverInfo.map((driver, index) => (
                    <div key={driver.id ?? index} className="h-auto w-full flex flex-col items-start justify-start p-[calc(0.4vw+0.6rem)] border-b border-[var(--border-color)]">
                        <div className="h-auto w-full flex flex-row items-start justify-start gap-[calc(0.6vw+1rem)]">
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{driver.id ?? "null"}</span>  
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{driver.name ?? "null"}</span>   
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{driver.contact ?? "null"}</span>  
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{driver.license ?? "null"}</span>  
                            <div className="flex-1 flex flex-row items-center justify-end cursor-pointer text-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]">
                                <i className='bx bx-edit bx-tada-hover hovered text-[calc(0.8vw+1rem)] cursor-pointer'></i> 
                                <i
                                    className='bx bx-trash bx-tada-hover text-[calc(0.8vw+1rem)] hover:text-red-500 transition duration-300 ease-in-out gap-[calc(0.4vw+0.6rem)] cursor-pointer'
                                    onClick={() => {
                                        setIsDelete(true);
                                        setSelectedDriverId(driver.id ? driver.id.toLocaleString() : "null");
                                        setSelectedDriverIndex(index);
                                    }}
                                ></i>
                            </div>
                        </div>
                    </div>
                ))}


                {isDelete && selectedDriverId && 
                    <DeleteDriver user={user} 
                        driverInfo={driverInfo} 
                        setDriverInfo={setDriverInfo} 
                        driverId={selectedDriverId} 
                        driverIndex={selectedDriverIndex}
                    />
                }
                
                
            </div>
            

        </section>
    )
}

export default Driver