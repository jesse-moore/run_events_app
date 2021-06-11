import { useState } from 'react';

interface EditContainerProps {
    children: React.ReactNode;
    isModified?: boolean;
}

export const EditContainer = ({ children, isModified }: EditContainerProps) => {
    if (isModified) {
        return (
            <EditContainerWithModified>{children}</EditContainerWithModified>
        );
    } else {
        return (
            <EditContainerWithoutModified>
                {children}
            </EditContainerWithoutModified>
        );
    }
};

const EditContainerWithModified = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [hover, setHover] = useState(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="relative mx-auto w-max border border-orange-400 hover:border hover:border-gray-600">
                <div className="bg-orange-400 text-white absolute right-0 -top-6 px-2 bg-opacity-50">
                    Modified
                </div>
                {hover && (
                    <div className="absolute left-full h-full w-max flex items-center">
                        <button className="text-sm h-6 px-2 ml-2 transition-colors duration-200 rounded-md bg-orange-400 hover:bg-orange-500 text-black focus:outline-none">
                            Discard Changes
                        </button>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

const EditContainerWithoutModified = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <div className="relative mx-auto w-max border border-gray-300 hover:border hover:border-gray-600">
                {children}
            </div>
        </div>
    );
};
