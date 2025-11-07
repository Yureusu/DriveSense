import type { UserInfo } from "../../../App"
import { useState, useEffect } from "react";
import { db } from "../../../server/Firebase/Firebase";
import { doc, setDoc } from "firebase/firestore";
import useIsMobile from "../../../hooks/useIsMobile";
import type { SetStateAction } from "react";

type EditDisplayNameProps = {
    isDark: boolean;
    user: UserInfo | null;
    setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
}

function EditDisplayName({ isDark, user, setUser }: EditDisplayNameProps) {

    const [newDisplayName, setNewDisplayName] = useState<string | undefined>(undefined);
    const [editName, setEditName] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (user?.displayName) {
            setNewDisplayName(user.displayName);
        }
    }, [user]);

    const handleEditName = () => {
        setEditName(true);
    }

    const handleCancel = () => {
        setEditName(false);
    }

    const handleSaveName = async () => {
        if (!user || !user.uid){
            console.log("Cant save name")
            return
        };
        try{   
            setUser(prev => ({
                ...prev!,
                displayName: newDisplayName ?? null,
            }));

            const userRef = doc(db, 'users', user.uid);
            
            await setDoc(userRef, {
                uid: user.uid,
                name: newDisplayName,
                email: user.email,
                photoURL: user.photoURL,
                updatedAt: new Date().toISOString(),
            }, { merge: true });

            console.log("Name saved:", newDisplayName);
            setEditName(false);
            

        } catch(err){
            console.error(err);
        }
    }

    return (
        <div className={`${isDark? "text-[var(--light-color)] border-t border-[var(--light-color)]" : "text-[var(--dark-color)] border-t border-[var(--dark-color)]"}
            ${isMobile? "flex flex-row items-center justify-between" : "flex flex-row items-center justify-between gap-[calc(0.4vw+0.6rem)]"}
            h-auto w-full py-[calc(0.4vw+0.6rem)]`}>
            
            <div className={`${isMobile? "flex-1" : "flex-1"}
                flex flex-row items-center justify-start gap-[calc(0.3vw+0.4rem)]`}>
                <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer">{`Display Name :`}</span>
                {!editName && <span className="cursor-pointer text-[calc(0.4vw+0.6rem)] text-[var(--blue-color)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)]">{user?.displayName}</span>}
                {editName && <input type="text"
                    maxLength={12}
                    placeholder={user?.displayName || "Display Name"}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    className={`${isDark? "text-[var(--light-color)]" : "text-[var(--dark-color)] "}
                        flex-1 text-[calc(0.4vw+0.6rem)] placeholder:text-[calc(0.4vw+0.6rem)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)]
                        placeholder:text-[var(--border-color)] border border-[var(--border-color)] outline-none cursor-pointer`} />}
            </div>

            <div className={`${isMobile? "" : "flex-1"}
                flex flex-row items-center justify-end gap-[calc(0.3vw+0.4rem)]`}>
                {!editName && <i title="Edit Name" className="bx bx-edit bx-tada-hover hovered text-[calc(0.4vw+1.2rem)] cursor-pointer"
                    onClick={() => handleEditName()}></i> }
                {editName && <i title="Save" className="bx bx-check-square bx-tada-hover text-[calc(0.4vw+1.4rem)] text-green-500 cursor-pointer"
                    onClick={() => handleSaveName()}></i> }
                {editName && <i title="Cancel" className="bx bx-x-square bx-tada-hover text-[calc(0.4vw+1.4rem)] text-red-500 cursor-pointer"
                    onClick={() => handleCancel()}></i> }
            </div>

        </div>
    )
}

export default EditDisplayName