// src/hooks/useFetchVehicle.ts
import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../server/Firebase/Firebase";
import type { UserInfo, VehicleInfo } from "../../App";

export function useFetchVehicle(user: UserInfo | null) {
    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchVehicles = useCallback(async () => {
        if (!user?.uid) return;

        try {
            setLoading(true);
            const vehicleRef = collection(db, "users", user.uid, "vehicles");
            const vehicleSnap = await getDocs(vehicleRef);

            const fetchedVehicleInfos: VehicleInfo[] = [];

            vehicleSnap.forEach((doc) => {
                const data = doc.data();

                fetchedVehicleInfos.push({
                    id: doc.id,
                    plateNumber: data.plateNumber ?? "null",
                    model: data.model ?? "null",
                    driver: data.driver ?? "null",
                    createdAt: data.createdAt ?? "null",
                });
            });

            setVehicleInfo(fetchedVehicleInfos);
        } catch (err: any) {
            console.error("Failed to fetch vehicle logs:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    return { vehicleInfo, loading, error, refetch: fetchVehicles };
}
