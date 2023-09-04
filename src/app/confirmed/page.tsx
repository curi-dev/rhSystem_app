"use client"

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import { AppointmentDatetimeDetails, Button, Loading } from '@/components'
import { StyledContainer, StyledFooter } from './styles'
import { useAppointments } from '@/hooks/useAppointments'

import { AiFillCheckCircle } from 'react-icons/ai'
import { BiSolidMessageAltError } from 'react-icons/bi'
import { DayValue } from 'react-modern-calendar-datepicker'
import { Slot as ISlot } from '../form/[step]/components/Calendar/interfaces'
import { slots_mock } from './slot_mocks'



export default function Confirmed() {

    //const { slots, fetchSlots } = useSlots() 

    const { 
        appointmentConfirmationFailure,
        confirmAppointment, 
        isConfirmingAppointment, 
        appointmentConfirmationSuccess } = useAppointments()


    const [slotInfo, setSlotInfo] = useState<number | null>(null)
    const [selectedDayInfo, setSelectedDayInfo] = useState<DayValue | null>(null)
    
    const { get, values } = useSearchParams()
    useEffect(() => {
        const appointmentId = get("apnmnt")
        setSlotInfo(Number(get("slot") as string))
        setSelectedDayInfo({ day: Number(get("day") as string) , month: Number(get("month") as string), year: Number(get("year") as string) })
        
        if (appointmentId) {
            confirmAppointment(appointmentId)
        }
    }, [values])


    const getSlot = (): ISlot | undefined => {
        if ((slotInfo as number)) {

            console.log("slotInfo inside getSlot() ", slotInfo)
            
            const slotLabel = slots_mock.find(s => { 
                console.log("s ", s)
                console.log(" String(slotInfo) ",  String(slotInfo))
                       
                return s.Value == String(slotInfo)
            }) 

            return slotLabel
        }

        return undefined
    }

    const slot = getSlot()
    

    if (isConfirmingAppointment) {
        return <Loading overlayOpacity={0.35} />
    }

    return (
        <StyledContainer>
            <div>
            {
                appointmentConfirmationSuccess &&
                    <AiFillCheckCircle color='#2868ad' size={55} /> 
                }
            {
                appointmentConfirmationFailure && 
                    <BiSolidMessageAltError color='#c1131e' size={55} /> 
            }
            </div>

            <h2 style={{ color: '#000000', margin: 12 }} >
                {
                    appointmentConfirmationSuccess && "Parabéns! Sua entrevista está confirmada!" 
                           
                }
                {
                    appointmentConfirmationFailure && "Não foi possível validar o agendamento"
                }
            </h2>

            {/* <div style={{ textAlign: 'center' }}>
                <Description>
                    {
                        appointmentConfirmationSuccess ? 
                            <span>
                                Você acabou de confirmar o seu agendamento. Faça o download do pdf de treinamento abaixo.
                                Boa sorte e até lá! <span role="img" aria-label="sheep">👌</span> 
                            </span> :
                                <span>
                                    Não foi possível completar a solicitação do seu agendamento. Tente reenviar o email.
                                </span> 
                    }
                    
                </Description>
            </div> */}
            {
                appointmentConfirmationSuccess && (
                    <div style={{ width: '50%', height: 162, marginTop: 16 }}>
                        <AppointmentDatetimeDetails selectedDay={selectedDayInfo} slot={slot} />
                    </div>
                )
            }
            <StyledFooter>
                <Button text={'Sair'} hollow />
                <Button text={'Reenviar'} />
            </StyledFooter>
        </StyledContainer>
    )

}

