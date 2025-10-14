import { useState } from "react";
import type { UserInfo } from "../../App"
import CarImg from "../../assets/imgs/car-img.png"
import useIsMobile from "../../hooks/useIsMobile";

type AddVehicleProps = {
    user: UserInfo | null;
}

function AddVehicle({user}: AddVehicleProps) {

    const [isFormVisible, setIsFormVisible] = useState(false);

    console.log("driverNames:");

    const isMobile = useIsMobile();

    const [selectedDriver, setSelectedDriver] = useState("");

    return (
        <>
            {!isFormVisible && <div className="fade-in absolute top-0 left-0 z-2 h-screen w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.50)]">
                <div className="h-auto w-[420px] bg-[var(--light-color)] flex flex-col items-center justify-center relative rounded-xl rounded-tr-none">
                    <i className='fa-solid fa-circle-xmark text-[calc(1vw+1.2rem)] text-[var(--blue-color)] hovered
                        flex flex-row items-center justify-center absolute top-[-10px] right-[-14px] cursor-pointer'
                        onClick={() => setIsFormVisible((prev) => !prev)}></i> 

                    {/*Form*/}
                    <div className="h-full w-full flex flex-col items-center justify-start py-[calc(0.4vw+0.6rem)] px-[calc(2.4vw+2.6rem)] gap-[calc(0.4vw+0.6rem)] text-[var(--dark-color)]">
                        
                        <div className={`${user? "" : ""} flex-2 w-full flex flex-col items-center justify-end`}>
                            <span className="text-[calc(0.4vw+0.8rem)] font-semibold">Add a new vehicle</span>
                        </div>

                        <div className=" w-full flex flex-col items-center justify-end ">
                        <img src={CarImg} className={`${isMobile? "h-full min-wfull" : 
                                "h-full w-full"}`} alt="" />
                        </div>

                        <div className="flex-2 w-full flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)]">
                            <input type="text" placeholder="Vehicle Name" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-xl focus:border-[var(--purple-color)]
                                placeholder:text-[calc(0.4vw+0.5rem)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full" required/>
                            <select id="driver-names" value={selectedDriver}
                                className="focus:border-[var(--purple-color)] custom-select cursor-pointer text-[calc(0.4vw+0.5rem)] w-full p-[calc(0.3vw+0.4rem)] outline-none border border-[var(--border-color)] rounded-xl"
                                onChange={(e) => setSelectedDriver(e.target.value)}>
                                <option value="" disabled>Select a driver</option>
                                {/* {driverNames.map((drivername, index) => (
                                    <option key={index} value={drivername} className="cursor-pointer">
                                        {drivername}
                                    </option>
                                ))} */}
                            </select>
                            <span className="text-[calc(0.4vw+0.5rem)] text-[var(--light-color)] w-full px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-xl text-center cursor-pointer 
                                bg-[var(--blue-color)] hover:bg-[var(--purple-color)] transition duration-300 ease-in-out">Continue</span>
                        </div>

                    </div>
                        
                </div>
            </div>}
        </>
    )
}

export default AddVehicle