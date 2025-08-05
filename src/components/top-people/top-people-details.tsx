'use client'

import { useState } from "react"
import { TabActorDetails } from "../ui/tab/tab-actor-details"
import { tabs } from "@/const/tabs"
import { TopActorDetailsInfo } from "./top-actor-details-info"
import { TopActorWorks } from "./top-actor-works"
import { cn } from "@/utils/utils"

interface ITopPeopleDetails {
    personId: number
}


export function TopPeopleDetails({ personId }: ITopPeopleDetails) {
    const [tabActive, setTabActive] = useState(tabs[0])
    const [prevTab, setPrevTab] = useState(tabs[0])
  
    const handleTabChange = (tab: string) => {
      if (tab !== tabActive) {
        setPrevTab(tabActive)
        setTabActive(tab)
      }
    }
  
    const translateX = (() => {
      if (tabActive === 'Details' && prevTab === 'Works') return 'translate-x-0'
      if (tabActive === 'Works' && prevTab === 'Details') return '-translate-x-1/2'
      if (tabActive === 'Details') return 'translate-x-0'
      return '-translate-x-1/2'
    })()
  
    return (
      <div className="w-[50%] h-[600px] p-6 bg-black/40 rounded-lg text-white space-y-4">
        <div className="h-full flex flex-col gap-5 overflow-hidden">
          <TabActorDetails tabs={tabs} handleTabChange={handleTabChange} tabActive={tabActive} />
  
          <div className="relative w-full h-full overflow-hidden">
            <div
              className={cn(
                'flex w-[200%] h-full transition-transform duration-500 ease-in-out',
                translateX
              )}
            >
              <div className="w-1/2 shrink-0 flex flex-col gap-3">
                <TopActorDetailsInfo personId={personId} />
              </div>
              <div className="w-1/2 shrink-0 ">
                <TopActorWorks personId={personId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }