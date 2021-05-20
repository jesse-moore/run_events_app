import React, { useEffect, useState } from 'react'
import { EventInterface } from '../../types'

import { Hero } from '../Event/Hero'
import { EventDetails } from '../Event/EventDetails'

export const PreviewEvent = () => {
    const [event, setEvent]: [
        EventInterface | null,
        React.Dispatch<React.SetStateAction<null>>
    ] = useState(null)

    useEffect(() => {
        const init = () => {
            try {
                const data = localStorage.getItem('eventState')
                if (data) {
                    const localState = JSON.parse(data)
                    setEvent(localState)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        init()
        window.addEventListener('storage', init, true)
        return () => {
            window.removeEventListener('storage', init, true)
        }
    }, [])
    if (!event) return null
    const eventState = event as unknown as EventInterface
    const { name, date, heroImg, address, city, state, eventDetails } =
        eventState
    return (
        <div>
            <div className="mt-4 mx-4">
                <Hero {...{ date, name, heroImg, address, city, state }} />
                <EventDetails eventDetails={eventDetails} />
            </div>
        </div>
    )
}
