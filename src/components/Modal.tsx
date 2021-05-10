export function Modal({ children }: { children: JSX.Element[] | JSX.Element }) {
    return (
        <div className="absolute top-0 h-full w-full ">
            <div className="min-h-full blur w-full bg-gray-800 bg-opacity-60" />
            <div className="fixed top-1/4 w-full">
                <div className="bg-gray-100 bg-opacity-80 px-8 pb-8 pt-4 rounded-md w-500 mx-auto shadow-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
