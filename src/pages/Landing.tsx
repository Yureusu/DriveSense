import { useState } from "react"
import type { SetStateAction } from "react";
import Header from "../layouts/Landing/Header";
import Content from "../layouts/Landing/Content";
import type { UserInfo } from "../App";

type landingProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
    setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
}

function Landing({isLoggedIn, setIsLoggedIn, setUser}: landingProps) {

    const [isDark, setIsDark] = useState(false);

    return (
        <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
            h-screen w-screen overflow-hidden flex flex-col items-center justify-start`}>
            <Header isDark={isDark} setIsDark={setIsDark} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
            <Content isDark={isDark}/>
        </div>
    )
}

export default Landing