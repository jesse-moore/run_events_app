import { ReactEventHandler } from 'react'

export interface ButtonProps {
    name: string
    type?: string
    onClick?: ReactEventHandler
}

export const Button = ({ name, type, onClick }: ButtonProps) => {
    let hoverBG: string
    let bg: string
    switch (type) {
        case 'primary':
            hoverBG = 'bg-blueGray-200'
            bg = 'bg-blueGray-300'
            break
        case 'orange':
            hoverBG = 'bg-orange-400'
            bg = 'bg-orange-300'
            break
        case 'red':
            hoverBG = 'bg-red-500'
            bg = 'bg-red-400'
            break
        case 'blue':
            hoverBG = 'bg-blue-400'
            bg = 'bg-blue-300'
            break
        case 'green':
            hoverBG = 'bg-green-400'
            bg = 'bg-green-300'
            break
        default:
            hoverBG = 'bg-blueGray-200'
            bg = 'transparent'
            break
    }
    return (
        <button
            className={`${bg} transition-colors duration-200 px-5 py-2 rounded-md mx-4 font-medium text-base hover:${hoverBG} focus:outline-none`}
            onClick={onClick}
        >
            {name}
        </button>
    )
}
