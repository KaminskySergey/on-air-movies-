'use client'

import { ICredits } from "@/types/actors"
import { useState } from "react";
import { CreditsTabs } from "./credits-tabs";
import { CreditsList } from "./credits-list";

interface ICreditsCurrentKino {
    credits: ICredits
}

export function CreditsCurrentKino({ credits }: ICreditsCurrentKino) {
    const [activeTab, setActiveTab] = useState<string>("cast")
    const { cast, crew } = credits

    return (
        <div className="flex flex-col gap-5 sm:gap-7">
            <CreditsTabs credits={credits} setActiveTab={setActiveTab} activeTab={activeTab} />
            <div className="min-h-[550px]">
                {activeTab === "cast" && <CreditsList credits={cast} />}
                {activeTab === "crew" && <CreditsList credits={crew} />}
            </div>
        </div>
    );
}
