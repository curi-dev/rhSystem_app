"use client"
import { useState } from 'react'

import { Button, Header } from '../../components'
import { Slot } from './components/Calendar/Calendar'

import { StyledContainer, Footer, SideMenu, InterviewInformation } from './styles'
import { CalendarComponent, PersonalData } from './components'
import { Description } from './components/PersonalData/styles'


import { BsFillStopwatchFill } from 'react-icons/bs'
import { ConfirmationModal } from './components/ConfirmationModal/ConfirmationModal'



const Form = () => {

    const [step, setStep] = useState<number>(0)

    const steps: any = {
        0: <PersonalData />,
        1: <CalendarComponent />,
        //'confirmation': <Data />
    }


    console.log("step: ", step)

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
            <div style={{ flex: 1, padding: '20px' }}>
                <Header />
                {steps[step]}
            </div>

        </StyledContainer>
        <Footer>
            {/* @ts-ignore */}
            <div style={{ visibility: displayBackBtn }}>
                <Button onClick={() => setStep(step -1)} text={'Voltar'} hollow={true} />
            </div>
            <Button onClick={() => setStep(step +1)} text={'Avançar'} />
        </Footer>
        {
            <ConfirmationModal />
        }
        </>
    )
}


export default Form