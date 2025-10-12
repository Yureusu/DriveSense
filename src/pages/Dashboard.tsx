import { useState } from "react";
import Header from "../layouts/Dashboard/Header"
import Content from "../layouts/Dashboard/Content";

function Dashboard() {

    const [isDark, setIsDark] = useState(true);

    return (
        <div>
            <Header isDark={isDark} setIsDark={setIsDark}/>
            <Content isDark={isDark}/>
        </div>
    )
}

export default Dashboard