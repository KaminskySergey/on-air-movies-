"use client"
import Image from "next/image"
import { Container } from "../container"

import { Navigation } from "./navigation"

export const Header = () => {
 
    return <header className="bg-transparent absolute top-0 left-0 w-full z-50  py-[8px]  md:py-[16px] lg:py-[16px] border-b-1 border-gray-800">
        <Container className="flex items-center justify-between">
            <div className="relative w-[80px] h-[24px] md:w-[96px] md:h-[40px] ">
                <Image
                    src="/onair-logo.svg"
                    alt="logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <Navigation />
        </Container>
    </header>
}