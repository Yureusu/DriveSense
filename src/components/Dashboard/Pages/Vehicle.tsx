import { useEffect, useState, type SetStateAction } from "react";
import useIsMobile from "../../../hooks/useIsMobile"
import AddVehicle from "../AddVehicle";
import type { UserInfo, DriverInfo, VehicleInfo } from "../../../App";
import { db } from "../../../server/Firebase/Firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

type changeTheme = {
    isDark: boolean;
    user: UserInfo | null;
    driverInfo:  DriverInfo[];
    vehicleInfo: VehicleInfo[];
    setVehicleInfo: React.Dispatch<SetStateAction<VehicleInfo[]>>;
}

function Vehicle({isDark, user, driverInfo, vehicleInfo, setVehicleInfo} : changeTheme) {

    const isMobile = useIsMobile(); 

    const [isVisible, setIsVisible] = useState(false);

    const [vehiclesId, setVehiclesId] = useState<string[]>([]);

    const [vehicleId, setVehicleId] = useState<string[]>([]);
    const [vehiclePlateNumber, setVehiclePlateNumber] = useState<string[]>([]);
    const [vehicleModel, setVehicleModel] = useState<string[]>([]);
    const [vehicleDriver, setVehicleDriver] = useState<string[]>([]);
    const [vehicleCreatedAt, setVehicleCreatedAt] = useState<string[]>([]);

    //fetch all vehicles

    const fetchVehicles = async () => {
        if(!user?.uid) return;
        
        try{
            //dito kinuha ung vehicle id
            const vehicleRef = collection(db, "users", user?.uid, "vehicles");
            const vehicleSnap = await getDocs(vehicleRef);

            //dito ko iistore mga vehicles
            const fetchedVehiclesId: string[] = [];

            vehicleSnap.forEach((doc) => {
                fetchedVehiclesId.push(doc.id)
            });

            //saving sa vehiclesArr
            setVehiclesId(fetchedVehiclesId);
            //to check lng if na lagay sa arr
            console.log("Fetched vehicles Id: ", vehiclesId);

            //dito kinuha ung fields
            const fetchedVehicleInfos: VehicleInfo[] = [];

            try{
                if(vehiclesId.length > 0){
                    for(const vehicleId of fetchedVehiclesId){
                        const docRef = doc(db, "users", user?.uid, "vehicles", vehicleId);
                        const docSnap = await getDoc(docRef);

                        if(docSnap.exists() && vehicleId){

                            const data = docSnap.data();

                            const driverInfos: VehicleInfo = {
                                id: data.id ?? null,
                                plateNumber: data.plateNumber ?? null,
                                model: data.model ?? null,
                                driver: data.driver ?? null,
                                createdAt: data.createdAt ?? null                  
                            }

                            fetchedVehicleInfos.push(driverInfos);
                            
                            //checking kung na lolog ung fields
                            console.log("id: ", data.id);
                            console.log("platenumber: ", data.plateNumber);
                            console.log("model: ", data.model);
                            console.log("driver: ", data.driver);
                            console.log("createdAt: ", data.createdAt);
                        }
                    }
                    setVehicleInfo(fetchedVehicleInfos);
                }

            } catch(err){
                console.error("Cant fetch vehicle fields", err);
            }
            

        } catch(err){
            console.error("Can't fetech the vehicles :(", err);
        }
    }

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    useEffect(() => {
        const id = vehicleInfo.map(vehicle => String(vehicle.id ?? "null"));
        setVehicleId(id);
        console.log("List of driver names: ", id);

        const plateNumber = vehicleInfo.map(vehicle => vehicle.plateNumber ?? "null");
        setVehiclePlateNumber(plateNumber);
        console.log("List of driver names: ", vehiclePlateNumber);

        const model = vehicleInfo.map(vehicle => vehicle.model ?? "null");
        setVehicleModel(model);
        console.log("List of driver names: ", vehicleModel);

        const driver = vehicleInfo.map(vehicle => vehicle.driver ?? "null");
        setVehicleDriver(driver);
        console.log("List of driver names: ", vehicleDriver);

        const createdAt = vehicleInfo.map(vehicle => vehicle.createdAt ?? "null");
        setVehicleCreatedAt(createdAt);
        console.log("List of driver names: ", vehicleCreatedAt);

    }, [vehicleInfo]);

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
                {vehiclesId?.map((id, index) => (
                    <div key={id} className="h-auto w-full flex flex-col items-start justify-start p-[calc(0.4vw+0.6rem)] border-b border-[var(--border-color)]">
                        <div className="h-auto w-full flex flex-row items-start justify-start ">
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{vehicleId[index] ?? "null"}</span>  
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{vehicleDriver[index] ?? "null"}</span>  
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{vehiclePlateNumber[index] ?? "null"}</span>   
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{vehicleModel[index] ?? "null"}</span>  
                            <span className="flex-1 hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">{vehicleCreatedAt[index] ?? "null"}</span>  
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

export default Vehicle