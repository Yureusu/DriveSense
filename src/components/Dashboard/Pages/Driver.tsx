import { useState } from "react";
import useIsMobile from "../../../hooks/useIsMobile";
import AddDriver from "../AddDriver";
import DeleteDriver from "../DeleteDriver";
import type { UserInfo, DriverInfo } from "../../../App";
import { useFetchDriver } from "../../../hooks/Fetch/useFetchDriver";

type DriverProps = {
    isDark: boolean;
    user: UserInfo | null;
};

function Driver({ isDark, user}: DriverProps) {

    const [drivers, setDrivers] = useState<DriverInfo[]>([]);
    const isMobile = useIsMobile();
    const [isAddDriverVisible, setIsAddDriverVisible] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
    const [selectedDriverIndex, setSelectedDriverIndex] = useState<number | null>(null);

    const { driverInfo, loading, error, refetch } = useFetchDriver(user);

    if (loading) return <p className={`"text-[calc(0.4vw+0.8rem)] flex flex-col items-center justify-center h-screen w-screen 
        text-center text-gray-500`}>Loading drivers...</p>;
    if (error) return <p className={`"text-[calc(0.4vw+0.8rem)] flex flex-col items-center justify-center h-screen w-screen 
        text-center text-red-500`}>Error: {error.message}</p>;

    return (
        <section id="main" className={`${isMobile ? "p-[calc(0.4vw+0.6rem)] h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-auto"}
            ${isDark ? "" : ""}
            flex flex-col items-start justify-start w-full flex-5 border-[var(--border-color)] gap-[calc(0.4vw+0.6rem)]`}>
            
            <div className="flex-1 w-full flex flex-row items-center justify-between gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.6vw+1rem)] font-semibold cursor-pointer hovered">Driver Information</span>
                <div className="flex flex-row items-center jsutify-center rounded-lg cursor-pointer text-[calc(0.4vw+0.5rem)] 
                    text-[var(--light-color)] bg-[var(--purple-color)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] gap-[calc(0.2vw+0.3rem)]"
                    onClick={() => setIsAddDriverVisible(prev => !prev)}>
                    <i className='bx bx-plus bx-tada-hover'></i>
                    <span>Add Driver</span>
                </div>
            </div>

            {isAddDriverVisible && <AddDriver user={user} refetch={refetch} driverInfo={driverInfo} setIsAddDriverVisible={setIsAddDriverVisible}/>}

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                <div className="h-auto w-full flex flex-col items-start justify-start bg-[var(--purple-color)] text-[var(--light-color)] p-[calc(0.4vw+0.6rem)]">
                    <div className="h-auto w-full flex flex-row items-start justify-start gap-[calc(0.6vw+1rem)]">
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Id</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Name</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Contact</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">License</span>
                        <div className="flex-1 flex flex-row items-center justify-end text-[calc(0.4vw+0.6rem)]">
                            <i title="Refresh" className='bx bx-refresh bx-spin-hover text-[calc(0.6vw+1rem)] cursor-pointer hover:text-[var(--dark-color)] transition duration-300 ease-in-out'
                                onClick={refetch}></i>
                        </div>
                    </div>
                </div>

                {driverInfo.map((driver, index) => (
                    <div key={driver.id ?? index} className="w-full border-b border-[var(--border-color)] p-[calc(0.4vw+0.6rem)]">
                        <div className="flex flex-row items-start justify-start gap-[calc(0.6vw+1rem)]">
                            <span className="flex-1">{driver.id ?? "null"}</span>
                            <span className="flex-1">{driver.name ?? "null"}</span>
                            <span className="flex-1">{driver.contact ?? "null"}</span>
                            <span className="flex-1">{driver.license ?? "null"}</span>
                            <div className="flex-1 flex flex-row items-center justify-end gap-[calc(0.4vw+0.6rem)]">
                                <i className='bx bx-edit bx-tada-hover text-[calc(0.8vw+1rem)] cursor-pointer'></i>
                                <i
                                    className='bx bx-trash bx-tada-hover text-[calc(0.8vw+1rem)] hover:text-red-500 cursor-pointer'
                                    onClick={() => {
                                        setIsDelete(true);
                                        setSelectedDriverId(driver.id ?? "null");
                                        setSelectedDriverIndex(index);
                                    }}
                                ></i>
                            </div>
                        </div>
                    </div>
                ))}

                {isDelete && selectedDriverId && (
                    <DeleteDriver
                        user={user}
                        driverId={selectedDriverId}
                        driverIndex={selectedDriverIndex} 
                        driverInfo={drivers}
                        setDriverInfo={setDrivers}
                        refetch={refetch}
                        setIsDelete={setIsDelete}
                    /> 
                )}
            </div>
        </section>
    );
}

export default Driver;
