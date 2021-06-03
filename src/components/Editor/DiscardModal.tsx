import { Button } from '../Common/Button';

interface DiscardModal {
    children?: React.ReactNode;
    title: string;
    closeHandler: React.MouseEventHandler<HTMLButtonElement>;
    confirmHandler: () => void;
    loadingOverlay?: React.ReactNode;
    position?: { x: number; y: number };
}

export function DiscardModal({
    children = null,
    title,
    closeHandler,
    confirmHandler,
    loadingOverlay = null,
    position,
}: DiscardModal) {
    const top = position ? `${position.y - 100}px` : '25%';
    return (
        <div className="absolute top-0 h-full w-full z-10">
            <div
                className="fixed left-1/2"
                style={{ transform: 'translateX(-50%)', top: top }}
            >
                <div className="bg-gray-300 bg-opacity-80 rounded-md w-500 mx-auto shadow-md overflow-hidden">
                    {loadingOverlay}
                    <div className="relative py-4 mx-2 justify-items-center">
                        <div className="text-center text-3xl">{title}</div>
                    </div>
                    {children}
                    <div className="flex flex-row justify-center mb-6">
                        <Button
                            name="Confirm"
                            color="red"
                            onClick={confirmHandler}
                        />
                        <Button
                            name="Cancel"
                            color="blue"
                            onClick={closeHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
