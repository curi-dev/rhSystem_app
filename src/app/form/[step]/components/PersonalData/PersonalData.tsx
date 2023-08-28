import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { Input, InputMaskComponent } from '@/components'
import { Title } from '@/components/Title'

import { FaUserEdit } from 'react-icons/fa'

import { Description } from './styles'
import { useCandidate } from '@/hooks/useCandidate'



const PersonalData: React.FC<{  }> = () => {

    // const { candidate } = useCandidate()
    const { setValue } = useFormContext()

    // useEffect(() => {
    //     // if (candidate) {
    //     //     setValue("name", candidate?.Name)
    //     //     setValue("email", candidate?.Email)
    //     //     setValue("phone", candidate?.Phone)
    //     // }

    // }, [candidate])

    
    return (
        <>
            <Description>
                Preencha seus dados pessoais
            </Description>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
                <FaUserEdit size={25} color="#2868ad" />
                <Title text={"Dados Pessoais"} />
            </div>

            <Input 
                label={"Nome completo"} 
                field='name' 
                type='text' 
                registerOptions={{ 
                        required: "nome com 2 caracteres é obrigatório", 
                        minLength: { value: 2, message: "nome com 2 caracteres é obrigatório"} 
                    }} 
                />
            <Input 
                label={"Email"} 
                field='email' 
                type='text' 
                helperText={"Você receberá um link de validação no e-mail cadastrado para confirmar o agendamento"} 
                registerOptions={{ required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "email inválido" } }} 
                // placeholder='Ex: candidato@gmail.com'
            />
            <InputMaskComponent 
                label={"Telefone"} 
                field='phone' 
                mask={'(99) 99999-9999'} 
                registerOptions={{ required: true, pattern: { value: /^[0-9]{11}$/, message: "número de telefone inválido" } }} 
                // placeholder='(21) 97742-3232'
            />
            
            <div style={{ width: '100%', borderRadius: '6px', backgroundColor: '#2868ad', border: 'none', height: 152, padding: 16 }}>
                <div style={{ 
                    //color: '#2868ad', 
                    color: '#c0c0c0',
                    //fontWeight: 600,
                    marginBottom: 16, 
                    fontSize: 14 
                }}>
                    * Utilize este campo para fazer o upload do seu currículo. 
                    Este item é obrigatório. Só aceitamos arquivos em formato '.pdf'.
                    {/* <AiFillFilePdf /> */}
                </div>
                <Input 
                    label={""} 
                    field='resume' 
                    type='file' 
                    registerOptions={undefined} 
                />
            </div>
        </>
    )
}


export { PersonalData }