import useIsMobile from "../../../hooks/useIsMobile"
import { useEffect, useState } from "react";
import type { UserInfo, DriverInfo, VehicleInfo, FuelInfo } from "../../../App";
import type { SetStateAction } from "react";

type FuelProps = {
    isDark: boolean;
    user: UserInfo | null;
    driverInfo:  DriverInfo[];
    vehicleInfo:  VehicleInfo[];
    fuelInfo: FuelInfo[];
    setFuelInfo: React.Dispatch<SetStateAction<FuelInfo[]>>;
}

function Fuel({isDark, driverInfo, vehicleInfo }: FuelProps) {

    const isMobile = useIsMobile();

    const [passedDriverNames, setPassedDriverNames] = useState<string[] | null>(null);
    const [passedVehicleNames, setPassedVehicleNames] = useState<string[] | null>(null);

    const [fuelsId, setFuelsId] = useState<string[]>([]);

    const [fuelId, setFuelId] = useState<string[]>([]);
    const [fuelVehicle, setFuelVehicle] = useState<string[]>([]);
    const [fuelVolume, setFuelVolume] = useState<string[]>([]);
    const [fuelCost, setFuelCost] = useState<string[]>([]);
    const [fuelAddedBy, setFuelAddedBy] = useState<string[]>([]);
    const [fuelLoggedDate, setFuelLoggedDate] = useState<string[]>([]);

    if(passedDriverNames && passedVehicleNames  ){
        setFuelId
        setFuelsId
        setFuelVehicle
        setFuelVolume
        setFuelCost
        setFuelAddedBy
        setFuelLoggedDate
    }

    useEffect(() => {
        if (driverInfo && Array.isArray(driverInfo)) {
            const names = driverInfo.map(driver => driver.name ?? "null");
            setPassedDriverNames(names);
        }
    }, [driverInfo]);
    
    //para ma check ko if napapass ba sa state ung names ng dirvers

    useEffect(() => {
        // console.log("🔥 vehicleInfo received:", vehicleInfo, "Length:", vehicleInfo?.length);
        if (vehicleInfo && Array.isArray(vehicleInfo)) {
            const names = vehicleInfo.map(vehicle => vehicle.model ?? "null");
            setPassedVehicleNames(names);
        }
    }, [vehicleInfo]);

    // console.log("Driver Names: ", passedDriverNames);
    // console.log("Vehicle Names: ", passedVehicleNames);

    return (
        <section id="main" className={`${isMobile? "p-[calc(0.4vw+0.6rem)] h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-full"}
            ${isDark? "" : ""}
            flex flex-col items-start justify-start w-full flex-5 border-[var(--border-color)] gap-[calc(0.4vw+0.6rem)]`}>

            <div className="flex-1 w-full flex flex-row items-center justify-between gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.6vw+1rem)] font-semibold cursor-pointer hovered">Fuel Logs</span>
                <div className="flex flex-row items-center jsutify-center rounded-md cursor-pointer text-[calc(0.4vw+0.5rem)] 
                    text-[var(--light-color)] bg-[var(--purple-color)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] gap-[calc(0.2vw+0.3rem)]"
                    >
                    <i className='bx bx-plus bx-tada-hover'></i> 
                    <span className="">Add Fuel Log</span>
                </div>
            </div>

            {/* {isVisible && <AddVehicle user={user} driverInfo={driverInfo} isDark={isDark} vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo}/>} */}

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                <div className="h-auto w-full flex flex-col items-start justify-start bg-[var(--purple-color)] text-[var(--light-color)] p-[calc(0.4vw+0.6rem)]">
                    <div className="h-auto w-full flex flex-row items-start justify-start">
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Id</span>  
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Vehicle</span>   
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Volume(L)</span>  
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Cost</span>  
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Added By</span>  
                        <span className="flex-1 cursor-pointer text-[calc(0.4vw+0.6rem)]">Log Date</span>  
                        <div className="flex-1 flex flex-row itens-center justify-end cursor-pointer text-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]">
                            <i title="Refresh" className='bxr bx-refresh-cw bx-spin-hover hover:text-[var(--dark-color)] text-[calc(0.6vw+1rem)] transition duration-300 ease-in-out cursor-pointer'
                                ></i> 
                        </div>
                    </div>        
                </div>
                {fuelsId?.map((id, index) => (
                    <div key={id} className="h-auto w-full flex flex-col items-start justify-start p-[calc(0.4vw+0.6rem)] border-b border-[var(--border-color)]">
                        <div className="h-auto w-full flex flex-row items-start justify-start ">
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{fuelId[index] ?? "null"}</span>  
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{fuelVehicle[index] ?? "null"}</span>  
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{fuelVolume[index] ?? "null"}</span>   
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{fuelCost[index] ?? "null"}</span>  
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{fuelAddedBy[index] ?? "null"}</span>  
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{fuelLoggedDate[index] ?? "null"}</span> 
                            <div className="flex-1 flex flex-row itens-center justify-end cursor-pointer text-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]">
                                <i className='bx bx-edit bx-tada-hover hovered text-[calc(0.8vw+1rem)] cursor-pointer'></i> 
                                <i className='bx bx-trash bx-tada-hover text-[calc(0.8vw+1rem)] hover:text-red-500 transition duration-300 ease-in-out gap-[calc(0.4vw+0.6rem)] cursor-pointer'
                                    >
                                </i> 
                            </div>
                        </div>        
                    </div>
                ))}
            </div>
            
        </section>
    )
}

export default Fuel