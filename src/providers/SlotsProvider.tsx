"use client"

import { createContext, useState } from 'react'
import { fetchAllSlotsService, GetAvaiableSlotService } from '@/api/services'
import { DayValue } from 'react-modern-calendar-datepicker';


interface SlotsContextInterface {
    slots: any[]; avaiableSlots: any[]; 
    fetchAvailableSlots: (splittedDate: DayValue) => void; fetchSlots: () => void; 
    isLoadingSlots: boolean; isLoadingAvaiableSlots: boolean
}

const SlotsContext = createContext<SlotsContextInterface>({} as SlotsContextInterface)


const SlotsProvider = ({ children }: any) => {


    const [isLoadingSlots, setIsLoadingSlots] = useState(false)
    const [isLoadingAvaiableSlots, setIsLoadingAvaiableSlots] = useState(false)
    const [slots, setSlots] = useState([])
    const [avaiableSlots, setAvaiableSlots] = useState([])
    
    console.log("slots: ", slots)
    console.log("avaiableSlots: ", avaiableSlots)

    const fetchSlots = async () => {
        
        console.log("fetching slots")

        setIsLoadingSlots(true)
        fetchAllSlotsService()
        .then(r => {
            setSlots(r) // slots already
        })
        .catch(e => {
            console.error("e: ", e)
        })
        .finally(() => {
            setIsLoadingSlots(false)
        })
    }

    const fetchAvailableSlots = (splittedDate: DayValue) => {
        
        console.log("fetching available slots")

        setIsLoadingAvaiableSlots(true)
        GetAvaiableSlotService(splittedDate)
        .then(r => {
            setAvaiableSlots(r) 
        })
        .catch(e => {
            console.error("e: ", e)
        })
        .finally(() => {
            setIsLoadingAvaiableSlots(false)
        })
    }

    return (
        <SlotsContext.Provider value={{
            slots,
            avaiableSlots,
            fetchSlots,
            fetchAvailableSlots,
            isLoadingSlots,
            isLoadingAvaiableSlots
        }}>

            {children}

        </SlotsContext.Provider>
    )
}

export default SlotsProvider
export { SlotsContext }