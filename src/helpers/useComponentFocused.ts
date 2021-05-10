import { useState, useEffect, useRef } from 'react';

export function useComponentFocused(initialIsVisible: boolean) {
    const [isComponentFocused, setIsComponentFocused] = useState(
        initialIsVisible
    );
    const ref = useRef(null);

    const handleClickOutside = (event: any) => {
        const element = ref.current;
        if (!element) return;
        // @ts-ignore
        if (element && !element.contains(event.target)) {
            setIsComponentFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return {
        ref,
        isComponentFocused,
        setIsComponentFocused,
    };
}
