
type SidenavCardProps = {
    icon: string;
    title: string;
}

export const SidenavCard = ({icon, title}: SidenavCardProps) => {
    return (
        <>
            <i className={`${icon} text-[calc(0.6vw+1rem)]`}></i>
            <span className="text-[calc(0.4vw+0.6rem)] hovered">{title}</span>
        </>
    )
}
