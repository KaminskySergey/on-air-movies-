import { Footer } from "@/components/ui/footer/footer";
import { Header } from "@/components/ui/header/header";
import { Hero } from "@/components/hero/hero";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <Hero />
            <main >
               
                {children}
            </main>
            <Footer />
        </>
    );
}
