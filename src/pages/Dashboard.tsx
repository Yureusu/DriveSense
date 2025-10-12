import { useState } from "react";
import Header from "../layouts/Dashboard/Header"
import Content from "../layouts/Dashboard/Content";

function Dashboard() {

    const [isDark, setIsDark] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header isDark={isDark} setIsDark={setIsDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content isDark={isDark} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
        </div>
    )
}

export default Dashboard