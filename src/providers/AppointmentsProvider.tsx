"use client"

import { createContext, useState } from 'react'
import { ConfirmAppointmentService } from '@/api/services'



interface AppointmentsContextInterface {
    confirmAppointment: (appointmentId: string) => Promise<void>
    isConfirmingAppointment: boolean
    appointmentConfirmationSuccess: boolean
    appointmentConfirmationFailure: boolean
}

const AppointmentsContext = createContext<AppointmentsContextInterface>({} as AppointmentsContextInterface)


const AppointmentsProvider = ({ children }: any) => {

    // loading states
    const [isConfirmingAppointment, setIsConfirmingAppointment] = useState(false)
    const [appointmentConfirmationSuccess, setAppointmentConfirmationSuccess] = useState(false)
    const [appointmentConfirmationFailure, setAppointmentConfirmationFailure] = useState(false)
    

    // appointments
    //const [appointments, setAppointments] = useState([])


    const confirmAppointment = async (appointmentId: string) => {
        
        console.log("appointmentId: ", appointmentId)

        setIsConfirmingAppointment(true)
        setTimeout(() => {
            ConfirmAppointmentService(appointmentId)
            .then(r => {
                console.log("appointment confirmed!", r)
                setAppointmentConfirmationFailure(false)
                setAppointmentConfirmationSuccess(true)
            })
            .catch(e => {
                console.error("e: ", e)
                setAppointmentConfirmationFailure(true)
                setAppointmentConfirmationSuccess(false)
            })
            .finally(() => {
                setIsConfirmingAppointment(false)
            })
        }, 3000)

    }

    

    return (
        <AppointmentsContext.Provider value={{
            confirmAppointment,
            isConfirmingAppointment,
            appointmentConfirmationSuccess,
            appointmentConfirmationFailure
        }}>

            {children}

        </AppointmentsContext.Provider>
    )
}

export default AppointmentsProvider
export { AppointmentsContext }