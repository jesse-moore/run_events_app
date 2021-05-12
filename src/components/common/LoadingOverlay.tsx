interface LoadingOverlayProps {
    children: React.ReactNode
}

export const LoadingOverlay = ({ children }: LoadingOverlayProps) => {
    return (
        <div className="absolute w-full h-full flex flex-col justify-center items-center bg-gray-400 bg-opacity-75 z-10">
            {children}
        </div>
    )
}
