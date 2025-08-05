interface ICrossIcon {
    className?: string
}

export default function CrossIcon({className}: ICrossIcon) {
    return <svg   className={className} width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 1L1 13M1 1L13 13" stroke="#EFEDE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
}
