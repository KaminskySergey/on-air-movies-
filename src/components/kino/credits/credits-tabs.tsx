import { List } from "@/components/ui/list/list"
import { ICredits } from "@/types/actors"
import { cn } from "@/utils/utils"

interface ICreditsSort {
    credits: ICredits
    setActiveTab: (value: string) => void
    activeTab: string
}

export const CreditsTabs = ({ credits, setActiveTab, activeTab}: ICreditsSort) => {
  
    const tabs = [
        { id: "cast", label: "Cast", count: credits.cast.length },
        { id: "crew", label: "Crew", count: credits.crew.length},
    ];

    return (
        <div className="flex justify-center">
                    <List className="flex  bg-gray-800 rounded-lg py-1 px-1">
                        {tabs.map(tab => (
                            <li key={tab.id}>
                                <button
                                    key={tab.id}
                                    className={cn("px-4 py-2 cursor-pointer rounded-lg transition-colors duration-300 ease-linear text-white font-medium text-[12px] sm:text-base whitespace-nowrap ", {
                                        "bg-blue-700 rounded-lg ": activeTab === tab.id,
                                        "hover:bg-gray-700": activeTab !== tab.id,
                                    })}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label} {tab.count !== undefined && <span className="text-gray-400">({tab.count})</span>}
                                </button>
                            </li>
                        ))}
                    </List>
                </div>
    )
}