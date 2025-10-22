import { useState } from "react";
import useIsMobile from "../../../hooks/useIsMobile";
import AddVehicle from "../AddVehicle";
import type { UserInfo, DriverInfo } from "../../../App";
import { useFetchVehicle } from "../../../hooks/Fetch/useFetchVehicle";
import DeleteVehicle from "../DeleteVehicle";

type changeTheme = {
    isDark: boolean;
    user: UserInfo | null;
    driverInfo: DriverInfo[];
};

function Vehicle({ isDark, user, driverInfo }: changeTheme) {
    const isMobile = useIsMobile();
    const [isVisible, setIsVisible] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedDriverIndex, setSelectedDriverIndex] = useState<Number | null>(null);

    const { vehicleInfo, loading, error, refetch } = useFetchVehicle(user);

    if (loading) return <p className="w-full text-center text-gray-500">Loading vehicles...</p>;
    if (error) return <p className="w-full text-center text-red-500">Error: {error.message}</p>;

    return (
        <section id="main" className={`${isMobile ? "p-[calc(0.4vw+0.6rem)] h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-full"}
            ${isDark ? "" : ""}
            flex flex-col items-start justify-start w-full flex-5 border-[var(--border-color)] gap-[calc(0.4vw+0.6rem)]`}>
            
            <div className="flex-1 w-full flex flex-row items-center justify-between gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.6vw+1rem)] font-semibold cursor-pointer hovered">Vehicle Information</span>
                <div className="flex flex-row items-center jsutify-center rounded-md cursor-pointer text-[calc(0.4vw+0.5rem)] 
                    text-[var(--light-color)] bg-[var(--purple-color)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] gap-[calc(0.2vw+0.3rem)]"
                    onClick={() => setIsVisible(prev => !prev)}>
                    <i className='bx bx-plus bx-tada-hover'></i> 
                    <span>Add Vehicle</span>
                </div>
            </div>

            {isVisible && (
                <AddVehicle 
                    user={user} 
                    driverInfo={driverInfo} 
                    isDark={isDark} 
                    vehicleInfo={vehicleInfo} 
                    setVehicleInfo={() => refetch()}
                    setIsVisible={setIsVisible}
                />
            )}

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                <div className="h-auto w-full flex flex-col items-start justify-start bg-[var(--purple-color)] text-[var(--light-color)] p-[calc(0.4vw+0.6rem)]">
                    <div className="h-auto w-full flex flex-row items-start justify-start">
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Id</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Driver</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Plate no.</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Model</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Created At</span>
                        <div className="flex-1 flex flex-row items-center justify-end text-[calc(0.4vw+0.6rem)]">
                            <i
                                title="Refresh"
                                className="bx bx-refresh-cw bx-spin-hover text-[calc(0.6vw+1rem)] cursor-pointer hover:text-[var(--dark-color)] transition duration-300 ease-in-out"
                                onClick={refetch}
                            ></i>
                        </div>
                    </div>
                </div>

                {vehicleInfo.map((vehicle) => (
                    <div key={vehicle.id} className="w-full border-b border-[var(--border-color)] p-[calc(0.4vw+0.6rem)]">
                        <div className="flex flex-row items-start justify-start">
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{vehicle.id ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{vehicle.driver ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{vehicle.plateNumber ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{vehicle.model ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{vehicle.createdAt ?? "null"}</span>
                            <div className="flex-1 flex flex-row items-center justify-end gap-[calc(0.4vw+0.6rem)]">
                                <i className='bx bx-edit bx-tada-hover text-[calc(0.8vw+1rem)] cursor-pointer'></i>
                                <i className='bx bx-trash bx-tada-hover text-[calc(0.8vw+1rem)] hover:text-red-500 cursor-pointer'
                                onClick={() => {
                                    setIsDelete((prev) => !prev)
                                    setSelectedDriverIndex(Number(vehicle.id))
                                    }}></i>
                            </div>
                        </div>
                    </div>
                ))}

                {isDelete && <DeleteVehicle selectedDriverIndex={selectedDriverIndex} user={user} refetch={refetch} setIsDelete={setIsDelete}/>}

            </div>
        </section>
    );
}

export default Vehicle;
