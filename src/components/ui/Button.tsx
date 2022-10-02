import clsx from 'clsx'
import React, { forwardRef } from 'react'

type ButtonColor = 'green' | 'gray' | 'red'

type ButtonType = 'button' | 'submit'

type Props = {
    children: React.ReactNode
    type?: ButtonType
    color?: ButtonColor
    outline?: boolean
    disabled?: boolean
    size?: string
    onClick?: () => void
}

const classes = {
    base: 'focus:outline-none transition ease-in-out duration-300 rounded-full shadow-md',
    baseSize: 'py-1 px-4',

    disabled: 'opacity-50 cursor-not-allowed',

    outline: {
        base: 'bg-white hover:text-white hover:border-transparen ',
        color: {
            green: 'hover:bg-green-600 text-green-700 border border-green-600',
            gray: ' hover:bg-gray-600 text-gray-700 border border-gray-600',
            red: 'hover:bg-red-600 text-red-700 border border-red-600 ',
        },
    },
    fill: {
        base: 'focus:ring-2 text-white focus:ring-opacity-50',
        color: {
            green: 'bg-green-600 hover:bg-green-800 focus:ring-green-600',
            gray: 'bg-gray-600 hover:bg-gray-800 focus:ring-gray-600',
            red: 'bg-red-600 hover:bg-red-800 focus:ring-red-600',
        },
    },
}

const Button = forwardRef<HTMLButtonElement, Props>(
    (
        {
            children,
            color = 'green',
            disabled = false,
            type = 'button',
            outline = false,
            size,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled}
                className={clsx(
                    classes.base,
                    size || classes.baseSize,
                    disabled && classes.disabled,
                    outline ? classes.outline.base : classes.fill.base,
                    outline
                        ? classes.outline.color[color]
                        : classes.fill.color[color],
                )}
                {...props}
            >
                {children}
            </button>
        )
    },
)

export default Button
