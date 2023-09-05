'use client'

import { useState, useEffect } from 'react'


function useWindowSize() {

    const [size, setSize] = useState(() => {
        if (typeof window !== undefined) {
            return {
                height: window.innerHeight,
                width: window.innerWidth
            }
        } else {
            return  {
                height: 0,
                width: 0
            }
        }
    })

    console.log("size: ", size)

    const updateWindowSize = () => {
        if (typeof window !== undefined) {
            setSize({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }
    }

    const isLessThan = (value: number): boolean => {
        return value < size.width
    }

    const isBiggerThan = (value: number): boolean => {
        return value > size.width
    }

    useEffect(() => {
        if (typeof window !== undefined) {
            window.addEventListener('resize', updateWindowSize)
    
            return () => window.removeEventListener('resize', updateWindowSize)
        }
    }, [])


    return {
        size,
        isBiggerThan,
        isLessThan
    }
}

export { useWindowSize }