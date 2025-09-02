import Link from "next/link";
import { TitleLinie } from "../ui/title/title-linie";
import { WorksByDepartment } from "@/types/works";
import { useSearchParams } from "next/navigation";

interface IPeopleChronologyWorks {
    worksByDept: WorksByDepartment
}



export function PeopleChronologyWorks({ worksByDept }: IPeopleChronologyWorks) {

    const searchParams = useSearchParams();
    const departmentFilter = searchParams.get("department");

    const filteredEntries =
        !departmentFilter
            ? Object.entries(worksByDept)
            : Object.entries(worksByDept).filter(([dept]) => dept === departmentFilter);
    return (
        <div className="flex flex-col gap-8 w-full">
            {filteredEntries.map(([department, { grouped, withoutDate }], deptIndex) => (
                <div key={`${department}-${deptIndex}`}>
                    <TitleLinie title={department} className="pb-2" />

                    <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
                        {withoutDate.length > 0 && (
                            <div className="flex gap-4">
                                <div className="w-16 text-right text-gray-400 font-semibold shrink-0">—</div>
                                <ul className="flex-1 flex flex-col gap-2">
                                    {withoutDate.map((el, index) => (
                                        <li
                                            key={`${department}-${el.credit_id}-${el.release_date || el.first_air_date || "no-date"}-${deptIndex}-${index}`}
                                            className="flex flex-col border-b border-gray-700 pb-2 last:border-none"
                                        >
                                            <Link
                                                href={`/${el.type === "movie" ? "movies" : "series"}/${el.id}`}
                                                className="text-blue-400 hover:underline font-medium"
                                            >
                                                {el.title || el.name}
                                            </Link>
                                            <span className="text-gray-400 text-sm">
                                                {el.job === "Actor" ? `as ${el.character}` : el.job}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {Object.entries(grouped)
                            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                            .map(([year, items], yearIndex) => (
                                <div
                                    key={`${department}-year-${year}-${yearIndex}`}
                                    className="flex gap-4 pt-4 border-t border-gray-700 first:border-t-0"
                                >
                                    <div className="w-16 text-right text-gray-400 font-semibold shrink-0">{year}</div>
                                    <ul className="flex-1 flex flex-col gap-2">
                                        {items.map((el, index) => (
                                            <li
                                                key={`${department}-${el.credit_id}-${el.release_date || el.first_air_date || "no-date"}-${deptIndex}-${yearIndex}-${index}`}
                                                className="flex justify-between items-center border-b border-gray-700 pb-2 last:border-none"
                                            >
                                                <Link
                                                    href={`/${el.type === "movie" ? "movies" : "series"}/${el.id}`}
                                                    className="text-blue-400 hover:underline font-medium"
                                                >
                                                    {el.title || el.name}
                                                </Link>
                                                <span className="text-gray-400 text-sm">
                                                    {el.job === "Actor" ? `as ${el.character}` : el.job}
                                                </span>
                                                <div className="w- h-full p-2 rounded-lg bg-gray-700">
                                                    {el.type}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}