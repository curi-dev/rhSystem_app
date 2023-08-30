"use client"
import { useRouter } from 'next/navigation'
import { createContext, useState } from 'react'
import { ConfirmAppointmentService, CreateAppointmentService, GetAppointmentsService } from '@/api/services'
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
    isFetchingAppointment: boolean
    appointmentFetchingSSuccess: boolean
    appointmentFetchingFailure: boolean  
    getAppointments: () => void 
    appointments: Appointments[]
}

const AppointmentsContext = createContext<AppointmentsContextInterface>({} as AppointmentsContextInterface)


// `SELECT A.id, A.datetime, A.slot, A.created_at, A.updated_at, C.id, C.email, C.phone, C.resumeUrl, C.name FROM appointments as A
// 		WHERE A.status = 2
// 		LEFT JOIN candidates as C
// 		on A.candidate = C.id
// 		ORDER_BY A.created_at ASC`,

//       "candidateId": "d362e8c0-22c6-46d7-8013-eb04b6b15f7f",
// 		"datetime": "2023-09-05T09:00:00Z",
// 		"email": "shopper.tiago@gmail.com",
// 		"id": "40beb82c-0697-4482-a59a-a8d0f82d4540",
// 		"name": "Tiago Lindgren Curi",
// 		"phone": "21977412997",
// 		"resumeUrl": string
// 
// 		"slot": 2
// 	}
interface Appointments {
    id: string
    datetime: Date
    slot: number
    created_at: Date
    updated_at: Date
    candidateId: string
    name: string
    email: string
    phone: string
    resumeUrl: string
}

const AppointmentsProvider = ({ children }: any) => {

    const router = useRouter()
    const { RESET: ResetCandidateValues } = useCandidate()
    const { success, warning } = useToast()

    // loading states
    const [isConfirmingAppointment, setIsConfirmingAppointment] = useState(false)
    const [appointmentConfirmationSuccess, setAppointmentConfirmationSuccess] = useState(false)
    const [appointmentConfirmationFailure, setAppointmentConfirmationFailure] = useState(false)

    const [sendingAppointment, setIsSendingAppointment] = useState(false)
    const [sendAppointmentSuccess, setsendAppointmentSuccess] = useState(false)
    const [sendAppointmentFailure, setsendAppointmentFailure] = useState(false)

    const [isFetchingAppointment, setIsisFetchingAppointment] = useState(false)
    const [appointmentFetchingSSuccess, setAppointmentFetchingSuccess] = useState(false)
    const [appointmentFetchingFailure, setAppointmentFetchingFailure] = useState(false)

    const [appointments, setAppointments] = useState<Appointments[]>([])

    console.log("appointments: ", appointments)
    

    const createAppointment = async (appointment: IAppointment) => {
        
        setIsSendingAppointment(true)
        const response = await CreateAppointmentService(appointment)

        console.log("response inside context: ", response)

        if (response.error) {
            console.error("e: ", response.message)

            setsendAppointmentFailure(true)
            setsendAppointmentSuccess(false)

            warning(response.message, 5000)
        } else {
            console.log("appointment sent!", response)

            setsendAppointmentSuccess(true)
            setsendAppointmentFailure(false)

            ResetCandidateValues()
            RESET()
            const message = "Seu agendamento foi criado com sucesso. Confirme pelo link de validação enviado para o email cadastrado"
            success(message, 5000)
            router.push("/")
        }
        
        setIsSendingAppointment(false)
    }

    const getAppointments = async () => {
        
        setIsisFetchingAppointment(true)
        const r = await GetAppointmentsService()

        if (r.error) {
            console.error("e: ", r.message)

            setAppointmentFetchingFailure(true)
            setAppointmentFetchingSuccess(false)

        } else {
            console.log("appointments!", r)
            
            setAppointments(r)

            setAppointmentFetchingSuccess(true)
            setAppointmentFetchingFailure(false)
        }
        
        setIsisFetchingAppointment(false)
    }

    const RESET = () => {
        setIsConfirmingAppointment(false)
        setAppointmentConfirmationSuccess(false)
        setAppointmentConfirmationFailure(false)
        setIsSendingAppointment(false)
        setsendAppointmentSuccess(false)
        setsendAppointmentFailure(false)
    }


    const confirmAppointment = async (appointmentId: string) => {
        
        console.log("appointmentId: ", appointmentId)

        setIsConfirmingAppointment(true)
       
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
            createAppointment,
            isFetchingAppointment,
            appointmentFetchingSSuccess,
            appointmentFetchingFailure,
            getAppointments,
            appointments
        }}>

            {children}

        </AppointmentsContext.Provider>
    )
}

export default AppointmentsProvider
export { AppointmentsContext }