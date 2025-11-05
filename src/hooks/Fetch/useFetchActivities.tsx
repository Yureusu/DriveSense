import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../server/Firebase/Firebase";
import type { UserInfo, RecentActivities } from "../../App";

export function useFetchActivities(user: UserInfo | null) {
    const [recentActivity, setRecentActivity] = useState<RecentActivities[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchActivities = useCallback(async () => {
        if (!user?.uid) return;

        try {
            setLoading(true);
            const actRef = collection(db, "users", user.uid, "activities");
            const actSnap = await getDocs(actRef);

            const fetchedActivities: RecentActivities[] = [];

            actSnap.forEach((doc) => {
                const data = doc.data();

                fetchedActivities.push({
                    activity: data.activity ?? "null",
                    date: data.date ?? "null",
                    time: data.time ?? "null"
                });
            });

            setRecentActivity(fetchedActivities);
        } catch (err: any) {
            console.error("Failed to fetch recent activities:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if(user?.uid){
            fetchActivities();
        }
    }, [fetchActivities]);

    return { recentActivity, loading, error, refetch: fetchActivities };
}
