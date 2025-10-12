import { auth } from './Firebase'; 
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import type { SetStateAction } from 'react';
import type { UserInfo } from '../../App';

type GoogleSignInProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
    setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
}

const GoogleLogin = ({isLoggedIn, setIsLoggedIn, setUser}: GoogleSignInProps) => {
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            setUser({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });

            setIsLoggedIn((prev) => !prev)
            {isLoggedIn && console.log("Google Sign-In successful:", user);}            

        // user.displayName, user.email, user.uid, user.photoURL, etc.
        } catch (error) {
            console.error("Google Sign-In error:", error);
        }
    };

    return (
        <div className='flex flex-row items-center justify-center px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)]  
            bg-[var(--blue-color)] text-[var(--light-color)] cursor-pointer rounded-full gap-[calc(0.2vw+0.3rem)] 
            hover:bg-[var(--purple-color)] hover:text-[var(--dark-color)] transition duration-300 ease-in-out'>
            <i className='bxl bx-google bx-tada-hover text-[calc(0.4vw+0.8rem)]'></i> 
            <span onClick={handleGoogleLogin} className="text-[calc(0.4vw+0.5rem)]">
                Sign in with Google
            </span>
        </div>
    );
};

export default GoogleLogin;
