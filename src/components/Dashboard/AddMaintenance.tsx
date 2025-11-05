import { useState, useEffect, type SetStateAction } from "react";
import type { UserInfo, MaintenanceInfo, VehicleInfo } from "../../App"
import { db } from "../../server/Firebase/Firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useFetchVehicle } from "../../hooks/Fetch/useFetchVehicle";

type AddMaintenanceProps = {
    isDark: boolean;
    user: UserInfo | null;
    maintenanceInfo: MaintenanceInfo[];
    vehicleInfo: VehicleInfo[];
    refetch: () => void;
    setIsAddMaintenance: React.Dispatch<SetStateAction<boolean>>;
}

function AddMaintenance({ isDark, user, maintenanceInfo, refetch, setIsAddMaintenance }: AddMaintenanceProps) {

    const { vehicleInfo } = useFetchVehicle(user);
    
    const [isFormVisible, setIsFormVisible] = useState(true);

    const [vehcileModel, setVehicleModel] = useState<string[]>([]);
    const [maintenanceRecords, setMaintenanceRecords] = useState<string[]>([]);

    useEffect(() => {
        
        const models = vehicleInfo.map((vehicle) => vehicle.model ?? "null");
        setVehicleModel(models);
        const maintenanceLogs = maintenanceInfo.map((maintenance) => maintenance.id ?? "null");
        setMaintenanceRecords(maintenanceLogs);

    }, [vehicleInfo]);

    const [maintenanceVehicle, setMaintenanceVehicle] = useState<string | null>(null);
    const [maintenanceDescription, setMaintenanceDescription] = useState<string | null>(null);
    const [maintenanceCost, setMaintenanceCost] = useState<string | null>(null);

    const handleSubmit = async () => {
        try{

            if(!user?.uid) return;
            const customId = (maintenanceRecords.length + 1).toString();
            const dateTime = new Date();
            const formatted = `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;

            const docRef = doc(db, "users", user?.uid, "maintenance", customId);
            await setDoc(docRef, {
                id: customId,
                vehicle: maintenanceVehicle,
                description: maintenanceDescription,
                cost: maintenanceCost,
                createdAt: formatted
            });

            const activitiesRef = collection(db, "users", user.uid, "activities");
            await addDoc(activitiesRef, {
                activity: "Added new maintenance record",
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            refetch();
            setIsFormVisible((prev) => !prev);
            setIsAddMaintenance((prev) => !prev);

        } catch(err){
            console.log(err);
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
                            <span className="text-[calc(0.4vw+0.8rem)] font-semibold">Add a new record</span>
                        </div>

                        <div className="flex-2 w-full flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)]">
                            
                            <select className="focus:border-[var(--purple-color)] custom-select cursor-pointer text-[calc(0.4vw+0.5rem)] w-full p-[calc(0.3vw+0.4rem)] outline-none border border-[var(--border-color)] rounded-lg"
                                value={maintenanceVehicle ?? ""}
                                onChange={(e) => setMaintenanceVehicle(e.target.value)}>
                                <option value="" disabled hidden>Select a vehicle</option>

                                {vehcileModel?.map((vehiclename, index) => (
                                    <option key={index} value={vehiclename} className={`text-[var(--dark-color)] cursor-pointer`}>
                                        {vehiclename}
                                    </option>
                                ))}

                            </select>

                            <input maxLength={20} type="text" placeholder="Description" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-lg focus:border-[var(--purple-color)]
                                placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full"
                                onChange={(e) => setMaintenanceDescription(e.target.value)} required/>

                            <input type="text" placeholder="Cost" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-lg focus:border-[var(--purple-color)]
                                placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full"
                                onChange={(e) => setMaintenanceCost(e.target.value)} required/>

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

export default AddMaintenance