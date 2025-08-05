interface ITitleFooter {
    title: string
}

export const TitleFooter = ({title}: ITitleFooter) => {
    return <h3 className="font-bold text-2xl md:text-4xl text-white dark:text-gray-100">{title}</h3>
}