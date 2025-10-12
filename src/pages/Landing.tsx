import { useState } from "react"
import type { SetStateAction } from "react";
import Header from "../layouts/Landing/Header";
import Content from "../layouts/Landing/Content";

type landingProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

function Landing({isLoggedIn, setIsLoggedIn}: landingProps) {

    const [isDark, setIsDark] = useState(true);

    return (
        <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
            h-screen w-screen overflow-hidden flex flex-col items-center justify-start`}>
            <Header isDark={isDark} setIsDark={setIsDark} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Content isDark={isDark}/>
        </div>
    )
}

export default Landing