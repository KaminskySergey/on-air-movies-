import { useEffect, useRef, useState } from "react";

export const useSlidingUnderlineAnimation = (array: string[], tab: string) => {
    const containerRef = useRef<HTMLUListElement>(null);
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  
    useEffect(() => {
      if (!containerRef.current) return;
  
      const activeIndex = array.indexOf(tab);
      const buttons = containerRef.current.querySelectorAll('button');
  
      if (buttons.length === 0) return;
  
      const activeButton = buttons[activeIndex] as HTMLElement;
      if (!activeButton) return;
  
      const left = activeButton.offsetLeft;
      const width = activeButton.offsetWidth;
  
      setUnderlineStyle({ left, width });
    }, [tab, array]);

    return {
        containerRef,
        underlineStyle

    }
}