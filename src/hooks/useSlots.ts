import { SlotsContext } from '@/providers/SlotsProvider'
import { useContext } from 'react'


const useSlots = () => {
    const context = useContext(SlotsContext)

    if (!context) {
        throw new Error("hook must be used within a provider")
    }

    const { avaiableSlots, fetchAvailableSlots, fetchSlots, slots, isLoadingSlots, isLoadingAvaiableSlots } = context

    return {
        avaiableSlots,
        fetchAvailableSlots,
        fetchSlots,
        slots,
        isLoadingSlots,
        isLoadingAvaiableSlots
    }
}


export { useSlots }