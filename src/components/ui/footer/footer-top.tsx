import { FooterAboutMe } from "./footer-about-me"
// import { FooterLife } from "./footer-life"
import { TitleFooter } from "./footer-title"
import SocialList from "./social-media"

export const FooterTop = () => {
    return <div className="flex flex-col md:flex-row md:justify-between md:flex-nowrap gap-8 md:gap-4">
        <div className="w-full flex flex-col  gap-8 ">
            <TitleFooter title="About me" />
            <FooterAboutMe />
        </div>
        <div className="w-full flex flex-col items-end gap-8  ">
            <TitleFooter title="Contact me" />
            <SocialList />
        </div>
        {/* <div className="w-full flex flex-col gap-8 md:w-[1/3]">
            <TitleFooter title="My life" />
            <FooterLife />
        </div> */}
        </div>
    
}