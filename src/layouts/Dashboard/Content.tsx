import { type SetStateAction } from "react";
import { SidenavCard } from "../../components/Dashboard/SidenavCard"
import useIsMobile from "../../hooks/useIsMobile";
import Dashboard from "../../components/Dashboard/Pages/Dashboard";
import Vehicle from "../../components/Dashboard/Pages/Vehicle";
import Driver from "../../components/Dashboard/Pages/Driver";
import Fuel from "../../components/Dashboard/Pages/Fuel";
import Maintenance from "../../components/Dashboard/Pages/Maintenance";
import Reports from "../../components/Dashboard/Pages/Reports";
import Users from "../../components/Dashboard/Pages/Users";
import Settings
 from "../../components/Dashboard/Pages/Settings";
import type { UserInfo, DriverInfo, VehicleInfo, FuelInfo } from "../../App";
import { useEffect, useState } from "react";
import { db } from "../../server/Firebase/Firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

type contentProps = {
    isDark: boolean;
    activeIndex: number;
    setActiveIndex: React.Dispatch<SetStateAction<number>>
    user: UserInfo | null;
    driverInfo:  DriverInfo[];
    setDriverInfo: React.Dispatch<SetStateAction<DriverInfo[]>>;
    vehicleInfo: VehicleInfo[];
    setVehicleInfo: React.Dispatch<SetStateAction<VehicleInfo[]>>;
    fuelInfo: FuelInfo[];
    setFuelInfo: React.Dispatch<SetStateAction<FuelInfo[]>>;
}

