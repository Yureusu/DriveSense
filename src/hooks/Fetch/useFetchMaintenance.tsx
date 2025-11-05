import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../server/Firebase/Firebase";
import type { UserInfo, MaintenanceInfo } from "../../App";

export function useFetchMaintenance(user: UserInfo | null) {
    const [maintenanceInfo, setMaintenanceInfo] = useState<MaintenanceInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchMaintenance = useCallback(async () => {
        if (!user?.uid) return;

        try {
            setLoading(true);
            const maintenanceRef = collection(db, "users", user.uid, "maintenance");
            const maintenanceSnap = await getDocs(maintenanceRef);

            const fetchedMaintenanceInfos: MaintenanceInfo[] = [];

            maintenanceSnap.forEach((doc) => {
                const data = doc.data();

                fetchedMaintenanceInfos.push({
                    id: doc.id || null,
                    vehicle: data.vehicle ?? "null",
                    description: data.description ?? "null",
                    cost: data.cost ?? "null",
                    createdAt: data.createdAt ?? "null"
                });
            });

            setMaintenanceInfo(fetchedMaintenanceInfos);
        } catch (err: any) {
            console.error("Failed to fetch fuel logs:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchMaintenance();
    }, [fetchMaintenance]);

    return { maintenanceInfo, loading, error, refetch: fetchMaintenance };
}
