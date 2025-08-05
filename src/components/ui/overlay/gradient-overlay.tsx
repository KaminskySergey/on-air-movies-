import { cn } from "@/utils/utils";

interface IGradientOverlay {
    className?: string
}

interface IGradientOverlay {
    position?: 'left' | 'right' | 'top' | 'bottom';
    className?: string;
}

export default function GradientOverlay({ position = 'left', className }: IGradientOverlay) {
    let gradientDirection = '';

    switch (position) {
        case 'left':
            gradientDirection = 'bg-gradient-to-r';
            break;
        case 'right':
            gradientDirection = 'bg-gradient-to-l';
            break;
        case 'top':
            gradientDirection = 'bg-gradient-to-b';
            break;
        case 'bottom':
            gradientDirection = 'bg-gradient-to-t';
            break;
    }

    return (
        <div
            className={cn(
                'absolute z-20',
                gradientDirection,
                position === 'left' || position === 'right' ? 'top-0 w-8 md:w-32 h-full' : 'left-0 w-full h-8 md:h-32',
                position === 'left' && 'left-0',
                position === 'right' && 'right-0',
                position === 'top' && 'top-0',
                position === 'bottom' && 'bottom-0',
                'from-black to-transparent',
                className
            )}
        />
    );
}