function Content({isDark , activeIndex, setActiveIndex, user, driverInfo, setDriverInfo, 
    fuelInfo, setFuelInfo, vehicleInfo, setVehicleInfo}: contentProps) {  
    
    const [passedDriverNames, setPassedDriverNames] = useState<string[] | null>(null);
    const [passedVehicleNames, setPassedVehicleNames] = useState<string[] | null>(null);

    const [driverId, setDriverId] = useState<string[]>([]);
    const [driverNames, setDriverNames] = useState<string[]>([]);
    const [driverContacts, setDriverContacts] = useState<string[]>([]);
    const [driverLicenses, setDriverLicenses] = useState<string[]>([]);

    const [vehiclesId, setVehiclesId] = useState<string[]>([]);
    const [vehicleId, setVehicleId] = useState<string[]>([]);
    const [vehiclePlateNumber, setVehiclePlateNumber] = useState<string[]>([]);
    const [vehicleModel, setVehicleModel] = useState<string[]>([]);
    const [vehicleDriver, setVehicleDriver] = useState<string[]>([]);
    const [vehicleCreatedAt, setVehicleCreatedAt] = useState<string[]>([]);

    if(driverId && driverNames && driverContacts && driverLicenses){
        // console.log("Fetched all drivers.");
    }

    if(vehicleId && vehiclePlateNumber && vehicleModel && vehicleDriver && vehicleCreatedAt){
        // console.log("Fetched all vehicles.");
    }

    //fetch all drivers
    const fetchDrivers = async () => {
        try{
            if (!user?.uid) return;

            //dito ko inistore ung documents inside drivers collection
            const driversRef = collection(db, "users", user?.uid, "drivers");
            const snapshot = await getDocs(driversRef);
            
            const fetchedDriversId: string[] = [];

            snapshot.forEach((doc) => {
                fetchedDriversId.push(doc.id);           
            });

            setDriverId(fetchedDriversId);

            //dito ko inistore ung driversInfo data
            const fetchedDriverInfo: DriverInfo[] = [];

            try{
                if (fetchedDriversId.length > 0) {
                    for (const driverId of fetchedDriversId) {

                        const docRef = doc(db, "users", user?.uid!, "drivers", driverId);
                        const docSnap = await getDoc(docRef);  
                      
                        if (docSnap.exists() && driverId) {
                            
                            const data = docSnap.data();
                        
                            //saving driver infos sa fetchDriverInfo
                            const driverInfos: DriverInfo = {
                                id: docSnap.id ?? null,
                                name: data.name ?? null, 
                                contact: data.contact ?? null,
                                license: data.license ?? null
                            }
                            
                            fetchedDriverInfo.push(driverInfos);   
                        }   
                    }  
                    //updating DriverInfo
                    setDriverInfo(fetchedDriverInfo);
                } 
            }
            catch(err){
                console.error("Bruh can't fetch the names :D", err);
            }
        } catch(err){
            console.error("Can't fetch drivers :D" ,err)
        }
    }

    useEffect(() => {
        fetchDrivers();
    }, [fetchDrivers]);

    useEffect(() => {
        const ids = driverInfo.map(driver =>  driver.id ? driver.id.toLocaleString() : "null");
        setDriverId(ids);
        // console.log("Driver ids: ", ids);

        const names = driverInfo.map(driver => driver.name ?? "null");
        setDriverNames(names);
        // console.log("List of driver names: ", names);

        const contact = driverInfo.map(driver => driver.contact ?? "null");
        setDriverContacts(contact);
        // console.log("List of driver contacts: ", contacts);

        const license = driverInfo.map(driver => driver.license ?? "null");
        setDriverLicenses(license);
        // console.log("List of driver licenses: ", license);
      }, [driverInfo]);

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

            //saving sa vehiclesId
            setVehiclesId(fetchedVehiclesId);

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
                                id: docSnap.id ?? null,
                                plateNumber: data.plateNumber ?? null,
                                model: data.model ?? null,
                                driver: data.driver ?? null,
                                createdAt: data.createdAt ?? null                  
                            }
                            fetchedVehicleInfos.push(driverInfos);
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
        const plateNumber = vehicleInfo.map(vehicle => vehicle.plateNumber ?? "null");
        setVehiclePlateNumber(plateNumber);
        const model = vehicleInfo.map(vehicle => vehicle.model ?? "null");
        setVehicleModel(model);
        const driver = vehicleInfo.map(vehicle => vehicle.driver ?? "null");
        setVehicleDriver(driver);
        const createdAt = vehicleInfo.map(vehicle => vehicle.createdAt ?? "null");
        setVehicleCreatedAt(createdAt);

    }, [vehicleInfo]);
    
    //driver
    useEffect(() => {
        // console.log("🔥 driverInfo received:", driverInfo, "Length:", driverInfo?.length);
        if (driverInfo && Array.isArray(driverInfo)) {
            const names = driverInfo.map(driver => driver.name ?? "null");
            setPassedDriverNames(names);
        }
    }, [driverInfo]);
    
    //para ma check ko if napapass ba sa state ung names ng dirvers
    useEffect(() => {
        // console.log("Driver Names: ", passedDriverNames);
    }, [passedDriverNames]);

    //vehicle
    useEffect(() => {
        // console.log("🔥 vehicleInfo received:", vehicleInfo, "Length:", vehicleInfo?.length);
        if (vehicleInfo && Array.isArray(vehicleInfo)) {
            const names = vehicleInfo.map(vehicle => vehicle.model ?? "null");
            setPassedVehicleNames(names);
        }
    }, [vehicleInfo]);
    
    //para ma check ko if napapass ba sa state ung names ng dirvers
    useEffect(() => {
        // console.log("Vehicle Names: ", passedVehicleNames);
    }, [passedVehicleNames]);
    
    const navItems = [
        { icon: "bx bx-dashboard bx-tada-hover hovered", title: "Dashboard" },
        { icon: "bx bx-user bx-tada-hover hovered", title: "Drivers" },
        { icon: "bx bx-car bx-tada-hover hovered", title: "Vehicles" },
        { icon: "bx bx-petrol-pump bx-tada-hover hovered", title: "Fuel" },
        { icon: "bx bx-spanner bx-tada-hover hovered", title: "Maintenance" },
        { icon: "bx bx-report bx-tada-hover hovered", title: "Reports" },
        { icon: "bx bx-user bx-tada-hover hovered", title: "Users" },
        { icon: "bx bx-cog bx-tada-hover hovered", title: "Settings" }
    ];

    const dashboardPages = [
        <Dashboard isDark={isDark} user={user} vehicleInfo={vehicleInfo}/>,
        <Driver isDark={isDark} user={user} driverInfo={driverInfo} setDriverInfo={setDriverInfo} fetchDrivers={fetchDrivers}/>,
        <Vehicle isDark={isDark} user={user} driverInfo={driverInfo} vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo} fetchVehicles={fetchVehicles}/>,
        <Fuel isDark={isDark} user={user} driverInfo={driverInfo} vehicleInfo={vehicleInfo} fuelInfo={fuelInfo} setFuelInfo={setFuelInfo} />,
        <Maintenance isDark={isDark} />,
        <Reports isDark={isDark} />,
        <Users isDark={isDark} />,
        <Settings isDark={isDark} />
    ]

    const isMobile = useIsMobile();

    return (
        <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
            ${isMobile? "h-auto" : "h-screen"}
            fade-in w-full flex flex-row items-center justify-center p-[calc(0.4vw+0.6rem)]`}>
            
            {!isMobile && <section id="side-nav" className="h-full w-full flex-1">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className={`${
                        activeIndex === index ? "text-[var(--dark-color)] bg-[var(--border-color)]" : ""
                        } flex flex-row items-center justify-start p-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)] 
                        cursor-pointer transition duration-300 ease-in-out`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <SidenavCard icon={item.icon} title={item.title} />
                    </div>
                ))}
            </section>}
            
            {dashboardPages[activeIndex] ?? <Dashboard isDark={isDark} user={user} vehicleInfo={vehicleInfo} />}
            
        </div>
    )
}

export default Content