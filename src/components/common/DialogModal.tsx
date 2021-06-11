import { Button } from './Button';

interface ModalProps {
    children?: React.ReactNode;
    title: string;
    closeHandler: React.MouseEventHandler<HTMLDivElement>;
    confirmHandler: React.MouseEventHandler<HTMLDivElement>;
    loadingOverlay?: React.ReactNode;
}

export function DialogModal({
    children = null,
    title,
    closeHandler,
    confirmHandler,
    loadingOverlay = null,
}: ModalProps) {
    return (
        <div className="absolute top-0 h-full w-full z-10">
            <div className="min-h-full blur w-full bg-gray-800 bg-opacity-60" />
            <div className="fixed top-1/4 w-full">
                <div className="relative bg-gray-100 bg-opacity-80 rounded-md w-500 mx-auto shadow-md overflow-hidden">
                    {loadingOverlay}
                    <div className="relative py-4 mx-6 grid grid-cols-3 grid-rows-1 h-20 justify-items-center">
                        <div className="text-center text-3xl col-start-2 whitespace-nowrap">
                            {title}
                        </div>
                    </div>
                    {children}
                    <div className="flex flex-row justify-center mb-6">
                        <Button
                            name="Discard Changes"
                            color="red"
                            onClick={() => confirmHandler}
                        />
                        <Button
                            name="Cancel"
                            color="blue"
                            onClick={() => closeHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
