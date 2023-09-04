import { slots_mock } from "../confirmed/slot_mocks"

export function GetMockedSlot(slotValue: string) {
       
    const selectedSlot = slots_mock.find(s => {                 
        return s.Value == String(slotValue)
    }) 

    return selectedSlot
}