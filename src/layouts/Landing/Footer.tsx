import darkIcon from "../../assets/ui/app-icon.png"
import lightIcon from "../../assets/ui/app-icon.png"
import useIsMobile from "../../hooks/useIsMobile"

type changeTheme = {
    isDark: boolean;
}

function Footer({isDark}: changeTheme) {

    const isMobile = useIsMobile();

    return (
        <div className={`${isMobile? "flex-col" : "flex-col"}
            fade-in flex items-center justify-center h-screen w-full p-[calc(0.4vw+0.6rem)]`}>
            
            <section className="h-full w-full flex flex-col items-center justify-start p-[calc(0.4vw+0.6rem)]">
                
                <div className={`${isMobile? "flex-col items-center gap-[calc(0.4vw+0.6rem)]" : "flex-row items-center"}
                    h-auto w-full flex justify-center py-[calc(0.4vw+0.6rem)] border-b border-[var(--border-color)]`}>
                    <div className="flex-1 flex flex-col items-center justify-center h-full gap-[calc(0.4vw+0.6rem)]">
                        <img src={isDark? darkIcon : lightIcon} className="h-[calc(6vw+6.4rem)] w-[calc(6vw+6.4rem)] cursor-pointer
                            filter hover:brightness-60 transition duration-300" alt="" />
                        <span className="text-[calc(0.8vw+1.2rem)] cursor-pointer font-semibold hovered">DriveSense</span>
                    </div>
                    <div className={`${isMobile? "w-full" : ""}
                        flex-3 h-full flex flex-col items-start justify-center gap-[calc(0.4vw+0.6rem)]`}>
                        
                        <div className="flex-1 w-full flex flex-col items-start justify-center py-[calc(0.4vw+0.6rem)]">
                            <span className="w-full text-[calc(0.4vw+1rem)] text-center cursor-pointer font-semibold hovered">Subscribe to our newsletter</span>
                            <div className="w-full flex flex-row items-center justify-center p-[calc(0.4vw+0.6rem)] pl-0">
                                <input type="email" placeholder="Enter your email"
                                    className={`${isMobile? "text-[calc(0.4vw+0.7rem)] placeholder:text-[calc(0.4vw+0.7rem)]" : ""}
                                    ${isDark? "border-[var(--light-color)]" : "border-[var(--dark-color)]"}
                                    w-full outline-none px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] border-b`}/>
                                <i className='bx bx-arrow-right-stroke-circle bx-spin-hover hovered text-[calc(1vw+1.4rem)] cursor-pointer'  ></i> 
                            </div>
                        </div>

                        <div className={`${isMobile? "pb-[calc(0.4vw+0.6rem)]" : "p-[calc(0.4vw+0.6rem)]"}
                            flex-3 w-full flex items-center justify-center gap-[calc(1.4vw+1.6rem)]`}>
                            
                            <div className={`${isMobile? "items-center" : "items-start"}
                                h-auto flex-1 flex flex-col justify-center gap-[calc(0.4vw+0.6rem)]`}>
                                <span className="text-[calc(0.6vw+0.8rem)] font-semibold cursor-pointer hovered">About Us</span>
                                <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} cursor-pointer hovered`}>Mission</span>
                                <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} cursor-pointer hovered`}>Team</span>
                                <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} cursor-pointer hovered`}>Docs</span>
                            </div>
                            <div className={`${isMobile? "items-center" : "items-start"}
                                h-auto flex-1 flex flex-col justify-center gap-[calc(0.4vw+0.6rem)]`}>
                                <span className="text-[calc(0.6vw+0.8rem)] font-semibold cursor-pointer hovered">Support</span>
                                <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} cursor-pointer hovered`}>Contact</span>
                                <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} cursor-pointer hovered`}>Support</span>
                                <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} cursor-pointer hovered`}>FAQ's</span>
                            </div>
                            <div className={`${isMobile? "items-center" : "items-start"}
                                h-auto flex-1 flex flex-col justify-center gap-[calc(0.4vw+0.6rem)]`}>
                                <span className="text-[calc(0.6vw+0.8rem)] font-semibold cursor-pointer hovered">Social</span>
                                <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} cursor-pointer hovered`}>Facebook</span>
                                <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} cursor-pointer hovered`}>Instagram</span>
                                <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} cursor-pointer hovered`}
                                onClick={() => {
                                    window.open("https://github.com/Yureusu/DriveSense/actions");
                                }}>Github</span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>
            <section className="w-full flex flex-row items-center justify-between flex-wrap">
                <span className='text-[calc(0.4vw+0.6rem)] text-center cursor-pointer hovered p-[calc(0.4vw+0.6rem)]'>
                    Copyright © DriveSense 2025
                </span>
                <span className='text-[calc(0.4vw+0.6rem)] text-center cursor-pointer hovered p-[calc(0.4vw+0.6rem)]'>
                    Terms of Service
                </span>
                <span className='text-[calc(0.4vw+0.6rem)] text-center cursor-pointer hovered p-[calc(0.4vw+0.6rem)]'>
                    A100 Group 6 BSIT Mini-Capstone Project
                </span>
                <div className="flex flex-row items-center justify-center">
                    <span className='text-[calc(0.4vw+0.6rem)] text-center cursor-pointer hovered p-[calc(0.4vw+0.6rem)]'>
                        Back to top
                    </span> 
                    <i className='bx bx-arrow-up-square bx-tada-hover text-[calc(1vw+1.4rem)] cursor-pointer hovered' 
                    onClick={() => {
                        const section = document.getElementById('landing-section');
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}></i> 
                </div>
            </section>
        </div>
    )
}

export default Footer