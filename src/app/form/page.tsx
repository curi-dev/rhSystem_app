"use client"

import { useState } from 'react'

import { useForm, FormProvider } from 'react-hook-form'

import { Button, Header } from '../../components'
import { Slot, months, slots_mock } from './components/Calendar/Calendar'

import { StyledContainer, Footer, SideMenu, InterviewInformation, Content } from './styles'
import { CalendarComponent, PersonalData } from './components'
import { Description } from './components/PersonalData/styles'

import { BsFillStopwatchFill } from 'react-icons/bs'
import { ConfirmationModal } from './components/ConfirmationModal/ConfirmationModal'
import { DayValue } from 'react-modern-calendar-datepicker'
import { SlotTimeValue } from './components/Calendar/interfaces'

import { useSlots } from '@/hooks/useSlots'
import SlotsProvider from '@/providers/SlotsProvider'



const Form = () => {
    const methods = useForm({ mode: 'onBlur',  })
    const { formState: { errors }, getValues } = methods

    const { fetchAvailableSlots } = useSlots()
    console.log("fetchAvailableSlots: ", fetchAvailableSlots)
    
    const [step, setStep] = useState<number>(0)
    
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const [selectedDay, setSelectedDay] = useState<DayValue | null>(null);
    const [slot, setSlot] = useState<SlotTimeValue | null>(null)


    const handleOnCalendarChange = (v: DayValue) => {
        setSelectedDay(v)

        fetchAvailableSlots(v)
    }


    const steps: any = {
        0: {
            'component': <PersonalData />,
            next: () => {
                setStep(step +1)
            },
            validate: () => {
                //let fields_to_validate = ["name", "email", "phone"]
                let fields_to_validate = ["name", "email"]
                for (let i = 0; i < fields_to_validate.length; i++) {
                    if (Object.keys(errors).includes(fields_to_validate[i])) {                
                        return false
                    }
                }

                return true
            }

        },
        1: {
            component: <CalendarComponent 
                            isModalOpen={isModalOpen}
                            values={{ selectedDay, slot }} 
                            actions={{ onChangeSelectedDay: (v: DayValue) => handleOnCalendarChange(v), onChangeSlot: (v: SlotTimeValue) => setSlot(v) }} 
                        />,
            next: () => {
                setIsModalOpen(true)
            },
            validate: () => {
                if (selectedDay && slot) {
                    return true
                }

                return false
            }
        }
    }
    
    
    const handleOnProgress = (num: number) => {
        if (num < 0) {
            setStep(step + (num))       
            return 
        }

        let fieldFilled = steps[step]['validate']()

        if (fieldFilled) {
            steps[step]['next']()
        }
    }

    const getTime = () => {
        let currSelectedSlot = slots_mock.find(s => s.value === slot)

        return currSelectedSlot
    }

    const onSubmit = (data: any) => console.log(data);

    const displayBackBtn = step === 0 && "hidden" 

    
    function GetConfirmationData() {
        const { name, email, phone } = getValues()
        
        let confirmationData = { 
            name: name as string,
            email: email as string,
            phone: phone as string,
            selectedDay: getDate() as string,
            slot: getTime() as { id: string, value: SlotTimeValue, label: string }
        }

        return confirmationData
    }

    function getDate() {
        return `${selectedDay?.day}/${selectedDay?.month}/${selectedDay?.year}`
    }

    return (
        <>
        <StyledContainer>
            <SideMenu >
                <div>
                    <Description>
                        #Processo seletivo
                    </Description>
                    <h3 style={{ marginTop: 12, color: '#2868ad' }}>Marque sua entrevista</h3>

                    <Slot label='30-60min' icon={<BsFillStopwatchFill />} size="123" />
                </div>

                <InterviewInformation>
                    <div>
                        {/* first-child */}
                        <div>
                            <span>
                                DATA
                            </span>
                        </div>

                        <div>
                            <span>
                                {
                                    selectedDay ? (
                                        // @ts-ignore
                                        `${selectedDay.day}.${months[selectedDay.month]}.${selectedDay.year}`
                                    ) : (
                                        "Por favor selecione"
                                    )
                                }
                            </span>
                        </div>
                    </div>

                    {/* last child */}
                    <div>
                        {/* first-child */}
                        <div>
                            <span>
                                HORÁRIO
                            </span>
                        </div>
                        <div>
                            <span>
                            {
                                (() => {
                                    const time = getTime()
                                    if (time) {
                                        return time['label']
                                    }

                                    return "Por favor selecione"
                                })()
                            }
                            </span>
                        </div>
                    </div>
                </InterviewInformation>

            </SideMenu >
                <Content>
                    <Header />
                    <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: '100%', padding: 16 }} >
                        {steps[step]['component']}
                    </form>
                    </FormProvider>
                </Content>

            { 
                isModalOpen && (
                    <ConfirmationModal 
                        isOpen={isModalOpen} 
                        onCloseModal={function (): void {
                            setIsModalOpen(false)
                        }} 
                        confirmationData={GetConfirmationData} 
                    /> 
                )
            }

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