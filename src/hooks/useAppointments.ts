import { AppointmentsContext } from '@/providers/AppointmentsProvider'
import { useContext } from 'react'


const useAppointments = () => {
    const context = useContext(AppointmentsContext)

    if (!context) {
        throw new Error("hook must be used within a provider")
    }

    const { 
        appointments,
        appointmentFetchingFailure,
        appointmentFetchingSSuccess,
        getAppointments,
        isFetchingAppointment,
        createAppointment,
        sendAppointmentFailure,
        sendAppointmentSuccess,
        sendingAppointment,
        confirmAppointment, 
        isConfirmingAppointment,
        appointmentConfirmationFailure, 
        appointmentConfirmationSuccess } = context

        
    return {
        appointments,
        appointmentFetchingFailure,
        appointmentFetchingSSuccess,
        getAppointments,
        isFetchingAppointment,
        sendAppointmentFailure,
        sendAppointmentSuccess,
        createAppointment,
        sendingAppointment,
        confirmAppointment,
        isConfirmingAppointment,
        appointmentConfirmationFailure,
        appointmentConfirmationSuccess
    }
}


export { useAppointments }