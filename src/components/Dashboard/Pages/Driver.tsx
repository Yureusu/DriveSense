import { useEffect, useState, type SetStateAction } from "react";
import useIsMobile from "../../../hooks/useIsMobile"
import AddDriver from "../AddDriver";
import type { UserInfo } from "../../../App";
import { db } from "../../../server/Firebase/Firebase";
import { doc, getDocs, getDoc, collection } from "firebase/firestore";
import DeleteDriver from "../DeleteDriver";

type driverProps = {
    isDark: boolean;
    user: UserInfo | null;
    driverNames: string[];
    setDriverNames: React.Dispatch<SetStateAction<string[]>>;
}

function Driver({isDark, user, driverNames, setDriverNames}: driverProps) {

    const isMobile = useIsMobile(); 

    const [isVisible, setIsVisible] = useState(false);

    const [isDelete, setIsDelete] = useState(false);

    const [driverArr, setDriverArr] = useState<string[]>([]);

    const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
    const [selectedDriverIndex, setSelectedDriverIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try{
                if (!user?.uid) return;

                //dito ko inistore ung documents inside drivers collection
                const driversRef = collection(db, "users", user?.uid, "drivers");
                const snapshot = await getDocs(driversRef);
                
                const fetchedDrivers: string[] = [];

                snapshot.forEach((doc) => {
                    fetchedDrivers.push(doc.id);           
                    console.log("Driver name: ", doc.id)
                    console.log(fetchDrivers)
                });

                setDriverArr(fetchedDrivers);

                //dito ko finetch ung names
                const fetchedDriverNames: string[] = [];

                try{
                    if (fetchedDrivers.length > 0) {
                        for (const driverId of fetchedDrivers) {

                            const docRef = doc(db, "users", user?.uid!, "drivers", driverId);
                            const docSnap = await getDoc(docRef);  
                          
                            if (docSnap.exists() && driverArr) {
                                const data = docSnap.data();
                                console.log(`Driver ID: ${driverId}, Name: ${data.name}`);
                                fetchedDriverNames.push(data.name);   
                                console.log(fetchedDriverNames); 
                            }   
                        }  
                        setDriverNames(fetchedDriverNames);
                    } 
                }
                catch(err){
                    console.error("Bruh can't fetch the names :D", err);
                }
            } catch(err){
                console.error("Can't fetch drivers :D" ,err)
            }
        }
        fetchDrivers();
    }, []);

    console.log(driverNames);

    return (
        <section id="main" className={`${isMobile? "p-[calc(0.4vw+0.6rem)] h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-full"}
            ${isDark? "" : ""}
            flex flex-col items-start justify-start w-full flex-5 border-[var(--border-color)] gap-[calc(0.4vw+0.6rem)]`}>

            <div className="flex-1 w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.8vw+1.2rem)] font-semibold cursor-pointer hovered">Driver Information</span>
                <span className="text-[calc(0.4vw+0.5rem)] text-[var(--light-color)] bg-[var(--purple-color)] 
                px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-lg cursor-pointer"
                onClick={() => setIsVisible((prev) => !prev)}>Add Driver</span>
            </div>

            {isVisible && <AddDriver user={user} setDriverNames={setDriverNames}/>}

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                
                {driverNames.map((driversName, index) => (
                    <div key={index} className="h-auto w-full p-[calc(0.4vw+0.6rem)] flex flex-row items-start justify-start rounded-xl bordered">
                        <div className="h-full flex flex-col items-start justify-center gap-[calc(0.6vw+1rem)]">
                            <span className="hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">Id: {driverArr[index]}</span>   
                            <span className="hovered cursor-pointer text-[calc(0.4vw+0.6rem)]">Name: {driversName}</span>
                        </div>
                        <div className="h-full flex flex-row items-end justify-center gap-[calc(0.4vw+0.6rem)] ml-auto">
                            <i className='bx bx-edit bx-tada-hover hovered text-[calc(0.8vw+1rem)] cursor-pointer'></i> 
                            <i className='bx bx-trash bx-tada-hover text-[calc(0.8vw+1rem)] hover:text-red-500 transition duration-300 ease-in-out gap-[calc(0.4vw+0.6rem)] cursor-pointer'
                                onClick={() => {
                                    setIsDelete((prev) => !prev); 
                                    setSelectedDriverId(driverArr[index]);
                                    setSelectedDriverIndex(index);
                                }}></i> 
                        </div>
                    </div>
                ))}

                {isDelete && selectedDriverId && 
                <DeleteDriver user={user} 
                    setDriverNames={setDriverNames} 
                    setDriverId={setDriverNames} 
                    driverId={selectedDriverId} 
                    driverIndex={selectedDriverIndex}
                />}
                
                
            </div>
            

        </section>
    )
}

export default Driver