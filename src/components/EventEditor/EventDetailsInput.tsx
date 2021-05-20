import React, { ChangeEventHandler } from 'react'
import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
})
import 'easymde/dist/easymde.min.css'
import { EventActionInterface } from '../../types'

interface EventDetailsProps {
    value: string
    handleChange: any
}

export const EventDetailsInput = ({
    value,
    handleChange,
}: EventDetailsProps) => {
    return (
        <div>
            <SimpleMDE onChange={handleChange} value={value} />
        </div>
    )
}
