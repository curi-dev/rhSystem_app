"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useForm, FormProvider } from 'react-hook-form'
import { DayValue } from 'react-modern-calendar-datepicker'

import { CalendarComponent, PersonalData } from './components'
import { Slot } from './components/Calendar/Calendar'
import { ConfirmationModal, IConfirmationData } from './components/ConfirmationModal/ConfirmationModal'
import { Description } from './components/PersonalData/styles'

import { Button, Header } from '@/components'
import { AppointmentDatetimeDetails } from '@/components/AppointmentDatetimeDetails/AppointmentDatetimeDetails'

import { useSlots } from '@/hooks/useSlots'

import { Slot as ISlot, SlotTimeValue } from './components/Calendar/interfaces'

import { StyledContainer, Footer, SideMenu, Content } from './styles'

import { BsFillStopwatchFill } from 'react-icons/bs'

import Logo from '../../../../public/wa_group.jpg'

// import { IAppointment } from '../../../models/Appointment'
// import { useAppointments } from '@/hooks/useAppointments'


const Form = ({ params: { step: paramsStep } }: { params: { step: number } }) => {
    
    const methods = useForm({ mode: 'onBlur',  })
    const { formState: { errors }, getValues } = methods
    
    const { fetchAvailableSlots, slots } = useSlots()
    
    const [step, setStep] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState<DayValue | null>(null);
    const [slot, setSlot] = useState<SlotTimeValue | null>(null)

    useEffect(() => {
        if (!step) {
            setStep(paramsStep)
        }
    }, [paramsStep])
    

    const handleOnCalendarChange = (v: DayValue) => {
        console.log("V: ", v)

        setSelectedDay(v)

        fetchAvailableSlots(v)
    }

    const handleOnProgress = (num: number) => {
        let validStep = step as number

        if (num < 0) {
            setStep(validStep + (num))       
            return 
        }

        let fieldFilled = steps[validStep]['validate']()

        if (fieldFilled) {
            steps[validStep]['next']()
        }
    }

    function getSlotDetails(): ISlot | undefined {
        let currSelectedSlot = slots.find(s => Number(s.Value as string) == slot)

        console.log("currSelectedSlot: ", currSelectedSlot)

        return currSelectedSlot
    }
    
    function GetConfirmationData(): IConfirmationData {
        const { name, email, phone } = getValues()
        
        return { email, name, phone, selectedDay, slot: getSlotDetails() }
    }


    const steps: any = {
        1: {
            'component': <PersonalData />,
            next: () => {
                setStep((step as number) +1)
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
        2: {
            component: <CalendarComponent values={{ selectedDay, slot }} 
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
    
    
   
    const slotDetails = getSlotDetails()
    const displayBackBtn = step === 0 && "hidden" 


    // const onSubmit = (data: any) => {
        
    //     console.log("data being send: ", data)

    //     if (!selectedDay || !slot) {
    //         return 
    //     }

    //     const candidateId = sessionStorage.getItem("candidate")

    //     const newAppointment = {
    //         id: candidateId || "",
    //         email: data.email,
    //         phone: data.phone || "",
    //         splitted_date: selectedDay,
    //         slot,
    //     } as IAppointment

    //     sendNewAppointment(newAppointment)
    // };

    //const onSubmitErr = (err: any) => console.log("Submit error: ", err)


    return (
        <>
        <StyledContainer>
            <SideMenu >
                <div 
                    style={{ 
                        width: '100%', 
                        height: 194, 
                        position: 'relative',
                        left: 0,
                        top: 0,
                        marginBottom: 32, 
                        //border: '2px solid #c1131e' 
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
                <div style={{ padding: 16 }}>
                    <Description>
                        #Processo seletivo
                    </Description>
                    

                    <h3 style={{ marginTop: 12, color: '#2868ad' }}>Marque sua entrevista</h3>

                    <Slot label='30-60min' icon={<BsFillStopwatchFill />} size="123" />
                </div>
                {
                    step && (
                        <div style={{ paddingLeft: 16, paddingRight: 16, marginTop: 'auto' }}>
                            <AppointmentDatetimeDetails 
                                // slots={slots} 
                                selectedDay={selectedDay} 
                                currStep={step} 
                                slot={slotDetails} 
                            />
                        </div>
                    )
                }
            </SideMenu >
                <Content>
                    <Header />
                    <FormProvider {...methods}>
                    {/* <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: '100%', padding: 16 }} onError={onSubmitErr} > */}
                    
                    <form style={{ width: '100%', padding: 16 }} >
                        {step && (steps[step]['component'])}
                    </form>
                    {
                        <ConfirmationModal 
                            isOpen={isModalOpen} 
                            onCloseModal={function (): void {
                                setIsModalOpen(false)
                            }} 
                            confirmationData={GetConfirmationData} 
                        /> 
                    }
                    </FormProvider>
                </Content>


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