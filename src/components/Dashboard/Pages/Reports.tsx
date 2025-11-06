import type { UserInfo } from "../../../App";
import useIsMobile from "../../../hooks/useIsMobile"
import PdfExporter from "../PdfExporter";


type ReportsProps = {
    isDark: boolean;
    user: UserInfo | null;
}

function Reports({isDark, user}: ReportsProps) {

    const isMobile = useIsMobile();

    return (
        <div className={`${isDark? "" : ""}
            ${isMobile? "" : "border-l px-[calc(0.4vw+0.6rem)]"}
            flex flex-col items-start justify-start h-full w-full flex-5 border-[var(--border-color)]`}>
            <PdfExporter isDark={isDark} user={user}/>
        </div>
    )
}

export default Reports