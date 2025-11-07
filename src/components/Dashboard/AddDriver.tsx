import { useState } from "react";
import type { UserInfo, DriverInfo } from "../../App";
import { db } from "../../server/Firebase/Firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import useIsMobile from "../../hooks/useIsMobile";

type AddDriverProps = {
    isDark: boolean;
    user: UserInfo | null;
    refetch: () => void;
    driverInfo: DriverInfo[];
    setIsAddDriverVisible: (value: boolean) => void;
};

function AddDriver({ user, refetch, driverInfo, setIsAddDriverVisible, isDark }: AddDriverProps) {

    const [isFormVisible, setIsFormVisible] = useState(true);
    const isMobile = useIsMobile();

    const [driverName, setDriverName] = useState("");
    const [driverContact, setDriverContact] = useState("");
    const [driverLicense, setDriverLicense] = useState("");

    const handleSubmit = async () => {
        try {

            if (!user?.uid) return;
            const customId = (driverInfo.length + 1).toString();

            const driversRef = doc(db, "users", user.uid, "drivers", customId);
            await setDoc(driversRef, {
                name: driverName,
                contact: driverContact,
                license: driverLicense
            });

            console.log("Added the driver successfully");

            const activitiesRef = collection(db, "users", user.uid, "activities");
            await addDoc(activitiesRef, {
                activity: "Added new driver",
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            refetch();
            setIsFormVisible((prev) => !prev);
            setIsAddDriverVisible(false);

        } catch (err) {
            console.error("Can't add the driver.", err);
        }
    };

    return (
        <>
            {isFormVisible && <div className="fade-in absolute top-0 left-0 z-2 h-screen w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.80)]">
                <div className={`${isMobile? "w-[320px]" : "w-[420px]"} ${isDark? "text-[var(--dark-color)]" : ""}
                    h-auto bg-[var(--light-color)] flex flex-col items-center justify-center relative rounded-xl rounded-tr-none`}>
                    <i className={`${isMobile? "top-[-8px] right-[-12px] text-[calc(1vw+1.5rem)]" : "top-[-10px] right-[-14px] text-[calc(1vw+1.2rem)]"}
                        fa-solid fa-circle-xmark text-[var(--blue-color)] hovered
                        absolute cursor-pointer`}
                        onClick={() => setIsFormVisible((prev) => !prev)}></i>

                    <div className={`h-full w-full flex flex-col items-center justify-start p-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)] text-[var(--dark-color)]`}>
                        <div className="w-full flex flex-col items-center justify-end">
                            <span className="text-[calc(0.4vw+0.8rem)] font-semibold">Add a new driver</span>
                        </div>

                        <div className="w-full flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)]">
                            <input
                                type="text"
                                placeholder="Name"
                                className="cursor-pointer outline-none border border-[var(--border-color)] rounded-lg focus:border-[var(--purple-color)]
                                    placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full"
                                onChange={(e) => setDriverName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Contact"
                                className="cursor-pointer outline-none border border-[var(--border-color)] rounded-lg focus:border-[var(--purple-color)]
                                    placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full"
                                onChange={(e) => setDriverContact(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="License"
                                className="cursor-pointer outline-none border border-[var(--border-color)] rounded-lg focus:border-[var(--purple-color)]
                                    placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full"
                                onChange={(e) => setDriverLicense(e.target.value)}
                                required
                            />
                            <span
                                className="text-[calc(0.4vw+0.5rem)] text-[var(--light-color)] w-full px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-xl text-center cursor-pointer 
                                    bg-[var(--blue-color)] hover:bg-[var(--purple-color)] transition duration-300 ease-in-out"
                                onClick={handleSubmit}>
                                Continue
                            </span>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default AddDriver;
