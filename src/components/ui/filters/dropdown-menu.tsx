'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { ArrDropdownIcon } from "../svg/arr-dropdown";
import { List } from "../list/list";
import { cn } from "@/utils/utils";

interface IDropdownMenuProps {
    itemsMenu: {
        name: string, count: number
    }[]

    queryKey: string
    defaultValue: string
}

export default function DropdownMenu({ itemsMenu, queryKey, defaultValue }: IDropdownMenuProps) {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get(queryKey);

    const toggleMenu = () => setIsVisible(!isVisible);
    const closeMenu = () => setIsVisible(false);

    const totalCount = useMemo(() => itemsMenu.reduce((acc, i) => acc + i.count, 0), [itemsMenu]);

    const menuItems = useMemo(() => [{ name: defaultValue, count: 0 }, ...itemsMenu], [defaultValue, itemsMenu]);

    const createQueryString = useCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value !== defaultValue) {
                params.set(queryKey, value);
            } else {
                params.delete(queryKey);
            }
            return params.toString();
        },
        [searchParams, queryKey, defaultValue]
    );

    const handleSelect = useCallback(
        (value: string) => {
            const qs = createQueryString(value);
            router.push(pathname + (qs ? `?${qs}` : ""));
            closeMenu();
        },
        [createQueryString, router, pathname]
    );
    // const displayName = currentFilter || queryKey;
    const displayName = currentFilter || defaultValue;

    return (
        <div className="relative inline-block">
            {isVisible && <div className="fixed inset-0 z-10" onClick={closeMenu} />}

            <button
                type="button"
                onClick={toggleMenu}
                className={cn(
                    "relative z-20 cursor-pointer font-bold inline-flex items-center justify-between px-3 py-1 rounded-md transition-all duration-500",
                    "text-gray-600  hover:text-blue-900 focus:outline-none focus:text-blue-600",
                    "sm:px-4 sm:py-2 sm:text-base"
                )}
            >
                <span className="flex-shrink-0">{displayName}</span>
                <ArrDropdownIcon isVisible={isVisible} />
            </button>

            <div
                className={cn(
                    "absolute z-20 pt-2 transform origin-top transition-all duration-300",
                    isVisible
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
                )}
            >
                <div className="relative rounded-lg overflow-hidden shadow-xl min-w-[200px] sm:min-w-[250px]">
                    {/* Arrow */}
                    <div className="absolute top-0 w-4 h-4 origin-center transform rotate-45 translate-x-5 -translate-y-2 rounded-sm pointer-events-none bg-white" />

                    {/* Items */}
                    <List className="relative flex flex-col">
                        {menuItems.map((item) => {
                            const displayCount = item.name === defaultValue ? totalCount : item.count;
                            const isActive =
                                (!currentFilter && item.name === defaultValue) || currentFilter === item.name;
                            return (
                                <li key={item.name}>
                                    <button
                                        onClick={() => handleSelect(item.name)}
                                        className={cn(
                                            "block w-full cursor-pointer text-left px-4 py-2 font-medium transition duration-300",
                                            isActive
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-700 text-gray-200 hover:bg-gray-600",
                                            "sm:px-5 sm:py-2 sm:text-sm"
                                        )}
                                    >
                                        <div className="flex justify-between">
                                            <span>{item.name}</span>
                                            <span className="text-gray-400">{displayCount}</span>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </List>
                </div>
            </div>
        </div>
    );
}