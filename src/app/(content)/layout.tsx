import { Footer } from "@/components/ui/footer/footer";
import { Header } from "@/components/ui/header/header"


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}