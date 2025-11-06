import useIsMobile from "../../../hooks/useIsMobile"
import type { MaintenanceInfo, UserInfo, VehicleInfo } from "../../../App";
import { useFetchMaintenance } from "../../../hooks/Fetch/useFetchMaintenance";
import { useEffect, useState } from "react";
import AddMaintenance from "../AddMaintenance";
import DeleteMaintenance from "../DeleteMaintenance";

type MaintenanceProps = {
    user: UserInfo | null;
    isDark: boolean;
    vehicleInfo: VehicleInfo[];
}

function Maintenance({ user, isDark, vehicleInfo }: MaintenanceProps) {

    const { maintenanceInfo, loading, error, refetch } = useFetchMaintenance(user);

    const isMobile = useIsMobile();

    const [maintenance, setMaintenance] = useState<MaintenanceInfo[]>([]);
    const [isAddMaintenance, setIsAddMaintenance] = useState(false);
    const [passedVehicleNames, setPassedVehicleNames] = useState<string[] | null>(null);

    if(passedVehicleNames){}

    const [isDelete, setIsDelete] = useState(false);
    const [selectMaintenanceId, setSelectedMaintenanceId] = useState<string | null>(null);
    const [selectedMaintenanceIndex, setSelectedMaintenanceIndex] = useState<number | null>(null);

    useEffect(() => {
        if (vehicleInfo) {
            const names = vehicleInfo.map((vehicle) => vehicle.model ?? "null");
            setPassedVehicleNames(names);
        }
    }, [vehicleInfo]);

    if (loading) return <p className={`"text-[calc(0.4vw+0.8rem)] flex flex-col items-center justify-center h-screen w-screen 
        text-center text-gray-500`}>Loading maintenance records...</p>;
    if (error) return <p className={`"text-[calc(0.4vw+0.8rem)] flex flex-col items-center justify-center h-screen w-screen 
        text-center text-red-500`}>Error: {error.message}</p>;

    return (
        <section
            id="main"
            className={`${isMobile ? "h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-full"}
            ${isDark ? "" : ""}
            flex flex-col items-start justify-start w-full flex-5 border-[var(--border-color)] gap-[calc(0.4vw+0.6rem)]`}
        >
            <div className="flex-1 w-full flex flex-row items-center justify-between gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.6vw+1rem)] font-semibold cursor-pointer hovered">Maintenance Records</span>
                {isMobile && <div className="flex-1 flex flex-row items-center justify-end text-[calc(0.4vw+0.6rem)]">
                    <i title="Refresh" className="bx bx-refresh-cw bx-spin-hover hover:text-[var(--dark-color)] transition durtion-300 ease-in-out text-[calc(0.6vw+1rem)] cursor-pointer"
                    onClick={() => refetch()} />
                </div>}
                <div className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"}
                    flex flex-row items-center jsutify-center rounded-md cursor-pointer text-[var(--light-color)] 
                    bg-[var(--purple-color)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] gap-[calc(0.2vw+0.3rem)]`}
                onClick={() => setIsAddMaintenance((prev) => !prev)}>
                    <i className="bx bx-plus bx-tada-hover"></i>
                    <span>Add</span>
                </div>
            </div>

            {isAddMaintenance && <AddMaintenance isDark={isDark} user={user} 
                maintenanceInfo={maintenanceInfo} 
                vehicleInfo={vehicleInfo} 
                refetch={refetch}
                setIsAddMaintenance={setIsAddMaintenance}
            />}

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                <div className="h-auto w-full flex flex-col items-start justify-start bg-[var(--purple-color)] text-[var(--light-color)] p-[calc(0.4vw+0.6rem)]">
                    <div className="h-auto w-full flex flex-row items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                        <span className={`${isMobile? "" : "flex-1"}
                            text-[calc(0.4vw+0.6rem)]`}>Id</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Vehicle</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)] flex-wrap">Description</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Cost</span>
                        <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Created At</span>
                        {!isMobile && <div className="flex-1 flex flex-row items-center justify-end text-[calc(0.4vw+0.6rem)]">
                            <i title="Refresh" className="bx bx-refresh-cw bx-spin-hover hover:text-[var(--dark-color)] transition durtion-300 ease-in-out text-[calc(0.6vw+1rem)] cursor-pointer"
                            onClick={() => refetch()} />
                        </div>}
                    </div>
                </div>

                {!isMobile && maintenanceInfo.map((maintenance, index) => (
                    <div key={maintenance.id ?? index} className="w-full border-b border-[var(--border-color)] p-[calc(0.4vw+0.6rem)]">
                        <div className="flex flex-row items-start justify-start">
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{maintenance.id ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{maintenance.vehicle ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{maintenance.description ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{maintenance.cost ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{maintenance.createdAt ?? "null"}</span>
                            <div className="flex-1 flex flex-row items-center justify-end gap-[calc(0.4vw+0.6rem)]">
                                <i className="bx bx-edit bx-tada-hover text-[calc(0.8vw+1rem)] cursor-pointer"></i>
                                <i className="bx bx-trash bx-tada-hover text-[calc(0.8vw+1rem)] hover:text-red-500 cursor-pointer"
                                onClick={() => {
                                    setIsDelete(true);
                                    setSelectedMaintenanceId(maintenance.id ?? "null");
                                    setSelectedMaintenanceIndex(index);
                                }}></i>
                            </div>
                        </div>
                    </div>
                ))}

                {isMobile && maintenanceInfo.map((maintenance, index) => (
                    <div key={maintenance.id ?? index} className="w-full border-b border-[var(--border-color)] p-[calc(0.4vw+0.6rem)]">
                        <div className="flex flex-col items-start justify-start gap-[calc(0.4vw+1rem)]">
                            <div className="w-full flex flex-row items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                                <span className="text-[calc(0.4vw+0.6rem)]">{maintenance.id ?? "null"}</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{maintenance.vehicle ?? "null"}</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{maintenance.description ?? "null"}</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{maintenance.cost ?? "null"}</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{maintenance.createdAt ?? "null"}</span>
                            </div>
                            <div className="w-full flex-1 flex flex-row items-center justify-end gap-[calc(0.4vw+0.6rem)]">
                                <i className="bx bx-edit bx-tada-hover text-[calc(0.8vw+1rem)] cursor-pointer"></i>
                                <i className="bx bx-trash bx-tada-hover text-[calc(0.8vw+1rem)] hover:text-red-500 cursor-pointer"
                                onClick={() => {
                                    setIsDelete(true);
                                    setSelectedMaintenanceId(maintenance.id ?? "null");
                                    setSelectedMaintenanceIndex(index);
                                }}></i>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {isDelete && selectMaintenanceId && (
                <DeleteMaintenance
                    user={user}
                    maintenanceId={selectMaintenanceId}
                    maintenanceIndex={selectedMaintenanceIndex} 
                    maintenanceInfo={maintenance}
                    setMaintenanceInfo={setMaintenance}
                    refetch={refetch}
                    setIsDelete={setIsDelete}
                /> 
            )}
            
        </section>
    )
}

export default Maintenance