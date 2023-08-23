"use client"
import { useMemo, useState } from 'react'

import { useForm, FormProvider } from 'react-hook-form'

import { Button, Header } from '../../components'
import { Slot } from './components/Calendar/Calendar'

import { StyledContainer, Footer, SideMenu, InterviewInformation } from './styles'
import { CalendarComponent, PersonalData } from './components'
import { Description } from './components/PersonalData/styles'

import { BsFillStopwatchFill } from 'react-icons/bs'
import { ConfirmationModal } from './components/ConfirmationModal/ConfirmationModal'



const Form = () => {
    const methods = useForm({ mode: 'onBlur',  })

    const [step, setStep] = useState<number>(0)
    console.log("step: ", step)

    const steps: any = {
        0: {
            'component': <PersonalData />,
            //'fieldsToValidate': ["name", "email", "phone"]
            'fieldsToValidate': ["name", "email"]
        },
        1: {
            'component': <CalendarComponent />},
            'fieldsToValidate': ["date", "slot"]
        }
    
    const getFieldsToValidate = () => {
        return steps[step]['fieldsToValidate']
    }

    const handleOnProgress = (num: number) => {
        if (num < 0) {
            setStep(step + (num))       
            return 
        }
        
        const { formState: { errors } } = methods
        console.log("errors: ", errors)

        const fields_to_validate = getFieldsToValidate() as string[]

        for (let i = 0; i < fields_to_validate.length; i++) {
            if (Object.keys(errors).includes(fields_to_validate[i])) {
                // disparar erro
                
                return
            }
        }
        
        setStep(step + (num))       
    }


    const onSubmit = (data: any) => console.log(data);

    const displayBackBtn = step === 0 && "hidden" 

    return (
        <>
        <StyledContainer>
            <SideMenu >
                <div>
                    <Description>
                        Processo seletivo
                    </Description>
                    <h3 style={{ marginTop: 12, color: '#2868ad' }}>Marque sua entrevista</h3>

                    <Slot label='30-60min' icon={<BsFillStopwatchFill />} size="123" />
                </div>

                <InterviewInformation>
                    <div>
                        {/* first-child */}
                        <div>
                            <span>
                                Data
                            </span>
                        </div>

                        <div>
                            <span>
                                Não definido
                            </span>
                        </div>
                    </div>

                    {/* last child */}
                    <div>
                        {/* first-child */}
                        <div>
                            <span>
                                Horário
                            </span>
                        </div>
                        <div>
                            <span>
                                Não definido
                            </span>
                        </div>
                    </div>
                </InterviewInformation>

            </SideMenu >
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div style={{ flex: 1, padding: '20px' }}>
                    <Header />
                    {steps[step]['component']}
                </div>
            </form>

            { <ConfirmationModal /> }
            </FormProvider>

        </StyledContainer>
        <Footer>
            {/* @ts-ignore */}
            <div style={{ visibility: displayBackBtn }}>
                <Button onClick={() => handleOnProgress(-1)} text={'Voltar'} hollow={true} />
            </div>
            <Button onClick={() => handleOnProgress(1)} text={'Avançar'} />
        </Footer>
        </>
    )
}


export default Form