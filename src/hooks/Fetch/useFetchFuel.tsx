import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../server/Firebase/Firebase";
import type { UserInfo, FuelInfo } from "../../App";

export function useFetchFuels(user: UserInfo | null) {
    const [fuelInfo, setFuelInfo] = useState<FuelInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchFuels = useCallback(async () => {
        if (!user?.uid) return;

        try {
            setLoading(true);
            const fuelRef = collection(db, "users", user.uid, "fuels");
            const fuelSnap = await getDocs(fuelRef);

            const fetchedFuelInfos: FuelInfo[] = [];

            fuelSnap.forEach((doc) => {
                const data = doc.data();

                fetchedFuelInfos.push({
                    id: doc.id || null,
                    vehicle: data.vehicle ?? "null",
                    volume: data.volume ?? "null",
                    cost: data.cost ?? "null",
                    addedBy: data.addedBy ?? "null",
                    logDate: data.logDate ?? "null",
                });
            });

            setFuelInfo(fetchedFuelInfos);
        } catch (err: any) {
            console.error("Failed to fetch fuel logs:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchFuels();
    }, [fetchFuels]);

    return { fuelInfo, loading, error, refetch: fetchFuels };
}
