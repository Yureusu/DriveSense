import useIsMobile from "../../hooks/useIsMobile"

type SidenavCardProps = {
    icon: string;
    title: string;
}

export const SidenavCard = ({icon, title}: SidenavCardProps) => {

    const isMobile = useIsMobile();

    return (
        <div className={`${isMobile? "p-[calc(0.4vw+0.6rem)]" : ""} flex flex-row items-center justify-start gap-[calc(0.3vw+0.4rem)] w-full`}>
            <i className={`${icon} text-[calc(0.6vw+1rem)]`}></i>
            <span className={`${isMobile? "text-[calc(0.4vw+0.7rem)]" : "text-[calc(0.4vw+0.6rem)]"} hovered`}>{title}</span>
        </div>
    )
}
