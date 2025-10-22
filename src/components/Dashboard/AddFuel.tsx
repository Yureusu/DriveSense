import { useEffect, useState, type SetStateAction } from "react";
import type { UserInfo, FuelInfo, VehicleInfo, DriverInfo } from "../../App"
import { db } from "../../server/Firebase/Firebase";
import { doc, setDoc } from "firebase/firestore";

type AddFuelProps = {
    isDark: boolean;
    user: UserInfo | null;
    fuelInfo: FuelInfo[];
    vehicleInfo: VehicleInfo[];
    driverInfo: DriverInfo[];
    refetch: () => void;
    setIsAddFuel: React.Dispatch<SetStateAction<boolean>>;
}

function AddFuel({ isDark, user, fuelInfo, vehicleInfo, driverInfo, refetch, setIsAddFuel }: AddFuelProps) {

    const [vehcileModel, setVehicleModel] = useState<string[] | null>([]);
    const [driverNames, setDriverNames] = useState<string[] | null>([]);
    const [fuelLogs, setFuelLogs] = useState<string[]>([]);

    useEffect(() => {

        const models = vehicleInfo.map((vehicle) => vehicle.model ?? "null");
        setVehicleModel(models);
        const drivers = driverInfo.map((driver) => driver.name ?? "null");
        setDriverNames(drivers);
        const fuelLogs = fuelInfo.map((fuels) => fuels.id ?? "null");
        setFuelLogs(fuelLogs);

    }, [vehicleInfo]);

    const [isFormVisible, setIsFormVisible] = useState(true);

    const [fuelVehicle, setFuelVehicle] = useState<string | null>(null);
    const [fuelVolume, setFuelVolume] = useState<string | null>(null);
    const [fuelCost, setFuelCost] = useState<string | null>(null);
    const [fuelAddedBy, setFuelAddedBy] = useState<string | null>(null);

    const handleSubmit = async () => {
        try{
            if (!user?.uid) return;
            const customId = (fuelLogs.length + 1).toString();
            const dateTime = new Date();
            const formatted = `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;

            const docRef = doc(db, "users", user?.uid, "fuels", customId);
            await setDoc(docRef, {
                id: customId,
                vehicle: fuelVehicle,
                volume: fuelVolume,
                cost: fuelCost,
                addedBy: fuelAddedBy,
                logDate: formatted
            });

            setIsFormVisible((prev) => !prev);
            setIsAddFuel((prev) => !prev);
            refetch();

        }catch(err){
            console.error("Cant add fuel log.", err);
        }
    }
    
    return (
        <>
            {isFormVisible && <div className={`fade-in absolute top-0 left-0 z-2 h-screen w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.80)]`}>
                <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)] border border-[var(--light-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
                    h-auto w-[420px] flex flex-col items-center justify-center relative rounded-lg rounded-tr-none`}>
                    <i className='fa-solid fa-circle-xmark text-[calc(1vw+1.2rem)] text-[var(--blue-color)] hovered
                        flex flex-row items-center justify-center absolute top-[-10px] right-[-14px] cursor-pointer'
                        onClick={() => setIsFormVisible((prev) => !prev)}></i> 

                    {/*Form*/}
                    <div className={`
                        h-full w-full flex flex-col items-center justify-start p-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]`}>
                        
                        <div className={`flex-2 w-full flex flex-col items-center justify-end`}>
                            <span className="text-[calc(0.4vw+0.8rem)] font-semibold">Add a new vehicle</span>
                        </div>

                        <div className="flex-2 w-full flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)]">
                            
                            <select className="focus:border-[var(--purple-color)] custom-select cursor-pointer text-[calc(0.4vw+0.5rem)] w-full p-[calc(0.3vw+0.4rem)] outline-none border border-[var(--border-color)] rounded-lg"
                                onChange={(e) => setFuelVehicle(e.target.value)}>
                                <option value="Select a vehicle" disabled>Select a vehicle</option>

                                {vehcileModel?.map((vehiclename, index) => (
                                    <option key={index} value={vehiclename} className={`text-[var(--dark-color)] cursor-pointer`}>
                                        {vehiclename}
                                    </option>
                                ))}

                            </select>

                            <input type="text" placeholder="Volume" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-lg focus:border-[var(--purple-color)]
                                placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full"
                                onChange={(e) => setFuelVolume(e.target.value)} required/>
                            <input type="text" placeholder="Cost" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-lg focus:border-[var(--purple-color)]
                                placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full" 
                                onChange={(e) => setFuelCost(e.target.value)} required/>

                            <select value="Select a driver" className="focus:border-[var(--purple-color)] custom-select cursor-pointer text-[calc(0.4vw+0.5rem)] w-full p-[calc(0.3vw+0.4rem)] outline-none border border-[var(--border-color)] rounded-lg"
                                onChange={(e) => setFuelAddedBy(e.target.value)}>
                                <option value="" disabled>Select a driver</option>

                                {driverNames?.map((drivername, index) => (
                                    <option key={index} value={drivername} className={`text-[var(--dark-color)] cursor-pointer`}>
                                        {drivername}
                                    </option>
                            ))}

                            </select>

                            <span className="text-[calc(0.4vw+0.5rem)] text-[var(--light-color)] w-full px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-lg text-center cursor-pointer 
                                bg-[var(--blue-color)] hover:bg-[var(--purple-color)] transition duration-300 ease-in-out"
                                onClick={() => handleSubmit()}>Continue</span>
                        </div>

                    </div>
                        
                </div>
            </div>}
        </>
    )
}

export default AddFuel