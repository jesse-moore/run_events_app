import Link from 'next/link'
import { Button } from './Common/Button'
import { ButtonLink } from './Common/ButtonLink'

export const Hero = () => {
    const opacity = 0.6
    const rgb = 50
    const overlay = `rgba(${rgb}, ${rgb}, ${rgb}, ${opacity})`
    return (
        <div
            className="h-500 flex flex-col relative"
            style={{
                background: `linear-gradient(${overlay}, ${overlay}), url(images/back_600.jpg) top fixed no-repeat`,
            }}
        >
            <div className="mt-8 text-center">
                <div className="text-white text-4xl font-medium p-2">
                    Headline Text
                </div>
                <div className="text-white text-2xl">
                    Subtitle text goes here
                </div>
            </div>
            <div
                className="text-xl absolute top-1/2"
                style={{ transform: 'translate(20%, -50%)' }}
            >
                <Link href="/create_event">
                    <ButtonLink name="Create Event" type="primary" />
                </Link>
                <Button name="See Demo" type="primary" />
            </div>
        </div>
    )
}
