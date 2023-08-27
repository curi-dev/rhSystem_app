"use client"

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import { AppointmentDatetimeDetails, Button, Loading } from '@/components'
import { StyledContainer, StyledFooter } from './styles'
import { Description } from '../form/components/PersonalData/styles'
import { useAppointments } from '@/hooks/useAppointments'

import { AiFillCheckCircle } from 'react-icons/ai'
import { BiSolidMessageAltError } from 'react-icons/bi'


export default function Confirmed() {

    const { 
        confirmAppointment, 
        isConfirmingAppointment, 
        appointmentConfirmationFailure, 
        appointmentConfirmationSuccess } = useAppointments()

    console.log("appointmentConfirmationFailure: ", appointmentConfirmationFailure)
    
    // .../confirmed?appointment=1
    const { get, values } = useSearchParams()
    useEffect(() => {
        const appointmentId = get("apnmnt")

        console.log("appointmentId: ", appointmentId)

        if (appointmentId) {
            confirmAppointment(appointmentId)
        }
    }, [values])


   
    

    return (
        <StyledContainer>
            {
                isConfirmingAppointment ? (
                //false ? (
                   <Loading />
                ) : (
                    <>
                    <div>
                        {
                            appointmentConfirmationSuccess ? 
                                <AiFillCheckCircle color='#2868ad' size={55} /> :
                                    <BiSolidMessageAltError color='#c1131e' size={55} /> 
                        }
                    </div>

                    <h2 style={{ color: '#000000', margin: 12 }} >
                        {
                            appointmentConfirmationSuccess ?
                                "Parabéns! Sua entrevista está confirmada!" :
                                    "Não foi possível completar a solicitação"
                        }
                    </h2>

                    <div style={{ textAlign: 'center' }}>
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
                    </div>
                    {
                        appointmentConfirmationSuccess && (
                            <div style={{ width: '50%', height: 162, marginTop: 16 }}>
                                <AppointmentDatetimeDetails 
                                    slots={undefined} 
                                    selectedDay={undefined} 
                                    //currStep={undefined} 
                                    slot={null} 
                                    time={undefined} 
                                />
                            </div>
                        )
                    }
                    <StyledFooter>
                        <Button text={'Sair'} hollow />
                        <Button text={'Reenviar'} />
                    </StyledFooter>
                    </>
                ) 
            }
        </StyledContainer>
    )
}

