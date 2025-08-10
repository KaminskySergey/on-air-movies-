import { HeroHome } from "@/components/home/home-hero/hero-home";
import { Footer } from "@/components/ui/footer/footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* <Header /> */}
            <HeroHome />
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    );
}