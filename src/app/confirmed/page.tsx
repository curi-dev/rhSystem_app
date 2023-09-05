"use client"

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import { AppointmentDatetimeDetails, Loading } from '@/components'
import { StyledContainer, StyledFooter, Wrapper } from './styles'
import { useAppointments } from '@/hooks/useAppointments'

import { AiFillCheckCircle } from 'react-icons/ai'
import { BiSolidMessageAltError } from 'react-icons/bi'
import { DayValue } from 'react-modern-calendar-datepicker'
import { Slot as ISlot } from '../form/[step]/components/Calendar/interfaces'
import { slots_mock } from './slot_mocks'
import { useWindowSize } from '@/hooks/useWindowSize'
import { DEFAULT_BREAKPOINT } from '@/constants'



export default function Confirmed() {

    //const { slots, fetchSlots } = useSlots() 
    const { isBiggerThan, isLessThan } = useWindowSize()

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

            const slotLabel = slots_mock.find(s => {        
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

    const titleFontSize = isLessThan(DEFAULT_BREAKPOINT) ? '28px' : '20px'

    return (
        <StyledContainer>
            <Wrapper>
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

                <h2 style={{ color: '#000000', margin: 12, fontSize: titleFontSize }} >
                    {
                        appointmentConfirmationSuccess && "Parabéns! Sua entrevista está confirmada!"                        
                    }
                    {
                        appointmentConfirmationFailure && "Não foi possível validar o agendamento"
                    }
                </h2>
                {
                    appointmentConfirmationSuccess && (
                        <div style={{ width: '100%', height: 162, marginTop: 16, display: 'flex', justifyContent: 'center' }}>
                            <AppointmentDatetimeDetails selectedDay={selectedDayInfo} slot={slot} />
                        </div>
                    )
                }
                <StyledFooter>
                    {/* <Button text={'Sair'} hollow />
                    <Button text={'Reenviar'} /> */}
                </StyledFooter>
            </Wrapper>
        </StyledContainer>
    )

}

