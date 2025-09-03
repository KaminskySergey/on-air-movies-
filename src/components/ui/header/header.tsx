"use client"
import Image from "next/image"
import { Container } from "../container"

import { Navigation } from "./navigation"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/utils"
import Link from "next/link"

export const Header = () => {

    const pathname = usePathname();

    const isMainPage = ["/", "/movies", "/series",].includes(pathname)

    return <header className={cn(" w-full z-50  py-[8px]  md:py-[16px] lg:py-[16px] border-b-1 border-gray-800", {
        "bg-transparent absolute top-0 left-0": isMainPage,
        "relative bg-black": !isMainPage
    })}>
        <Container className="flex items-center justify-between">
            <Link href={"/"}>
                <div className="relative w-[80px] h-[24px] md:w-[96px] md:h-[40px] ">
                    <Image
                        src="/onair-logo.svg"
                        alt="logo"
                        fill
                        className="object-contain"
                        priority
                        unoptimized
                    />
                </div>
            </Link>
            <Navigation />
        </Container>
    </header>
}