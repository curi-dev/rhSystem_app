// @ts-ignore
import Modal from 'react-modal'
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components';

import { IAppointment } from '@/models/Appointment';

import { useAppointments } from '@/hooks/useAppointments';

import { Slot as ISlot } from '../Calendar/interfaces';
import { DayValue } from 'react-modern-calendar-datepicker';

import { AiFillExclamationCircle } from 'react-icons/ai'
import { Description, ReadOnlyContainer, StyledInputGroup, Content  } from './styles'


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
    confirmationData: () => IConfirmationData
}


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onCloseModal, confirmationData }) => {

    const { getValues } = useFormContext()
    const { sendNewAppointment } = useAppointments()

    function closeModal() {
        onCloseModal()
    }

    function getDate() {
        return `${selectedDay?.day}/${selectedDay?.month}/${selectedDay?.year}`
    }

    const { email = "", name = "", phone = "", selectedDay, slot } = confirmationData()

    const handleOnClick = () => {

        const values = getValues()
        
        if (!selectedDay || !slot) {
            return 
        }

        const candidateId = sessionStorage.getItem("candidate")

        const newAppointment = {
            id: candidateId || "",
            email: values.email || "",
            phone: values.phone || "",
            splitted_date: selectedDay,
            slot: Number(slot.Value),
        } as IAppointment


        sendNewAppointment(newAppointment)
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
                        <ReadOnlyField field={'Nome'} value={name} />
                        <ReadOnlyField field={'Email'} value={email} />
                    </StyledInputGroup>
                    <StyledInputGroup>
                        <ReadOnlyField field={'Data'} value={getDate()} />
                        <ReadOnlyField field={'Hora'} value={(slot?.Label as string)} />
                    </StyledInputGroup>
                    <ReadOnlyField field={'Telefone'} value={phone} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button text={'Agendar'} type='submit' onClick={handleOnClick} />         
                </div>
            </Content>
        </Modal>            
        </>
    )
}


const ReadOnlyField: React.FC<{ field: string, value: string }> = ({ field, value }) => {


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