'use client'

interface IArrDropdown {
    isVisible: boolean
}

export function ArrDropdownIcon({isVisible}: IArrDropdown) {
    return <svg
    fill="currentColor"
    viewBox="0 0 20 20"
    className={`flex-shrink-0 w-5 h-5 ml-1 transition-transform duration-300 ${isVisible ? "rotate-180" : ""}`}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    />
  </svg>
}
