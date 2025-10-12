import { useState } from "react";
import Header from "../layouts/Dashboard/Header"
import Content from "../layouts/Dashboard/Content";
import type { UserInfo } from "../App";

type DashboardProps ={
    user: UserInfo | null;
}

function Dashboard({user}: DashboardProps) {

    const [isDark, setIsDark] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header isDark={isDark} setIsDark={setIsDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user}/>
            <Content isDark={isDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex} user={user}/>
        </div>
    )
}

export default Dashboard