import { IMovie } from "@/types/popular-movies"
import { KinoItem } from "./kino-item"
import { List } from "./list"

interface IKinoList {
    items: IMovie[]
}

export const KinoList = ({ items }: IKinoList) => {
    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col relative items-center justify-center py-32 text-center text-gray-400">
                <p className="text-xl mb-4">Nothing found 😔</p>
                <p>Try changing your search or filters.</p>
            </div>
        );
    }

    return (
        <List className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((el) => (
                <KinoItem key={el.id} el={el} />
            ))}
        </List>
    );
}