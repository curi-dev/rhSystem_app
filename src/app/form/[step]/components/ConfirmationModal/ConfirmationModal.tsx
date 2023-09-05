// @ts-ignore
import Modal from 'react-modal'

import { Button, Loading } from '@/components';

import { IAppointment } from '@/models/Appointment';

import { useAppointments } from '@/hooks/useAppointments';

import { Slot as ISlot } from '../Calendar/interfaces';
import { DayValue } from 'react-modern-calendar-datepicker';

import { AiFillExclamationCircle } from 'react-icons/ai'
import { Description, ReadOnlyContainer, StyledInputGroup, Content  } from './styles'
import { useCandidate } from '@/hooks/useCandidate';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '50%',
      maxWidth: '700px',
      maxHeight: '374px',
      boxShadow: '0 1em 3em rgba(156, 136, 255,0.2)'
    },
    overlay: { zIndex: 1000 }
};

export interface IConfirmationData {
    name: string; email: string; phone: string; selectedDay: DayValue; slot: ISlot | undefined
}

interface ConfirmationModalProps {
    isOpen: boolean
    onCloseModal: () => void
    selectedDay: DayValue
    slot: ISlot | undefined
}


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onCloseModal, selectedDay, slot }) => {

    const { createAppointment, sendingAppointment } = useAppointments()
    const { candidate } = useCandidate()

    function closeModal() {
        onCloseModal()
    }

    function getDate() {
        return `${selectedDay?.day}/${selectedDay?.month}/${selectedDay?.year}`
    }

    const handleOnClick = () => {
        
        if (!selectedDay || !slot || !candidate?.Email || !candidate.Name || !candidate.Phone) {
            return 
        }

        const newAppointment = {
            id: candidate.Id,
            email: candidate.Email,
            phone: candidate.Phone,
            splitted_date: selectedDay,
            slot: Number(slot.Value),
        } as IAppointment

        createAppointment(newAppointment)
    }


    return (
        <>
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <Content >
            {
                sendingAppointment && <Loading overlayOpacity={0.25} />
            }

                <>
                <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', border: '0.5px solid #e0e0e0', padding: 12 }}>
                        <div style={{ marginRight: 4, height: '100%', display: 'flex', alignItems: 'center' }}>
                            <AiFillExclamationCircle color="#c0131d" size={25} />
                        </div>
                        <span style={{ color: '#000000' }}>
                            <b> Importante: a validação pelo link é necessária para a confirmação da entrevista!</b>
                        </span>
                    </div>
                </div>

                <div>
                    <h3 style={{ margin: 20, color: '#2868ad' }}>Confirme seus dados</h3>

                    <StyledInputGroup>
                        <ReadOnlyField field={'Nome'} value={candidate.Name} />
                        <ReadOnlyField field={'Email'} value={candidate.Email} />
                    </StyledInputGroup>
                    <StyledInputGroup>
                        <ReadOnlyField field={'Data'} value={getDate()} />
                        <ReadOnlyField field={'Hora'} value={(slot?.Label as string)} />
                    </StyledInputGroup>
                    <ReadOnlyField field={'Telefone'} value={candidate.Phone} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button text={'Agendar'} type='submit' onClick={handleOnClick} />         
                </div>
                </>           
            </Content>
        </Modal>            
        </>
    )
}


export const ReadOnlyField: React.FC<{ field: string, value: string }> = ({ field, value }) => {


    return (
        <ReadOnlyContainer>
            <div >
                <label>
                    {field}
                </label>
            </div>
            <Description>
                {value || ""}
            </Description>
        </ReadOnlyContainer>

    )
}


export { ConfirmationModal }