"use client"
import { useRouter } from 'next/navigation'
import { createContext, useState } from 'react'
import { ConfirmAppointmentService, CreateAppointmentService } from '@/api/services'
import { IAppointment } from '@/models/Appointment'
import { useToast } from '@/hooks/useToast'
import { useCandidate } from '@/hooks/useCandidate'


interface AppointmentsContextInterface {
    confirmAppointment: (appointmentId: string) => Promise<void>
    isConfirmingAppointment: boolean
    appointmentConfirmationSuccess: boolean
    appointmentConfirmationFailure: boolean
    sendAppointmentSuccess: boolean
    sendAppointmentFailure: boolean
    sendingAppointment: boolean
    createAppointment: (appointment: IAppointment) => void
}

const AppointmentsContext = createContext<AppointmentsContextInterface>({} as AppointmentsContextInterface)


const AppointmentsProvider = ({ children }: any) => {

    const { success } = useToast()
    const { RESET: ResetCandidateValues } = useCandidate()

    // loading states
    const [isConfirmingAppointment, setIsConfirmingAppointment] = useState(false)
    const [appointmentConfirmationSuccess, setAppointmentConfirmationSuccess] = useState(false)
    const [appointmentConfirmationFailure, setAppointmentConfirmationFailure] = useState(false)
    const [sendingAppointment, setIsSendingAppointment] = useState(false)
    const [sendAppointmentSuccess, setsendAppointmentSuccess] = useState(false)
    const [sendAppointmentFailure, setsendAppointmentFailure] = useState(false)
    
    const router = useRouter()

    // appointments
    //const [appointments, setAppointments] = useState([])

    const createAppointment = async (appointment: IAppointment) => {
    
        setIsSendingAppointment(true)
        setTimeout(() => {

            CreateAppointmentService(appointment)
            .then(r => {
                console.log("appointment sent!", r)

                setsendAppointmentSuccess(true)
                setsendAppointmentFailure(false)

                ResetCandidateValues()
                const message = "Seu agendamento foi criado com sucesso. Confirme pelo link de validação enviado para o email cadastrado"
                success(message, 5000)
                router.push("/")
            })
            .catch(e => {
                console.error("e: ", e)

                setsendAppointmentFailure(true)
                setsendAppointmentSuccess(false)
            })
            .finally(() => {
                setIsSendingAppointment(false)
            })
        }, 3000)

    }


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
            appointmentConfirmationFailure,
            sendAppointmentFailure,
            sendAppointmentSuccess,
            sendingAppointment,
            createAppointment
        }}>

            {children}

        </AppointmentsContext.Provider>
    )
}

export default AppointmentsProvider
export { AppointmentsContext }