import { AppointmentDetailsContainer as StyledAppointmentDetails, AppointmentActionsWrapper, ReadOnlyContainer, StyledInputGroup } from './styles'

import { BsFillFileEarmarkTextFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import React from 'react'

interface AppointmentDetailsContainerInterface {
    name: string
    email: string 
    datetime: string
    slot: string
    phone: string
}


const AppointmentDetailsContainer: React.FC<AppointmentDetailsContainerInterface> = ({ name, email, datetime, slot, phone }) => {


    return (
        <StyledAppointmentDetails>
                                                                    
            <StyledInputGroup>
                <ReadOnlyField field={'Candidato:'} value={name} />
                <ReadOnlyField field={'Email:'} value={email} />
            </StyledInputGroup>

            <StyledInputGroup>
                <ReadOnlyField field={'Data:'} value={datetime} />
                <ReadOnlyField field={'Hora:'} value={slot} />
            </StyledInputGroup>
            
            <ReadOnlyField field={'Telefone:'} value={phone} />
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
                <BsFillFileEarmarkTextFill color='#2868ad' size={22} />
                <AiFillDelete color='#2868ad' size={26} />
            </AppointmentActionsWrapper>
        
        </StyledAppointmentDetails>                      
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


export { AppointmentDetailsContainer, ReadOnlyField }