import { useState, type SetStateAction } from "react";
import Header from "../layouts/Dashboard/Header"
import Content from "../layouts/Dashboard/Content";
import type { UserInfo } from "../App";

type DashboardProps ={
    user: UserInfo | null;
    driverNames: string[];
    setDriverNames: React.Dispatch<SetStateAction<string[]>>;
}

function Dashboard({user, driverNames, setDriverNames}: DashboardProps) {

    const [isDark, setIsDark] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header isDark={isDark} setIsDark={setIsDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user}/>
            <Content isDark={isDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user} driverNames={driverNames} setDriverNames={setDriverNames}/>
        </div>
    )
}

export default Dashboard