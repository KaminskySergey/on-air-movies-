import { useState } from "react"

export const useToggle = () => {
    const [isToggle, setIsToggle] = useState(false)

    const handleToggle = () => {
        setIsToggle(pS => !pS)
    }

    return {
        isToggle,
        handleToggle,
        setIsToggle
    }
}