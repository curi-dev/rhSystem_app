'use client'

import { useEffect, useMemo } from "react"
import { StyledContainer } from "./styles"
import { Loading, Title } from "@/components"

import { Slot } from "../form/[step]/components/Calendar/interfaces"

import { useAppointments } from "@/hooks/useAppointments"

import { months } from "@/components/AppointmentDatetimeDetails/AppointmentDatetimeDetails"

import { GetMockedSlot } from "../helpers/get_mocked_slot"

import { MdNotificationImportant } from 'react-icons/md'
import { AppointmentDetailsContainer } from "./components/AppointmentDetailsContainer/AppointmentDetailsContainer"



const Scheduled = () => {

    const { getAppointments, appointments, isFetchingAppointment } = useAppointments()

    console.log("appointments: ", appointments)

    useEffect(() => {
        getAppointments()
    }, [])


    const getDateText = (date: string) => {

        const newDate = new Date(date)

        // @ts-ignore
        return `${newDate.getDate()}.${months[newDate.getMonth() +1]}.${newDate.getFullYear()}`
    }

    const getFormattedDate = (date: string) => {
        const newDate = new Date(date)

        let day = `${newDate.getDate()}`
        let month = `${newDate.getMonth() +1}` 
        
        day = Number(day) < 10 ? `0${day}` : day
        month = Number(month) < 10 ? `0${month}` : month

        // @ts-ignore
        return `${day}/${month}/${newDate.getFullYear()}`
    }

    // @ts-ignore
    const organized_appointments: [Appointments[]] = useMemo(() => appointments.reduce(function (acc, currValue) {

        if (appointments.length > 0) {
            if (!!acc.length) {
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
        }

        return []

    }, [] as any[]), [appointments])


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
                                day_appointments.map((A, i) => (
                                    <AppointmentDetailsContainer 
                                        key={"A" + i}
                                        name={A.name} 
                                        email={A.email} 
                                        datetime={getFormattedDate(A.datetime)} 
                                        slot={handleGetSlotLabel(A.slot)} 
                                        phone={A.phone} 
                                    />                                      
                                ))
                            )
                        }
                        {/* <AppointmentDetailsContainer 
                            // key={}
                            name={""} 
                            email={""} 
                            datetime={""} 
                            slot={""} 
                            phone={""} 
                        />
                        <AppointmentDetailsContainer 
                            // key={}
                            name={""} 
                            email={""} 
                            datetime={""} 
                            slot={""} 
                            phone={""} 
                        />
                        <AppointmentDetailsContainer 
                            // key={}
                            name={""} 
                            email={""} 
                            datetime={""} 
                            slot={""} 
                            phone={""} 
                        /> 
                        <AppointmentDetailsContainer 
                            // key={}
                            name={""} 
                            email={""} 
                            datetime={""} 
                            slot={""} 
                            phone={""} 
                        />
                        <AppointmentDetailsContainer 
                            // key={}
                            name={""} 
                            email={""} 
                            datetime={""} 
                            slot={""} 
                            phone={""} 
                        />
                        <AppointmentDetailsContainer 
                            // key={}
                            name={""} 
                            email={""} 
                            datetime={""} 
                            slot={""} 
                            phone={""} 
                        />                                                                                                                                                                                                                                    */}
                        </div>
                        </>
                    )

                })
            }

        </StyledContainer>
    )
}



export default Scheduled