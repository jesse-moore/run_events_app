import React, { ReactEventHandler } from 'react'
import { Button, ButtonProps } from './Button'

interface LinkProps {
    href?: string
    onClick?: ReactEventHandler
}

type ButtonLinkProps = LinkProps & ButtonProps

export const ButtonLink = React.forwardRef(
    (
        { href, onClick, ...props }: ButtonLinkProps,
        ref: React.LegacyRef<HTMLAnchorElement>
    ) => {
        return (
            <a href={href} onClick={onClick} ref={ref}>
                <Button {...props} />
            </a>
        )
    }
)
