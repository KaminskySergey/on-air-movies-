import {useState, useEffect} from 'react'

export function useResponsiveCount(breakpoints = { sm: 768, md: 1024 }, values = { sm: 3, md: 5, lg: 9 }) {
    const [count, setCount] = useState(values.lg); 

    useEffect(() => {
        const updateCount = () => {
            const w = window.innerWidth;
            if (w < breakpoints.sm) {
                setCount(values.sm);
            } else if (w < breakpoints.md) {
                setCount(values.md);
            } else {
                setCount(values.lg);
            }
        };

        updateCount();
        window.addEventListener('resize', updateCount);
        return () => window.removeEventListener('resize', updateCount);
    }, [breakpoints, values]);

    return count;
}