
// @ts-ignore
import Modal from 'react-modal'

import { Description, ReadOnlyContainer, StyledInputGroup  } from './styles'

import { AiFillExclamationCircle } from 'react-icons/ai'
import { Button } from '@/components';
import { DayValue } from 'react-modern-calendar-datepicker';
import { SlotTimeValue } from '../Calendar/interfaces';

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
      maxWidth: '800px',
      maxHeight: '374px'
    },
};

interface ConfirmationModalProps {
    isOpen: boolean
    onCloseModal: () => void
    confirmationData: () => { 
        name: string, 
        email: string, 
        phone: string, 
        selectedDay: string, 
        slot: { id: string, value: SlotTimeValue, label: string } }
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onCloseModal, confirmationData }) => {

    function closeModal() {
        onCloseModal()
    }

    const confirmation_data = confirmationData()

    return (
        <>
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >

            <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', border: '0.5px solid #e0e0e0', padding: 8 }}>
                    <div style={{ marginRight: 4, height: '100%', display: 'flex', alignItems: 'center' }}>
                        <AiFillExclamationCircle color="#c0131d" size={25} />
                    </div>
                    <span style={{ color: '#000000' }}>
                        <b> Importante: a validação pelo link é necessária para a confirmação da entrevista!</b>
                    </span>
                </div>
            </div>

            <h3 style={{ margin: 20, color: '#2868ad' }}>Confirme seus dados</h3>

            <StyledInputGroup>
                <ReadOnlyField field={'Nome'} value={confirmation_data.name} />
                <ReadOnlyField field={'Email'} value={confirmation_data.email} />
            </StyledInputGroup>
            <StyledInputGroup>
                <ReadOnlyField field={'Data'} value={confirmation_data.selectedDay} />
                <ReadOnlyField field={'Hora'} value={confirmation_data.slot.label} />
            </StyledInputGroup>
            <ReadOnlyField field={'Telefone'} value={'(21) 97741-2995'} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button text={'Agendar'} />         
            </div>
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
                {value}
            </Description>
        </ReadOnlyContainer>

    )
}


export { ConfirmationModal }