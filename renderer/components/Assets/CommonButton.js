import React from 'react'

export default function CommonButton({ classes, label, action, disabled }) {
    return (
        <button
            className={`border-2 border-white/80  w-[200px] h-[50px] text-white font-semibold ${classes} ${!disabled
                ? 'hover:bg-white/80 hover:text-black'
                : 'border-white/25 text-white/25 cursor-not-allowed'
            }`}
            onClick={(e) => action(e)}
            disabled={disabled}
        >
            {label}
        </button>
    )
}
