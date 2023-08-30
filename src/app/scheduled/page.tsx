'use client'

import { useEffect } from "react"
import { StyledContainer, AppointmentDetailsContainer, ReadOnlyContainer, StyledInputGroup, AppointmentActionsWrapper } from "./styles"
import { Loading, Title } from "@/components"

import { BsFillFileEarmarkTextFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { MdNotificationImportant } from 'react-icons/md'

import { months } from "@/components/AppointmentDatetimeDetails/AppointmentDatetimeDetails"
import { useAppointments } from "@/hooks/useAppointments"
import { GetMockedSlot } from "../helpers/get_mocked_slot"
import { Slot } from "../form/[step]/components/Calendar/interfaces"

// import { ICandidate } from "@/models/Candidate"

// interface AppointmentDetails {
//     Id: string
//     RoomURL: string
//     Time: string
//     Date: Date
//     candidate: ICandidate

// }


const Scheduled = () => {

    const { getAppointments, appointments, isFetchingAppointment } = useAppointments()

    useEffect(() => {
        getAppointments()
    }, [])


    // @ts-ignore
    const organized_appointments: [Appointments[]] = appointments.reduce(function (acc, currValue) {

        if (!!acc.length) {
            console.log("currValue.Date: ", currValue.datetime.toISOString())
            console.log("acc[acc.length -1][0]['Date']: ", (acc[acc.length -1][0]['datetime'] as Date).toISOString())

            if (currValue.datetime.toISOString() !== (acc[acc.length -1][0]['Date'] as Date).toISOString()) {
                // @ts-ignore
                acc.push([currValue])
            } else {
                acc[acc.length -1].push(currValue)
            }
        } else {
            acc.push([currValue])
        }

        return acc
    }, [] as any[])

    console.log("organized_appointments: ", organized_appointments)

    const getDateText = (date: string) => {
 
        const newDate = new Date(date)

        // @ts-ignore
        return `${newDate.getDay()}.${months[newDate.getMonth() -1]}.${newDate.getFullYear()}`
    }

    const getFormattedDate = (date: string) => {
        const newDate = new Date(date)

        let day = `${newDate.getDay()}`
        let month = `${newDate.getMonth() -1}` 
        const year = newDate.getFullYear()

        day = Number(day) < 10 ? `0${day}` : day
        month = Number(month) < 10 ? `0${month}` : month

        // @ts-ignore
        return `${day}/${month}/${newDate.getFullYear()}`
    }


    const handleGetSlotLabel = (slot: number): string => {
        const slotInfo = GetMockedSlot(String(slot)) as Slot
        
        return slotInfo["Label"] || ""
    }


    return (

        <StyledContainer>
            <Title text={"Agendamentos confirmados"} />
            {
                organized_appointments.map((day_appointments, i) => {
                    return (
                        <>
                        <div style={{ margin: 24, display: 'flex', alignItems: 'center' }}>
                            <MdNotificationImportant size={45} color='#000000' />
                            <h1 key={i} style={{ color: '#000000', marginLeft: 4 }}>
                                {getDateText(day_appointments[0]['datetime'] as string)}
                            </h1>
                        </div>

                        <div key={'day_appointments' + i}>
                        
                        {
                            isFetchingAppointment ? <Loading overlayOpacity={0.35} /> : (
                                day_appointments.map(A => (                           
                                    <AppointmentDetailsContainer key={'A' + i}>
                                    
                                    
                                        <StyledInputGroup>
                                            <ReadOnlyField field={'Candidato:'} value={A.name} />
                                            <ReadOnlyField field={'Email:'} value={A.email} />
                                        </StyledInputGroup>
    
                                        <StyledInputGroup>
                                            {/* <ReadOnlyField field={'Data:'} value={new Date(A.datetime).toISOString()} /> */}
                                            <ReadOnlyField field={'Data:'} value={getFormattedDate(A.datetime)} />
                                            <ReadOnlyField field={'Hora:'} value={handleGetSlotLabel(A.slot)} />
                                        </StyledInputGroup>
                                        
                                        <ReadOnlyField field={'Telefone:'} value={A.phone} />
                                        <ReadOnlyField 
                                            link
                                            field={'Currículo:'} 
                                            value={"https://img.freepik.com/psd-gratuitas/modelo-simples-e-moderno-de-curriculo_1435-1589.jpg?w=2000"} 
                                        />
                                        <ReadOnlyField 
                                            link
                                            field={'Sala:'} 
                                            value={"https://meet.google.com/"} 
                                        />
    
                                        <AppointmentActionsWrapper >
                                            <BsFillFileEarmarkTextFill color='#2868ad' size={24} />
                                            <AiFillDelete color='#2868ad' size={28} />
                                        </AppointmentActionsWrapper>
                                    
                                    </AppointmentDetailsContainer>                      
                                ))
                            )
                        }

                        </div>
                        </>
                    )

                })
            }

        </StyledContainer>
    )
}


const ReadOnlyField: React.FC<{ field: string, value: string, link?: boolean }> = ({ field, value, link }) => {


    return (
        <ReadOnlyContainer>
            <label>
                {field}
            </label>
            {
                link ? <a href={value} style={{ color: '#0000ff' }}>
                    Link para {field.replace(":", " ")}
                </a> : <span >
                    {value || ""}
                </span>
            }
            
        </ReadOnlyContainer>

    )
}



export default Scheduled