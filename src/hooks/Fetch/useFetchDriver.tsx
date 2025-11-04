import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../server/Firebase/Firebase";
import type { UserInfo, DriverInfo } from "../../App";

export function useFetchDriver(user: UserInfo | null) {
    const [driverInfo, setDriverInfo] = useState<DriverInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchDrivers = useCallback(async () => {
        if (!user?.uid) return;

        try {
            setLoading(true);
            const driverRef = collection(db, "users", user.uid, "drivers");
            const driverSnap = await getDocs(driverRef);

            const fetchedDriverInfos: DriverInfo[] = [];

            driverSnap.forEach((doc) => {
                const data = doc.data();

                fetchedDriverInfos.push({
                    id: doc.id,
                    name: data.name ?? "null",
                    contact: data.contact ?? "null",
                    license: data.license ?? "null"
                });
            });

            setDriverInfo(fetchedDriverInfos);
        } catch (err: any) {
            console.error("Failed to fetch vehicle logs:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if(user?.uid){
            fetchDrivers();
        }
    }, [fetchDrivers]);

    return { driverInfo, loading, error, refetch: fetchDrivers };
}
