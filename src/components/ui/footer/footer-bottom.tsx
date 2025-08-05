import Link from "next/link"

export const FooterBottom = () => {
    return <>
        <hr className="my-8  border-gray-400"></hr>
        <div className="flex items-center justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 py-1">
                    <p >© 2025 MovieApp (OnAir). All rights reserved.</p>
                    <Link href={'https://github.com/KaminskySergey'} target="blank" className="underline">Serhii Kaminskyi</Link>
                </div>
            </div>

        </div>
    </>
}