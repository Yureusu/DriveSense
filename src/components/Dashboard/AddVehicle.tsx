import { useEffect, useState, type SetStateAction } from "react";
import type { UserInfo, DriverInfo, VehicleInfo } from "../../App"
import useIsMobile from "../../hooks/useIsMobile";
import { db } from "../../server/Firebase/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useFetchDriver } from "../../hooks/Fetch/useFetchDriver";

type AddVehicleProps = {
    user: UserInfo | null;
    driverInfo:  DriverInfo[];
    isDark: boolean;
    vehicleInfo: VehicleInfo[];
    setVehicleInfo: React.Dispatch<SetStateAction<VehicleInfo[]>>;
    setIsVisible: (value: boolean) => void
}

function AddVehicle({user, isDark, vehicleInfo, setVehicleInfo, setIsVisible}: AddVehicleProps) {

    const { driverInfo } = useFetchDriver(user);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const isMobile = useIsMobile();

    const [passedDriverNames, setPassedDriverNames] = useState<string[] | null>(null);

    useEffect(() => {
        console.log("driverInfo prop:", driverInfo);
        if (driverInfo && Array.isArray(driverInfo)) {
            const names = driverInfo.map(driver => driver.name ?? "null");
            setPassedDriverNames(names);
        }
    }, [driverInfo])
    
    //para ma check ko if napapass ba sa state ung names ng dirvers
    useEffect(() => {
        console.log("Driver Names: ", passedDriverNames);
    }, [passedDriverNames]);

    //save dito ung input
    const [plateNumber, setPlateNumber] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);
    const [driver, setDriver] = useState<string | null>(null);

    //add driver to db
    const handleSubmit = async () => {
        if(!user?.uid) return;

        const dateTime = new Date();
        const formatted = `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
        const customId = (vehicleInfo.length + 1).toString();

        const vehicleRef = doc(db, "users", user?.uid, "vehicles", customId);
        const vehicleSnap = await setDoc(vehicleRef, {
            id: customId,
            plateNumber: plateNumber,
            model: model,
            driver: driver,
            createdAt: formatted
        });

        const newVehicle: VehicleInfo = {
            id: customId, 
            plateNumber: plateNumber,
            model: model,
            driver: driver,
            createdAt: formatted
        };
        //inupdate ko ung driverInfo with the new addded vehicle
        setVehicleInfo(prev => [...prev, newVehicle]);
        console.log(vehicleInfo);

        console.log("Added the vehicle successfully: ", vehicleSnap);
        setIsFormVisible((prev) => !prev);
        setIsVisible(false);
    }
    
    return (
        <>
            {!isFormVisible && <div className={`fade-in absolute top-0 left-0 z-2 h-screen w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.80)]`}>
                <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)] border border-[var(--light-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
                    h-auto w-[420px] flex flex-col items-center justify-center relative rounded-lg rounded-tr-none`}>
                    <i className='fa-solid fa-circle-xmark text-[calc(1vw+1.2rem)] text-[var(--blue-color)] hovered
                        flex flex-row items-center justify-center absolute top-[-10px] right-[-14px] cursor-pointer'
                        onClick={() => setIsFormVisible((prev) => !prev)}></i> 

                    {/*Form*/}
                    <div className={`${isMobile? "" : ""}
                        h-full w-full flex flex-col items-center justify-start p-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]`}>
                        
                        <div className={`${user? "" : ""} flex-2 w-full flex flex-col items-center justify-end`}>
                            <span className="text-[calc(0.4vw+0.8rem)] font-semibold">Add a new vehicle</span>
                        </div>

                        <div className="flex-2 w-full flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)]">
                            <input type="text" placeholder="Plate Number" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-lg focus:border-[var(--purple-color)]
                                placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full"
                                onChange={(e) => setPlateNumber(e.target.value)} required/>
                            <input type="text" placeholder="Model" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-lg focus:border-[var(--purple-color)]
                                placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full" 
                                onChange={(e) => setModel(e.target.value)} required/>
                                
                            <select id="driver-names" value={driver ?? ""}
                                className="focus:border-[var(--purple-color)] custom-select cursor-pointer text-[calc(0.4vw+0.5rem)] w-full p-[calc(0.3vw+0.4rem)] outline-none border border-[var(--border-color)] rounded-lg"
                                onChange={(e) => setDriver(e.target.value)}>
                                <option value="" disabled>Select a driver</option>

                                {passedDriverNames?.map((drivername, index) => (
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

export default AddVehicle