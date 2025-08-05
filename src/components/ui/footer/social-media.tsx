import Link from "next/link";
import { InstargamIcon } from "../svg/instargam";
import { GitHubIcon } from "../svg/git-hub";
import { GmailIcon } from "../svg/gmail";
import { LinkedInIcon } from "../svg/linkedIn";
import { List } from "../list/list";

const socialLinks = [
  {
    href: "https://www.instagram.com/serhii60101/profilecard/?igsh=OWU4Yjd3Zjd0MmN2",
    Icon: InstargamIcon,
  },
  {
    href: "https://github.com/KaminskySergey",
    Icon: GitHubIcon,
  },
  {
    href: "mailto:serhiikama@gmail.com", 
    Icon: GmailIcon,
  },
  {
    href: "https://www.linkedin.com/in/serhii-kaminskyi/",
    Icon: LinkedInIcon,
  },
];

export default function SocialList() {
  return (
    <List className="flex gap-2">
      {socialLinks.map(({ href, Icon }, index) => (
        <li key={index} className="w-8 md:w-12 h-8 md:h-12">
          <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block w-full h-full transition-transform duration-200 hover:scale-110">
            
              <Icon />
            
          </Link>
        </li>
      ))}
    </List>
  );
}