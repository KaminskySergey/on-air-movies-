import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export const useCustomSearchParams = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const createQueryStringMultiple = useCallback(
        (name: string, values: string[]) => {
          const params = new URLSearchParams(searchParams.toString());
          if (values.length > 0) {
            params.set(name, values.join(","));
          } else {
            params.delete(name);
          }
          return params.toString();
        },
        [searchParams]
      );

    return {
        createQueryString,
        createQueryStringMultiple,
        router,
        pathname,
        searchParams
    }

}