import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import type { SetStateAction } from "react";
import { Popup } from "../../components/Global/Popup";
import { db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";
import type { UserInfo } from "../../App";

type SignupProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
    setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
    setIsFormVisible: React.Dispatch<SetStateAction<boolean>>;
}

function EmailPass({ isLoggedIn, setIsLoggedIn, setUser, setIsFormVisible}: SignupProps) {

    console.log("Sign up form is visible");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>(""); 

    const auth = getAuth();

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            //Store user in React state
            setUser({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid
            });
    
            const userRef = doc(db, "users", user.uid);
    
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                name: null,
                photoURL: null,
                createdAt: new Date().toISOString(),
            });

            console.log("User document created");
    
            setIsFormVisible(false);
            setIsLoggedIn(true);
            console.log("Signed up successfully!", user);
        } catch (error: any) {
            setIsPopupVisible(true);
            console.error("Error signing up:", error.message);
        }
    };    
      
    return (
        <>
            {!isLoggedIn && <>
                <input type="email" placeholder="Email" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-xl focus:border-[var(--purple-color)]
                    placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full" required
                    onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" className="cursor-pointer outline-none border border-[var(--border-color)] rounded-xl focus:border-[var(--purple-color)]
                    placeholder:text-[calc(0.4vw+0.5rem)] placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] text-[calc(0.4vw+0.5rem)] w-full" required
                    onChange={(e) => setPassword(e.target.value)}/>
                <span className="text-[calc(0.4vw+0.5rem)] text-[var(--light-color)] w-full px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-xl text-center cursor-pointer 
                    bg-[var(--blue-color)] hover:bg-[var(--purple-color)] transition duration-300 ease-in-out"
                    onClick={() => handleSignUp()}>Continue</span>

                {isPopupVisible && <Popup closePopup={() => setIsPopupVisible(false)} children={
                    <p className="text-[calc(0.4vw+0.5rem)]">Email is invalid or already in used.</p>
                }/>}
            </>}
        </>
    )
}

export default EmailPass