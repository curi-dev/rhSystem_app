import { DayValue } from "react-modern-calendar-datepicker"


export interface IAppointment {
    id: string // candidateId
    email: string
    splitted_date: DayValue
    slot: number
}

