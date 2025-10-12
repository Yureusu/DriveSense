
type DashboardCardProps = {
    title: string;
    descrip: string;
    isDark: boolean;
}

function DashboardCard({title, descrip ,isDark}: DashboardCardProps) {

    return (
        <div className={`text-[var(--light-color)] bg-[var(--purple-color)]
            h-auto w-full flex flex-col items-start justify-center rounded-lg
            p-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]`}>
            <span className={`text-[calc(0.4vw+0.6rem)] cursor-pointer text-center`}>{title}</span>
            <span className="text-[calc(0.6vw+1.2rem)] cursor-pointer">{descrip}</span>
        </div>
    )
}

export default DashboardCard