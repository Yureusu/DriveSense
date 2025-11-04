import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { useState } from "react";
import type { SetStateAction } from "react";
import { Popup } from "../../components/Global/Popup";
import type { UserInfo } from "../../App";

type SigninProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
    setIsFormVisible: React.Dispatch<SetStateAction<boolean>>;
    setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
}

function SignIn({ isLoggedIn, setIsLoggedIn, setIsFormVisible, setUser}: SigninProps) {

    console.log("Sign in form is visible");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>(""); 

    const auth = getAuth();

    const handleSignIn = async () => {
        try{
            await signInWithEmailAndPassword (auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;

                console.log("Signed in sukses!", user);
                console.log("Uid: ", user.uid);

                setUser({
                    displayName: null,
                    email: user.email,
                    photoURL: null,
                    uid: user.uid
                });

                setIsFormVisible(false);
                setTimeout(() => {
                    setIsLoggedIn(true);
                }, 3000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsPopupVisible(true);
                console.log(errorCode, errorMessage);
            });
        } catch(error){
            setIsPopupVisible(true);
            console.log("Can't sign in!", error);
        }
    }  

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
                    onClick={() => handleSignIn()}>Continue</span>

                {isPopupVisible && <Popup closePopup={() => setIsPopupVisible(false)} children={
                    <p className="text-[calc(0.4vw+0.5rem)]">The email address you've entered doesn't match any account.</p>
                }/>}
            </>}
        </>
    )
}

export default SignIn