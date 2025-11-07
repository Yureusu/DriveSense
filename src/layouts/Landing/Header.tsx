import { useState, type SetStateAction } from "react";
import Theme from "../../components/Global/Theme";
import DarkIcon from "../../assets/ui/app-icon.png"
import LightIcon from "../../assets/ui/app-icon.png"
import useIsMobile from "../../hooks/useIsMobile";
import GoogleLogin from "../../server/Firebase/GoogleSignin";
import type { UserInfo } from "../../App";
import Signup from "../../server/Firebase/Signup";
import Signin from "../../server/Firebase/Signin";

type headerProps = {
    isDark: boolean;
    setIsDark: React.Dispatch<SetStateAction<boolean>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
    setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
}

function Header({isDark, setIsDark, isLoggedIn, setIsLoggedIn, setUser}: headerProps) {

    const isMobile = useIsMobile();
    const [isSidenavActive, setIsSidenavActive] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSignupVisible, setIsSignupVisible] = useState(false);

    const handleSignIn = () => {
        setIsFormVisible((prev) => !prev);
    }

    return (
        <div className={`${isLoggedIn? "" : ""}
            ${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
            fade-in sticky top-0 left-0 z-2 h-auto w-full flex flex-row items-center justify-between border-b border-[var(--border-color)] p-[12px]`}>
            <div className="flex flex-row items-center gap-[calc(0.4vw+0.6rem)]">
                {isMobile && <i className="bx bx-menu bx-bounce-hover text-[calc(0.8vw+1.2rem)] cursor-pointer" 
                    onClick={() => setIsSidenavActive((prev) => !prev)}></i>}
                <img src={isDark? DarkIcon : LightIcon} className="h-[calc(1.2vw+1.8rem)] w-[calc(1.2vw+1.8rem)] cursor-pointer hovered"/>
                <span className="text-[calc(0.6vw+0.8rem)] cursor-pointer font-semibold hovered">DriveSense</span>
            </div>

            {!isMobile && <div className="flex flex-row items-center gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer hovered"
                onClick={() => {
                    location.reload();
                }}>Home</span>
                <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Features</span>
                <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer hovered" 
                onClick={() => {
                    window.open("https://github.com/Yureusu/DriveSense/actions");
                }}>Github</span>
            </div>}
                
            <div className="flex flex-row items-center gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.4vw+0.6rem)] cursor-pointer hovered">Docs</span>
                <span className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"}
                    ${isDark? "text-[var(--dark-color)] bg-[var(--light-color)]" : "text-[var(--light-color)] bg-[var(--dark-color)]"}
                    px-[calc(0.4vw+0.6rem)] py-[calc(0.2vw+0.3rem)] rounded-md cursor-pointer
                    hover:bg-[var(--purple-color)] transition duration-300 ease-in-out hover:text-[var(--light-color)] font-semibold`}
                    onClick={() => handleSignIn()}>
                    Sign In
                </span>

                {isFormVisible && <div className="fade-in absolute top-0 left-0 h-screen w-screen flex flex-col items-center justify-center bg-[rgba(0,0,0,0.50)]">
                    <div className={`${isMobile? "h-auto w-[90%] p-[12px]" : "h-[420px] w-[420px]"}
                        bg-[var(--light-color)] flex flex-col items-center justify-start relative rounded-xl rounded-tr-none`}>
                        <i className={`${isMobile? "text-[calc(1vw+1.6rem)] top-[-8px] right-[-12px]" : "text-[calc(1vw+1.2rem)] top-[-10px] right-[-14px]"}
                            fa-solid fa-circle-xmark text-[var(--blue-color)] hovered
                            flex flex-row items-center justify-center absolute cursor-pointer`}
                            onClick={() => setIsFormVisible((prev) => !prev)}></i> 

                        {/*Form*/}
                        <div className={`${isMobile? "py-[calc(0.4vw+0.6rem)] px-[calc(1.4vw+1.6rem)]" : "py-[calc(0.4vw+0.6rem)] px-[calc(2.4vw+2.6rem)]"}
                            w-full flex flex-col items-center justify-start gap-[calc(0.4vw+0.6rem)] text-[var(--dark-color)]`}>
                            <img src={LightIcon} className="h-[calc(1.2vw+1.8rem)] w-[calc(1.2vw+1.8rem)] cursor-pointer" alt="" />
                            {!isSignupVisible && 
                            <>
                                <span className="text-[calc(0.4vw+0.8rem)] font-semibold text-center">Sign in to your account</span>
                                    <GoogleLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>

                                    <span className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"}`}>Or continue with</span>

                                    <Signin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setIsFormVisible={setIsFormVisible}/>

                                    <span className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"}`}>Don't have an account? 
                                        <span className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"} text-[var(--blue-color)] hovered cursor-pointer`}
                                        onClick={() => setIsSignupVisible((prev) => !prev)}> Sign Up</span>
                                </span>
                            </>
                            }
                            {isSignupVisible && 
                            <>
                                <span className="text-[calc(0.4vw+0.8rem)] font-semibold">Sign up an account</span>

                                    <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setIsFormVisible={setIsFormVisible}/>

                                    <span className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"}`}>Or continue with</span>

                                    <GoogleLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>

                                    <span className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"}`}>Already have an account? 
                                        <span className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"} text-[var(--blue-color)] hovered cursor-pointer`}
                                        onClick={() => setIsSignupVisible((prev) => !prev)}> Sign In</span>
                                </span>
                            </>}
                        </div>
                         
                    </div>
                </div>}
                
                <Theme isDark={isDark} setIsDark={setIsDark}/>
            </div>

            {isMobile && isSidenavActive && <div className="h-screen w-screen bg-[rgba(0,0,0,0.50)] absolute top-0 left-0">
                <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
                    h-screen w-[50vw] absolute top-0 left-0 flex flex-col items-start justify-start gap-[calc(0.4vw+1rem)] p-[calc(0.4vw+0.7rem)]`}>
                    <i className="bx bx-x bx-rotate-hover text-[calc(0.6vw+1rem)] cursor-pointer mt-[calc(0.2vw+0.2rem)]"
                        onClick={() => setIsSidenavActive((prev) => !prev)}></i>
                    <span className="text-[calc(0.4vw+0.8rem)] w-full cursor-pointer hovered font-semibold"
                        onClick={() => {
                            location.reload();
                        }}>Home</span>
                    <span className="text-[calc(0.4vw+0.8rem)] w-full cursor-pointer hovered font-semibold">Features</span>
                    <span className="text-[calc(0.4vw+0.8rem)] w-full cursor-pointer hovered font-semibold"
                        onClick={() => {
                            window.open("https://github.com/Yureusu/DriveSense/actions");
                        }}>Github</span>
                </div>
            </div>}

        </div>
    )
}

export default Header