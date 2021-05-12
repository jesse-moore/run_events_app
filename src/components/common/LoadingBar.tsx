import React from 'react'

export const LoadingBar = () => {
    return (
        <div className="relative w-60 mx-auto overflow-hidden h-5 rounded mt-1">
            <div className="loading-bar-bg absolute -top-32 animate-slide-repeat-sm w-60 h-60 left-0"></div>
            <div className="relative shadow-inner-full h-full w-full"></div>
        </div>
    )
}
