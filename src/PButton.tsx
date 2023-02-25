import { PropsWithChildren } from "react"

type Colour = "green" | "red"

interface PButtonProps {
    className?: string
    colour?: Colour
    disabled?: boolean
    frozen?: boolean
    onClick?: () => void
}

export const PButton = (props: PropsWithChildren<PButtonProps>) => {
    let className = "pbutton"

    if (props.className) {
        className += ` ${props.className}`
    }

    if (props.colour) {
        className += ` ${props.colour}`
    }

    if (props.disabled) {
        className += " disabled"
    }

    const click = (props.frozen || props.disabled) ? undefined : props.onClick

    return (
        <div className={className} onClick={click}>
            {props.children}
        </div>
    )
}
