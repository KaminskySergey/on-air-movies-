import { footerImages } from "@/const/footer-image"
import Image from "next/image"
import { List } from "../list/list"

export const FooterLife = () => {
    return <List className="grid grid-cols-2 grid-rows-2 gap-3">
    {
        footerImages.map((el, idx) => (
            <li key={idx}>
                <div className="relative w-full border border-blue-500 aspect-square rounded-lg overflow-hidden">
                    <Image
                        src={`/footer/${el.img}`}
                        alt={el.name}
                        fill
                        sizes="48"
                        className="object-cover"
                    />
                </div>
            </li>
        ))
    }
</List>
}