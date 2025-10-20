import useIsMobile from "../../../hooks/useIsMobile"

type FuelProps = {
    isDark: boolean;
}

function Fuel({isDark}: FuelProps) {

    const isMobile = useIsMobile();

    return (
        <div className={`${isDark? "" : ""}
            ${isMobile? "p-[calc(0.4vw+0.6rem)]" : "border-l px-[calc(0.4vw+0.6rem)]"}
            flex flex-col items-center justify-start h-full w-full flex-5 border-[var(--border-color)]`}>
            Fuel Tab
        </div>
    )
}

export default Fuel