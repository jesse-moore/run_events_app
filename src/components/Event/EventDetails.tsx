import React from 'react'
import DOMPurify from 'dompurify'
import Markdown from 'markdown-to-jsx'

interface EventDetailsProps {
    eventDetails: string
}

export const EventDetails = ({ eventDetails }: EventDetailsProps) => {
    const eventDetailsSanitized = DOMPurify.sanitize(eventDetails)
    return (
        <div className="event-details relative mx-auto max-w-4xl mt-8">
            <Markdown children={eventDetailsSanitized} />
        </div>
    )
}

export default EventDetails