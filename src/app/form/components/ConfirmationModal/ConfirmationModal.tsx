
import { useState } from 'react'

// @ts-ignore
import Modal from 'react-modal'

import { Description, ReadOnlyContainer, StyledInputGroup  } from './styles'

import { AiFillExclamationCircle } from 'react-icons/ai'
import { Button } from '@/components';

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

const ConfirmationModal: React.FC<{  }> = () => {

    
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
        <Modal
            isOpen={modalIsOpen}
            //isOpen={true}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <div>
                {/* <div style={{ marginBottom: 8 }}>
                    <span style={{ color: '#2868ad' }}>
                        Você receberá um link de validação no e-mail cadastrado para confirmar o agendamento. <br />
                    </span>
                </div> */}
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
                <ReadOnlyField field={'Nome'} value={'Tiago Curi'} />
                <ReadOnlyField field={'Email'} value={'shopper.tiago@gmail.com'} />
            </StyledInputGroup>
            <StyledInputGroup>
                <ReadOnlyField field={'Data'} value={'30/08/2023'} />
                <ReadOnlyField field={'Hora'} value={'10:00 AM'} />
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