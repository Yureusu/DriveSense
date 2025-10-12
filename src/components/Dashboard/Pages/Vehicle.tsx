import useIsMobile from "../../../hooks/useIsMobile"

type changeTheme = {
    isDark: boolean;
}

function Dashboard({isDark} : changeTheme) {

    const isMobile = useIsMobile(); 

    return (
        <section id="main" className={`${isMobile? "p-[calc(0.4vw+0.6rem)]" : "border-l px-[calc(0.4vw+0.6rem)]"}
        ${isDark? "" : ""}
        flex flex-col items-start justify-start h-full w-full flex-5 border-[var(--border-color)] gap-[calc(0.4vw+0.6rem)]`}>

            <div className="h-auto w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)]">
                <span className="text-[calc(0.8vw+1.2rem)] font-semibold cursor-pointer hovered">Vehicle Information</span>
                <span className="text-[calc(0.4vw+0.5rem)] text-[var(--light-color)] bg-[var(--purple-color)] 
                px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] rounded-lg cursor-pointer">Add Vehicle</span>
            </div>

            <div className="flex-1 w-full flex flex-col items-start justify-start gap-[calc(0.4vw+0.6rem)] bordered">

            </div>
            

        </section>
    )
}

export default Dashboard