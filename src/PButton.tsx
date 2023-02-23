import { PropsWithChildren } from "react"

interface PButtonProps {
    className?: string
    disabled?: boolean
    onClick?: () => void
}

export const PButton = (props: PropsWithChildren<PButtonProps>) => {
    let className = "pbutton"

    if (props.className) {
        className += ` ${props.className}`
    }

    if (props.disabled) {
        className += " disabled"
    }

    const click = props.disabled ? undefined : props.onClick

    return (
        <div className={className} onClick={click}>
            {props.children}
        </div>
    )
}
