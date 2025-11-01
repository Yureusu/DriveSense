
type PopupProps = {
    closePopup: () => void;
    children: React.ReactNode;
}

export const Popup = ({ closePopup, children }: PopupProps) => {
    
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-4">
            <div className="relative bg-[var(--light-color)] p-6 rounded-xl rounded-tr-none flex flex-col items-center justify-center">
                <i className='fa-solid fa-circle-xmark text-[calc(1vw+1.2rem)] text-[var(--blue-color)] hovered
                    flex flex-row items-center justify-center absolute top-[-10px] right-[-14px] cursor-pointer'
                    onClick={closePopup}></i> 
                {children}
            </div>
        </div>
    )
}
