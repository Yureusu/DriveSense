import { useState } from "react";
import type { UserInfo, DriverInfo } from "../../App"
import useIsMobile from "../../hooks/useIsMobile";
import { db } from "../../server/Firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import type { SetStateAction } from "react";

type AddVehicleProps = {
    user: UserInfo | null;
    driverInfo:  DriverInfo[];
    setDriverInfo: React.Dispatch<SetStateAction<DriverInfo[]>>;
}

function AddVehicle({user, driverInfo, setDriverInfo}: AddVehicleProps) {

    const [isFormVisible, setIsFormVisible] = useState(false);

    const isMobile = useIsMobile();

    const [driverName, setDriverName] = useState<string | null>(null);
    const [driverContact, setDriverContact] = useState<string | null>(null);
    const [driverLicense, setDriverLicense] = useState<string | null>(null);

    const handleSubmit = async () => {
        try{
            if (!user?.uid) return;

            const name = driverName;
            const contact = driverContact;
            const license = driverLicense;
            
            const driversRef = collection(db, "users", user?.uid, "drivers");
            const snapshot = await addDoc(driversRef, {
                name,
                contact,
                license
            });
            //to make sure na na add ung driver
            console.log("Added the driver successfully: ", snapshot);

            const newDriver: DriverInfo = {
                name,
                contact: null,
                license: null
            };
            //inupdate ko ung driverInfo with the new addded name
            setDriverInfo(prev => [...prev, newDriver]);

            console.log(driverInfo)

            setIsFormVisible((prev) => !prev);
        } catch(err){
            console.error("Can't add the driver.", err);
        }
    }

    return (
        <>
            {!isFormVisible && <div className="fade-in absolute top-0 left-0 z-2 h-screen w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.80)]">
                <div className="h-auto w-[420px] bg-[var(--light-color)] flex flex-col items-center justify-center relative rounded-xl rounded-tr-none">
                    <i className='fa-solid fa-circle-xmark text-[calc(1vw+1.2rem)] text-[var(--blue-color)] hovered
                        flex flex-row items-center justify-center absolute top-[-10px] right-[-14px] cursor-pointer'
                        onClick={() => setIsFormVisible((prev) => !prev)}></i> 

                    {/*Form*/}
                    <div className={`${isMobile? "" : ""}
                        h-full w-full flex flex-col items-center justify-start p-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)] text-[var(--dark-color)]`}>
                        
                        <div className={`${user? "" : ""} flex-2 w-full flex flex-col items-center justify-end`}>
                            <span className="text-[calc(0.4vw+0.8rem)] font-semibold">Add a new driver</span>
                        </div>

                        <div className="flex-2 w-full flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)]">
                            <input type="text" placeholder="Name" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-xl focus:border-[var(--purple-color)]
                                placeholder:text-[calc(0.4vw+0.5rem)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full"
                                onChange={(e) => setDriverName(e.target.value)} required/>
                            <input type="text" placeholder="Contact" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-xl focus:border-[var(--purple-color)]
                                placeholder:text-[calc(0.4vw+0.5rem)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full"
                                onChange={(e) => setDriverContact(e.target.value)} required/>
                            <input type="text" placeholder="License" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-xl focus:border-[var(--purple-color)]
                                placeholder:text-[calc(0.4vw+0.5rem)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full"
                                onChange={(e) => setDriverLicense(e.target.value)} required/>

                            <span className="text-[calc(0.4vw+0.5rem)] text-[var(--light-color)] w-full px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-xl text-center cursor-pointer 
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