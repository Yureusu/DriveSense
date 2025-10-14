import { useState } from "react";
import type { UserInfo } from "../../App"
import useIsMobile from "../../hooks/useIsMobile";
import type { SetStateAction } from "react";
import { db } from "../../server/Firebase/Firebase";
import { doc, deleteDoc } from "firebase/firestore";

type AddVehicleProps = {
    user: UserInfo | null;
    setDriverNames: React.Dispatch<SetStateAction<string[]>>;
    driverId: string;
    driverIndex: number | null;
    setDriverId: React.Dispatch<SetStateAction<string[]>>;
}

function AddVehicle({user, setDriverNames, driverId, driverIndex, setDriverId}: AddVehicleProps) {

    const [isFormVisible, setIsFormVisible] = useState(false);

    const isMobile = useIsMobile();

    const handleNo = () => {
        setIsFormVisible((prev) => !prev);
    }
    
    const handleYes = async () => {
        try{

            if(!user?.uid || !driverId) return;
            const deleteRef = doc(db, "users", user?.uid, "drivers", driverId);
            await deleteDoc(deleteRef);

            setDriverNames(prev => prev.filter((_, i) => i !== driverIndex));
            setDriverId(prev => prev.filter(id => id !== driverId));

        } catch(err){
            console.error("Cant delete the driver.", err)
        }

        setIsFormVisible((prev) => !prev);
        console.log("Updated driver ids: ", driverId);
    }

    return (
        <>
            {!isFormVisible && <div className="fade-in absolute top-0 left-0 z-2 h-screen w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.50)]">
                <div className="h-auto w-[420px] bg-[var(--light-color)] flex flex-col items-center justify-center relative rounded-xl rounded-tr-none">
                    <i className='fa-solid fa-circle-xmark text-[calc(1vw+1.2rem)] text-[var(--blue-color)] hovered
                        flex flex-row items-center justify-center absolute top-[-10px] right-[-14px] cursor-pointer'
                        onClick={() => setIsFormVisible((prev) => !prev)}></i> 

                    {/*Form*/}
                    <div className="h-full w-full flex flex-col items-center justify-start py-[calc(0.4vw+0.6rem)] px-[calc(1.4vw+1.6rem)] gap-[calc(0.4vw+0.6rem)] text-[var(--dark-color)]">
                        
                        <div className={`${user? "" : ""} flex-2 w-full flex flex-col items-center justify-end`}>
                            <span className="text-[calc(0.4vw+0.6rem)] font-semibold">Are you sure you want to delete this driver?</span>
                        </div>

                        <div className={`${isMobile? "" : ""}
                            flex-2 w-full flex flex-row items-center justify-center gap-[calc(0.4vw+0.6rem)]`}>
                            <span className="text-[calc(0.4vw+0.5rem)] text-[var(--light-color)] w-full px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-xl text-center cursor-pointer 
                                bg-[var(--blue-color)] hover:bg-red-500 transition duration-300 ease-in-out"
                                onClick={() => handleNo()}>No</span>
                            <span className="text-[calc(0.4vw+0.5rem)] text-[var(--light-color)] w-full px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-xl text-center cursor-pointer 
                                bg-[var(--blue-color)] hover:bg-green-500 transition duration-300 ease-in-out"
                                onClick={() => handleYes()}>Yes</span>
                        </div>

                    </div>
                        
                </div>
            </div>}
        </>
    )
}

export default AddVehicle