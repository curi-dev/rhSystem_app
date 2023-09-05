import React, { useState, useEffect } from 'react'


function useWindowSize() {

    const [size, setSize] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    console.log("size: ", size)

    const updateWindowSize = () => {
        setSize({
            height: window.innerHeight,
            width: window.innerWidth
        })
    }

    const isLessThan = (value: number): boolean => {
        return value < size.width
    }

    const isBiggerThan = (value: number): boolean => {
        return value > size.width
    }

    useEffect(() => {
        window.addEventListener('resize', updateWindowSize)

        return () => window.removeEventListener('resize', updateWindowSize)
    }, [])


    return {
        size,
        isBiggerThan,
        isLessThan
    }
}

export { useWindowSize }