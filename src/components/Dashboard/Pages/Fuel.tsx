import useIsMobile from "../../../hooks/useIsMobile";
import { useEffect, useState } from "react";
import type { UserInfo, DriverInfo, VehicleInfo } from "../../../App";
import { useFetchFuels } from "../../../hooks/Fetch/useFetchFuel";
import AddFuel from "../AddFuel";

type FuelProps = {
    isDark: boolean;
    user: UserInfo | null;
    driverInfo: DriverInfo[];
    vehicleInfo: VehicleInfo[];
};

function Fuel({ isDark, user, driverInfo, vehicleInfo }: FuelProps) {
    const isMobile = useIsMobile();
    const { fuelInfo, loading, error, refetch } = useFetchFuels(user);

    const [passedDriverNames, setPassedDriverNames] = useState<string[] | null>(null);
    const [passedVehicleNames, setPassedVehicleNames] = useState<string[] | null>(null);

    const [isAddFuel, setIsAddFuel] = useState(false);

    if(passedDriverNames && passedVehicleNames){

    }

    useEffect(() => {
        if (driverInfo) {
            const names = driverInfo.map((driver) => driver.name ?? "null");
            setPassedDriverNames(names);
        }
    }, [driverInfo]);

    useEffect(() => {
        if (vehicleInfo) {
            const names = vehicleInfo.map((vehicle) => vehicle.model ?? "null");
            setPassedVehicleNames(names);
        }
    }, [vehicleInfo]);

    if (loading) return <p className={`"text-[calc(0.4vw+0.8rem)] flex flex-col items-center justify-center h-screen w-screen 
        text-center text-gray-500`}>Loading fuel logs...</p>;
    if (error) return <p className={`"text-[calc(0.4vw+0.8rem)] flex flex-col items-center justify-center h-screen w-screen 
        text-center text-red-500`}>Error: {error.message}</p>;

    // console.log(passedDriverNames);
    // console.log(passedVehicleNames);

    return (
        <section
            id="main"
            className={`${isMobile ? "h-screen" : "border-l px-[calc(0.4vw+0.6rem)] h-full"}
            ${isDark ? "" : ""}
            flex flex-col items-start justify-start w-full flex-5 border-[var(--border-color)] gap-[calc(0.4vw+0.6rem)]`}
        >
            <div className="flex-1 w-full flex flex-row items-center justify-between gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.6vw+1rem)] font-semibold cursor-pointer hovered">Fuel Logs</span>
                <div className="flex-1 flex flex-row items-center justify-end text-[calc(0.4vw+0.6rem)]">
                    <i title="Refresh" className="bx bx-refresh-cw bx-spin-hover hover:text-[var(--dark-color)] transition durtion-300 ease-in-out text-[calc(0.6vw+1rem)] cursor-pointer" 
                    onClick={() => refetch()}/>
                </div>
                <div className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"}
                    flex flex-row items-center jsutify-center rounded-md cursor-pointer text-[var(--light-color)] 
                    bg-[var(--purple-color)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] gap-[calc(0.2vw+0.3rem)]`}
                onClick={() => setIsAddFuel((prev) => !prev)}>
                    <i className="bx bx-plus bx-tada-hover"></i>
                    <span>Add</span>
                </div>
            </div>

            {isAddFuel && <AddFuel isDark={isDark} user={user} 
                fuelInfo={fuelInfo}       
                refetch={refetch}
                setIsAddFuel={setIsAddFuel}
            />}

            <div className="h-full w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                <div className="h-auto w-full flex flex-col items-start justify-start bg-[var(--purple-color)] text-[var(--light-color)] p-[calc(0.4vw+0.6rem)]">
                    {!isMobile &&                    
                        <div className="h-auto w-full flex flex-row items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                            <span className="text-[calc(0.4vw+0.6rem)]">Id</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Vehicle</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Volume(L)</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Cost</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Added By</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Log Date</span>
                            <div className="flex-1 flex flex-row items-center justify-end text-[calc(0.4vw+0.6rem)]">
                                <i title="Refresh" className="bx bx-refresh-cw bx-spin-hover hover:text-[var(--dark-color)] transition durtion-300 ease-in-out text-[calc(0.6vw+1rem)] cursor-pointer" 
                                onClick={() => refetch()}/>
                            </div>
                        </div>
                    }

                    {isMobile && 
                        <div className="h-auto w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                            <div className="h-auto w-full flex flex-row items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                                <span className="text-[calc(0.4vw+0.6rem)]">Id</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Vehicle</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Volume</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Cost</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Added By</span>
                                <span className="flex-1 text-[calc(0.4vw+0.6rem)]">Log Date</span>
                            </div>
                        </div>
                    }
                </div>

                {fuelInfo.map((fuel, index) => (
                    <div key={fuel.id ?? index} className="w-full border-b border-[var(--border-color)] p-[calc(0.4vw+0.6rem)]">
                        {!isMobile && <div className="flex flex-row items-start justify-start flex-wrap gap-[calc(0.4vw+0.6rem)]">
                            <span className="text-[calc(0.4vw+0.6rem)]">{fuel.id ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{fuel.vehicle ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{fuel.volume ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{fuel.cost ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{fuel.addedBy ?? "null"}</span>
                            <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{fuel.logDate ?? "null"}</span>
                            <div className="flex-1 flex flex-row items-center justify-end gap-[calc(0.4vw+0.6rem)]">
                                <i className="bx bx-edit bx-tada-hover text-[calc(0.8vw+1rem)] cursor-pointer"></i>
                                <i className="bx bx-trash bx-tada-hover text-[calc(0.8vw+1rem)] hover:text-red-500 cursor-pointer"></i>
                            </div>
                        </div>}

                        {isMobile && 
                            <div className="flex flex-col items-start justify-start flex-wrap gap-[calc(0.4vw+1rem)]">
                                <div className="flex flex-row items-start justify-start flex-wrap gap-[calc(0.4vw+0.6rem)]">
                                    <span className="text-[calc(0.4vw+0.6rem)]">{fuel.id ?? "null"}</span>
                                    <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{fuel.vehicle ?? "null"}</span>
                                    <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{fuel.volume ?? "null"}</span>
                                    <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{fuel.cost ?? "null"}</span>
                                    <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{fuel.addedBy ?? "null"}</span>
                                    <span className="flex-1 text-[calc(0.4vw+0.6rem)]">{fuel.logDate ?? "null"}</span>
                                </div>
                                <div className="w-full flex-1 flex flex-row items-center justify-end gap-[calc(0.4vw+0.6rem)]">
                                    <i className="bx bx-edit bx-tada-hover text-[calc(0.8vw+1rem)] cursor-pointer"></i>
                                    <i className="bx bx-trash bx-tada-hover text-[calc(0.8vw+1rem)] hover:text-red-500 cursor-pointer"></i>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Fuel;
