
import { useSlidingUnderlineAnimation } from "@/hooks/use-tabs"
import { List } from "../list/list"

interface ITabActorDetails {
    tabs: string[]
    tabActive: string
    handleTabChange: (tab: string) => void

}

export const TabActorDetails = ({tabs, handleTabChange, tabActive}: ITabActorDetails) => {

    const {containerRef,underlineStyle} = useSlidingUnderlineAnimation(tabs, tabActive)

    return <List
        ref={containerRef}
        className="relative flex "
    >
        {tabs.map((tab) => (
            <li key={tab} className="w-[150px] text-center">
                <button
                    onClick={() => handleTabChange(tab)}
                    className={`relative w-full cursor-pointer pb-3 text-lg font-semibold transition-colors duration-300 ${tabActive === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    {tab}
                </button>
               
            </li>
        ))}


        <span
            className="absolute bottom-0 h-[4px] rounded-full bg-gradient-to-r from-transparent via-blue-600 to-transparent blur-[1px] transition-all duration-300"
            style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
            }}
        />
    </List>
}