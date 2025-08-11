import { HeroHome } from "@/components/home/home-hero/hero-home";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeroHome />
            <main>{children}</main>
        </>
    );
}