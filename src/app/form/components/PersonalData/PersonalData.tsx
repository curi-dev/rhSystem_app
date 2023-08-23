import { Input, InputMaskComponent } from '@/components'
import { Title } from '@/components/Title'

import { FaUserEdit } from 'react-icons/fa'

import { Description } from './styles'


const PersonalData: React.FC<{  }> = () => {

    return (
        <>
            <Description>
                Preencha seus dados pessoais
            </Description>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
                <FaUserEdit size={25} color="#2868ad" />
                <Title text={"Dados Pessoais"} />
            </div>

            <Input label={"Nome completo"} field='name' type='text' />
            <Input label={"Email"} field='email' type='text' helperText={"Você receberá um link de validação no e-mail cadastrado para confirmar o agendamento"} />
            <InputMaskComponent label={"Telefone"} field='phone' mask={'() 99999-9999'} />
            
            <div style={{ width: '100%', borderRadius: '12px', borderColor: '#2868ad', borderStyle: 'solid', borderWidth: 2, height: 177, padding: 16 }}>
                <div style={{ color: '#2868ad', marginBottom: 16, fontSize: 14 }}>
                    * Utilize este campo para fazer o upload do seu currículo. Este item é obrigatório. Só aceitamos arquivos em formato '.pdf'.
                </div>
                <Input label={""} field='resume' type='file' />
            </div>
        </>
    )
}


export { PersonalData }