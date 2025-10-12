import CarImg from "../../assets/imgs/car-img.png"
import useIsMobile from "../../hooks/useIsMobile"
import Card from "../../components/Landing/Card";
import BarChart from "../../chartjs/Landing/BarChart";
import LineChart from "../../chartjs/Landing/LineChart";
import DoughnutChart from "../../chartjs/Landing/DoughnutChart";
import Footer from "./Footer";

type changeTheme = {
    isDark: boolean;
}

function Content({isDark}: changeTheme) {

    const isMobile = useIsMobile();

    return (
        <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
            fade-in h-screen w-full flex flex-col items-center justify-start overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar`}>

            <section  id="landing-section" className={`${isMobile? "flex-col min-h-screen w-full justify-center" : "w-[90%] flex-row min-h-screen justify-around snap-start"}
                flex items-center border-b border-[var(--border-color)]`}>

                <div className="h-auto w-full flex-1 flex flex-row items-center justify-center p-[calc(0.4vw+0.6rem)]">
                    <div className="flex flex-col items-start justify-center gap-[calc(0.4vw+0.6rem)]">
                        <span className="text-[calc(1.6vw+1.4rem)] font-bold cursor-pointer hovered">Fuel Consumption and Vehicle Usage Monitoring System</span>
                        {!isMobile && <span className="text-[calc(0.4vw+0.6rem)] font-bold cursor-pointer hovered">Enhancing Vehicle Efficiency Through Digital Monitoring</span>}
                        {!isMobile && <div className="flex flex-row items-center justify-center gap-[calc(0.4vw+0.6rem)]">
                            <span className={`${isDark? "text-[var(--light-color)] bg-[var(--blue-color)]" : "text-[var(--light-color)] bg-[var(--blue-color)]"}
                                text-[calc(0.4vw+0.6rem)] p-[calc(0.4vw+0.6rem)] rounded-md cursor-pointer
                                hover:bg-[var(--purple-color)] transition duration-300 ease-in-out hover:text-[var(--dark-color)] font-semibold`}>Get Started</span>
                            <span className={`${isDark? "text-[var(--dark-color)] bg-[var(--light-color)]" : "text-[var(--light-color)] bg-[var(--dark-color)]"}
                                text-[calc(0.4vw+0.6rem)] p-[calc(0.4vw+0.6rem)] rounded-md cursor-pointer font-semibold
                                hover:bg-[var(--purple-color)] transition duration-300 ease-in-out hover:text-[var(--light-color)]`}>Sign In</span>
                        </div>}
                    </div>       
                </div>  

                <div className="relative h-auto w-full flex-1 flex flex-row items-center justify-center p-[calc(0.4vw+0.6rem)]">
                    <img src={CarImg} className={`${isMobile? "h-[calc(18vw+16rem)] min-w-[calc(18vw+16rem)]" : 
                    "h-[calc(18vw+16rem)] w-[calc(24vw+18rem)] mb-[48px]"}`} alt="" />
                </div>
                
                {isMobile && <div className="h-auto w-full flex-1 flex flex-row items-center justify-center p-[calc(0.4vw+0.6rem)]">
                    <div className="w-full flex flex-col items-start justify-center gap-[calc(0.4vw+0.6rem)]">
                        <span className="text-[calc(0.4vw+0.6rem)] font-bold cursor-pointer hovered">Enhancing Vehicle Efficiency Through Digital Monitoring</span>
                        <div className="flex flex-row items-center justify-center gap-[calc(0.4vw+0.6rem)]">
                            <span className={`${isDark? "text-[var(--light-color)] bg-[var(--blue-color)]" : "text-[var(--light-color)] bg-[var(--blue-color)]"}
                                text-[calc(0.4vw+0.6rem)] p-[calc(0.4vw+0.6rem)] rounded-md hovered cursor-pointer`}>Get Started</span>
                            <span className={`${isDark? "text-[var(--dark-color)] bg-[var(--light-color)]" : "text-[var(--light-color)] bg-[var(--dark-color)]"}
                                text-[calc(0.4vw+0.6rem)] p-[calc(0.4vw+0.6rem)] rounded-md hovered cursor-pointer font-semibold`}>Sign In</span>
                        </div>
                    </div>
                </div>}

            </section>

            <section className={`${isMobile? "flex-col h-auto w-full justify-center" : "w-[90%] flex-col min-h-screen justify-start snap-start"}
                flex items-center py-[calc(0.8vw+1.2rem)] border-b border-[var(--border-color)]`}>

                <span className="text-[calc(0.8vw+1rem)] cursor-pointer font-semibold hovered">Why Use DriveSense?</span>
                {/* animate span fadein and to top of section */}
                
                <div className={`${isDark? "text-[var(--light-color)]" : "text-[var(--dark-color)]"}
                        ${isMobile? "flex-row items-center flex-wrap" : "flex-row items-start"}
                        w-full flex justify-center gap-[calc(0.4vw+0.6rem)] p-[calc(0.4vw+0.6rem)]`}>
                    <Card 
                        icon={
                            <i className='bx bx-petrol-pump bx-tada-hover text-[calc(1.6vw+2.2rem)] text-[var(--purple-color)] font-semibold cursor-pointer' ></i> 
                        } title={"Monitor Fuel Consumption"} info={"Track fuel volume, cost and refusing data."} isDark={isDark} />
                    <Card 
                        icon={
                            <i className='bx bx-chart-bar-columns bx-tada-hover text-[calc(1.6vw+2.2rem)] text-[var(--purple-color)] font-semibold cursor-pointer' ></i>                       
                        } title={"Analyze Efficiency"} info={"Generate reports on vehicle mileage and performance."} isDark={isDark} />
                    <Card 
                        icon={
                            <i className='bx bx-car bx-tada-hover text-[calc(1.6vw+2.2rem)] text-[var(--purple-color)] font-semibold cursor-pointer' ></i>                    
                        } title={"Manage Vehicles"} info={"Register and update vehicle details with ease."} isDark={isDark} />
                    <Card 
                        icon={
                            <i className='bx bx-lock-keyhole bx-tada-hover text-[calc(1.6vw+2.2rem)] text-[var(--purple-color)] font-semibold cursor-pointer' ></i> 
                        } title={"Secure Access"} info={"Role: based login for admin, driver and owner."} isDark={isDark} />
                </div>
                {/* animate the div fadein and to center of section */}

                <div className={`${isMobile? "flex-col justify-start w-full" : "flex-row justify-center h-[320px] w-full"}
                    h-auto flex items-center p-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]`}>
                    <div className={`${isMobile? "h-[300px] w-full" : "h-[300px] flex-1"} cursor-pointer
                        p-[calc(0.4vw+0.6rem)] rounded-md border border-[var(--border-color)] flex flex-col items-center justify-center`}>
                        <BarChart isDark={isDark}/>
                    </div>
                    <div className={`${isMobile? "h-[300px] w-full" : "h-[300px] flex-1"} cursor-pointer
                        p-[calc(0.4vw+0.6rem)] rounded-md border border-[var(--border-color)] flex flex-col items-center justify-center`}>
                        <LineChart isDark={isDark}/>
                    </div>
                    <div className={`${isMobile? "h-[300px] w-full" : "h-[300px] flex-1"} cursor-pointer
                        p-[calc(0.4vw+0.6rem)] rounded-md border border-[var(--border-color)] flex flex-col items-center justify-center`}>
                        <DoughnutChart isDark={isDark}/>
                    </div>
                </div>
                {/* animate the div fadein after cards div*/}

            </section>

            <section className={`${isMobile? "flex-col h-auto w-full justify-center" : "w-[90%] flex-col min-h-screen justify-start snap-start"}
                flex items-center py-[calc(0.8vw+1.2rem)]`}>
                <Footer isDark={isDark}/>
            </section>

        </div>
    )
}

export default Content