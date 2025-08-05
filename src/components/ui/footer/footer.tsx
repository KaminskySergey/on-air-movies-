import { Container } from "../container";
import { FooterTop } from "./footer-top";
import { FooterBottom } from "./footer-bottom";


export function Footer() {
    return <footer className="bg-[#040404] py-12">
        <Container className="flex flex-col">
            <FooterTop />
            <FooterBottom />
        </Container>
    </footer>
}
