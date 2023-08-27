"use client"

import Image from 'next/image'

import { useState } from 'react'

import { useForm, FormProvider } from 'react-hook-form'

import { Button, Header } from '../../components'
import { Slot } from './components/Calendar/Calendar'

import { StyledContainer, Footer, SideMenu, Content } from './styles'
import { CalendarComponent, PersonalData } from './components'
import { Description } from './components/PersonalData/styles'

import { BsFillStopwatchFill } from 'react-icons/bs'
import { ConfirmationModal } from './components/ConfirmationModal/ConfirmationModal'
import { DayValue } from 'react-modern-calendar-datepicker'
import { SlotTimeValue } from './components/Calendar/interfaces'

import { useSlots } from '@/hooks/useSlots'

import Logo from '../../../public/wa_group.jpg'
import { AppointmentDatetimeDetails } from '@/components/AppointmentDatetimeDetails/AppointmentDatetimeDetails'


const Form = () => {
    const methods = useForm({ mode: 'onBlur',  })
    const { formState: { errors }, getValues } = methods

    const { fetchAvailableSlots, slots } = useSlots()
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
        let currSelectedSlot = slots.find(s => s.value === slot)

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

    const time = getTime()

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

                <div style={{ paddingLeft: 16, paddingRight: 16, marginTop: 'auto' }}>
                    <AppointmentDatetimeDetails 
                        slots={slots} 
                        selectedDay={selectedDay} 
                        currStep={step} 
                        slot={slot} 
                        time={time} 
                    />
                </div>

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