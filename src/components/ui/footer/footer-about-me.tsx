import Image from "next/image"

export const FooterAboutMe = () => {
    return <div className="flex items-center gap-5">
    <div className="relative w-[72px] h-[72px] border-2 border-blue-500 bg-gray-700 rounded-full flex items-center overflow-hidden justify-center ">
        <Image
            src={"/avatar.jpg"}
            fill
            sizes="64px"
            alt="avatar"
            className="object-cover"
        />
    </div>
    <div className="w-[250px]">
        <p className=" text-sm text-white">
            Hi! I’m <span className="font-semibold underline">Serhii Kaminskyi</span>, a Fullstack-Deweloper learning to build awesome movie websites. This project is for practice only.
        </p>

    </div>
</div>
}