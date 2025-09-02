'use client'

import { useState } from "react";

interface IBiography {
    text: string
}

export function Biography({ text }: IBiography) {
    const [expanded, setExpanded] = useState(false);

    const toggle = () => setExpanded(!expanded);

    return (
        <div className="relative pb-6 ">
            <h3 className="text-lg font-semibold mb-2">Biography</h3>
            <div
                className={`transition-all duration-300 ${expanded ? "max-h-60 overflow-y-auto pr-2 custom-scrollbar" : "line-clamp-7"
                    }`}
            >
                <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {text || "No biography available."}
                </p>
            </div>

            {text && text.length > 400 && (
                <button
                    onClick={toggle}
                    className="text-blue-400 cursor-pointer underline hover:text-blue-300 text-sm font-medium  absolute bottom-2 right-0"
                >
                    {expanded ? "Collapse" : "Read more"}
                </button>
            )}
        </div>
    );
}
