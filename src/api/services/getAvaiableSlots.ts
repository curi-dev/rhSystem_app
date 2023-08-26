import { DayValue } from "react-modern-calendar-datepicker"
import api from ".."

// "splitted_date": {
//     "day": 29,
//     "month": 8,
//     "year": 2023
// },
// "slot": 2


async function GetAvaiableSlotService(splittedDate: DayValue) {

    console.log("splittedDate: ", splittedDate)
   
    const response = await api.post("/slots/filter", { params: { splitted_date: splittedDate } })

    if (response.status === 200) {
        return response.data
    }

}


export { GetAvaiableSlotService }