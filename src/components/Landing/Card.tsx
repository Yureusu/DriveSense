import type { ReactNode } from "react";
import useIsMobile from "../../hooks/useIsMobile"

type CardProps = {
    icon: ReactNode;
    title: string;
    info: string;
    isDark: boolean;
}

const Card = ({icon, title, info, isDark}: CardProps) => {

    const isMobile = useIsMobile();

    return (        
        <div className={`${isDark? "" : ""}
            ${isMobile? "w-[152px] h-[240px]" : "flex-1"}
            flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)] 
            p-[calc(0.4vw+0.6rem)] rounded-lg border border-[var(--border-color)]`}>
            {icon} 
            <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} font-semibold text-center`}>{title}</span>
            <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} text-center`}>{info}</span>
        </div>
    )
}

export default Card