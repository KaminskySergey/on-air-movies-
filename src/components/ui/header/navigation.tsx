'use client'
import { useState } from "react"
import { cn } from "@/utils/utils"
import { HeaderMenu } from "./header-menu"
import { BurgerIcon } from "../svg/burger"
import { CloseIcon } from "../svg/close"

export const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false)

   
    const handleCloseMenu = () => setMenuOpen(false)

    return (
        <>
            
            <div className="hidden md:block">
                <HeaderMenu />
            </div>

            
            <button
                className="block  md:hidden p-2 text-white"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                
            >
                <BurgerIcon />
            </button>

            <div
                className={cn(
                    'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300',
                    {
                        'opacity-100 pointer-events-auto': menuOpen,
                        'opacity-0 pointer-events-none': !menuOpen,
                    }
                )}
                onClick={() => setMenuOpen(false)}
            ></div>

            <aside
                className={cn(
                    'fixed top-0 left-0 h-full text-center p-4 pt-[64px] w-full bg-black/70 text-white z-50 transform transition-transform duration-300',
                    {
                        'translate-x-0': menuOpen,
                        '-translate-x-full': !menuOpen,
                    }
                )}
            >
                <button
                    className="absolute top-[16px] right-[28px] text-white text-2xl"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                >
                    <CloseIcon />
                </button>
                <HeaderMenu vertical onClickItem={handleCloseMenu} />
            </aside>
        </>
    )
}