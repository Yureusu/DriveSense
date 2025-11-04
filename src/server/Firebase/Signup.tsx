import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import type { SetStateAction } from "react";
import { Popup } from "../../components/Global/Popup";
import { db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";
import type { UserInfo } from "../../App";
import useIsMobile from "../../hooks/useIsMobile";

type SignupProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
    setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
    setIsFormVisible: React.Dispatch<SetStateAction<boolean>>;
}

function SignUp({ isLoggedIn, setIsLoggedIn, setUser, setIsFormVisible}: SignupProps) {

    const isMobile = useIsMobile();

    console.log("Sign up form is visible");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>(""); 

    const auth = getAuth();

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            setUser({
                displayName: null,
                email: user.email,
                photoURL: null,
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
    
            console.log("Signed up successfully!", user);
            console.log("Uid: ", user.uid);

            setIsFormVisible(false);
            setIsLoggedIn(true);

        } catch (error: any) {
            setIsPopupVisible(true);
            console.error("Error signing up:", error.message);
        }
    };    
      
    return (
        <>
            {!isLoggedIn && <>
                <input type="email" placeholder="Email" className={`${isMobile? "placeholder:text-[calc(0.4vw+0.6rem)] text-[calc(0.4vw+0.6rem)]" : "placeholder:text-[calc(0.4vw+0.5rem)] text-[calc(0.4vw+0.5rem)]"} 
                    cursor-pointer outline-none border border-[var(--border-color)] rounded-xl focus:border-[var(--purple-color)]
                    placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] w-full`} required
                    onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" className={`${isMobile? "placeholder:text-[calc(0.4vw+0.6rem)] text-[calc(0.4vw+0.6rem)]" : "placeholder:text-[calc(0.4vw+0.5rem)] text-[calc(0.4vw+0.5rem)]"} 
                    cursor-pointer outline-none border border-[var(--border-color)] rounded-xl focus:border-[var(--purple-color)]
                    placeholder-gray-500 px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] w-full`} required
                    onChange={(e) => setPassword(e.target.value)}/>
                <span className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"}
                    text-[var(--light-color)] w-full px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-xl text-center cursor-pointer 
                    bg-[var(--blue-color)] hover:bg-[var(--purple-color)] transition duration-300 ease-in-out`}
                    onClick={() => handleSignUp()}>Continue</span>

                {isPopupVisible && <Popup closePopup={() => setIsPopupVisible(false)} children={
                    <p className="text-[calc(0.4vw+0.5rem)]">Email is invalid or already in used.</p>
                }/>}
            </>}
        </>
    )
}

export default SignUp