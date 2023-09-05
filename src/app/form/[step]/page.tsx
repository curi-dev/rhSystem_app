"use client"

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useForm, FormProvider } from 'react-hook-form'
import { DayValue } from 'react-modern-calendar-datepicker'

import { CalendarComponent, PersonalData } from './components'
import { Slot } from './components/Calendar/Calendar'
import { ConfirmationModal } from './components/ConfirmationModal/ConfirmationModal'
import { Description } from './components/PersonalData/styles'

import { Button, Header, Loading } from '@/components'
import { AppointmentDatetimeDetails } from '@/components/AppointmentDatetimeDetails/AppointmentDatetimeDetails'

import { useSlots } from '@/hooks/useSlots'

import { Slot as ISlot, SlotTimeValue } from './components/Calendar/interfaces'

import { StyledContainer, Footer, SideMenu, Content, FormWrapper } from './styles'

import { BsFillStopwatchFill } from 'react-icons/bs'

import { useCandidate } from '@/hooks/useCandidate'

import Logo from '../../../../public/wa_group.jpg'
import { useWindowSize } from '@/hooks/useWindowSize'
import { DEFAULT_BREAKPOINT } from '@/constants'


const Form = ({ params: { step: paramsStep } }: { params: { step: number } }) => {
    
    const methods = useForm({ mode: 'onBlur',  })
    const { formState: { errors }, getValues } = methods
    const { back } = useRouter()
    const { createCandidate, isCreatingCandidate } = useCandidate()
    const { isBiggerThan, isLessThan } = useWindowSize()
    
    const { fetchAvailableSlots, slots } = useSlots()
    
    const [step, setStep] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState<DayValue | null>(null);
    const [slot, setSlot] = useState<SlotTimeValue | null>(null)

    useEffect(() => {
        if (!step) {
            setStep(Number(paramsStep))
        }
    }, [paramsStep])
    
    const handleOnCalendarChange = (v: DayValue) => {
        setSelectedDay(v)

        fetchAvailableSlots(v)
    }

    const handleOnProgress = (direction: 'back' | 'forward') => {
        const validStep = Number(step) 
        if (direction === 'back') {

            if (step === 1) {
                back()
                return
            }

            setStep(validStep -1)    
            return 
        }
    
        let fieldFilled = steps[validStep]['validate']()
        if (fieldFilled) {
            steps[Number(validStep)]['next']()
        }
    }

    const memoizedSelectedSlot = useMemo(function getSlotDetails(): ISlot | undefined {
        
        let currSelectedSlot = slots.find(s => Number(s.Value as string) == slot)

        return currSelectedSlot
    }, [slot])
    
    
    const steps: any = {
        1: {
            'component': <PersonalData />,
            
            next: async () => {
                const { name, email, phone } = getValues()

                createCandidate({ Email: email, Phone: phone, Name: name })
                .then(success => {
                    if (success) {
                        setStep(Number(step) +1)
                    }
                })
                .catch(e => {
                    console.error(e)
                    // toast
                })
            },
            
            validate: () => {

                let fields_to_validate = ["name", "email", "phone"]
                for (let i = 0; i < fields_to_validate.length; i++) {
                    if (Object.keys(errors).includes(fields_to_validate[i])) {                
                        return false
                    }
                }

                return true
            }

        },
        2: {
            component: <CalendarComponent 
                values={{ selectedDay, slot }} 
                actions={
                    { 
                        onChangeSelectedDay: (v: DayValue) => handleOnCalendarChange(v), 
                        onChangeSlot: (v: SlotTimeValue) => setSlot(v) 
                    }
                } 
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

    const getScheduleTitle = () => {
        return (
            <div style={{ padding: 16 }}>
                <Description>
                    #Processo seletivo
                </Description>
                
                <h3 style={{ marginTop: 12, marginBottom: 8, color: '#2868ad' }}>Marque sua entrevista</h3>

                <Slot label='30-60min' icon={<BsFillStopwatchFill />} size="123" />
            </div>
        )
    }
    
     
    // const slotDetails = memoizedSelectedSlot
    const displayBackBtn = step === 2 && "hidden" 

    return (
        <>
        {
            isCreatingCandidate && <Loading />
        }
        <StyledContainer >
            {

                isLessThan(DEFAULT_BREAKPOINT) && (
                    <SideMenu >
                        <div 
                            style={{ 
                                width: '100%', 
                                height: 194, 
                                position: 'relative',
                                left: 0,
                                top: 0,
                                marginBottom: 32, 
                            }}>
                            <Image 
                                src={Logo} 
                                alt='Logo WA' 
                                style={{ 
                                    width: 100,
                                    minWidth: 175, 
                                    maxHeight: '100%', 
                                    objectFit: 'cover', 
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    marginLeft: '50%',
                                    marginTop: '25%',
                                    transform: 'translate(-50%, 0)' 
                                }} 
                            />
                        </div>
                        {getScheduleTitle()}
                        {
                            step && (
                                <div style={{ paddingLeft: 16, paddingRight: 16, marginTop: 'auto' }}>
                                    <AppointmentDatetimeDetails 
                                        // slots={slots} 
                                        selectedDay={selectedDay} 
                                        currStep={step} 
                                        slot={memoizedSelectedSlot} 
                                    />
                                </div>
                            )
                        }
                    </SideMenu >
                )
            }
                <Content>
                    <Header />
                    {
                        isBiggerThan(DEFAULT_BREAKPOINT) && (
                            getScheduleTitle()
                        )
                    }
                    <FormProvider {...methods}>
                    {/* <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: '100%', padding: 16 }} onError={onSubmitErr} > */}
                    
                    <FormWrapper>
                        {step && (steps[step]['component'])}
                    </FormWrapper>
                    {
                        <ConfirmationModal 
                            isOpen={isModalOpen} 
                            onCloseModal={function (): void {
                                setIsModalOpen(false)
                            }} 
                            selectedDay={selectedDay}
                            slot={memoizedSelectedSlot}
                            //confirmationData={GetConfirmationData} 
                        /> 
                    }
                    </FormProvider>
                </Content>

                <Footer>
                    {/* @ts-ignore */}
                    <div style={{ visibility: displayBackBtn }}>
                        <Button onClick={() => handleOnProgress('back')} text={'Voltar'} hollow={true} />
                    </div>
                    <Button onClick={() => handleOnProgress('forward')} text={'Avançar'} />
                </Footer>
        </StyledContainer>
        </>
    )
}


export default Form