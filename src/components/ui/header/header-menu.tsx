"use client"
import { headerNavigation } from "@/configs/nav-link"
import { cn } from "@/utils/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface IHeaderMenu {
  vertical?: boolean
  onClickItem?: () => void

}

export const HeaderMenu = ({ vertical = false, onClickItem }: IHeaderMenu) => {
  const pathname = usePathname()

  return (
    <nav>
      <ul
        className={cn('text-white gap-8', {
          'flex flex-col items-center': vertical,
          'flex': !vertical,
        })}
      >
        {headerNavigation.map((el) => {
          const isActive =
            pathname === el.href ||
            (el.href !== '/' && pathname.startsWith(el.href + '/')) ||
            (el.href === '/' && pathname === '/');

          return (
            <li key={el.href}>
              <Link
                href={el.href}
                className={cn('block', {
                  'pb-1 border-b-2 border-blue-500': isActive,
                })}
                onClick={onClickItem}
              >
                {el.link}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}