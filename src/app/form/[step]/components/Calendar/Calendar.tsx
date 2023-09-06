import React, { useEffect, useMemo } from 'react';
//import { Calendar } from "react-modern-calendar-datepicker";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import { utils } from '@amir04lm26/react-modern-calendar-date-picker';

import { Title } from '@/components';

import { Description } from '../PersonalData/styles';
import { TimeSlotContainer, SlotContainer, Content } from './styles'

import { BsFillCalendarCheckFill } from 'react-icons/bs'

import { useSlots } from '@/hooks/useSlots';
import { useWindowSize } from '@/hooks/useWindowSize';

import { DEFAULT_BREAKPOINT } from '@/constants'



interface CalendarProps {
    values: any
    actions: any
}

// elevation of state
const CalendarComponent: React.FC<CalendarProps> = ({ actions, values }) => {

    const { slots, fetchSlots, isLoadingSlots, avaiableSlots = [] } = useSlots()
    const { isBiggerThan, isLessThan } = useWindowSize()
    
    useEffect(() => {
        fetchSlots()
    }, [])

    const handleIsDisabled = (slotValue: string): boolean => {
        const hasSelectedDay = !!(values.selectedDay)
        const slotIsAvaiable = (avaiableSlots as number[])?.includes(Number(slotValue))

        return !hasSelectedDay || !slotIsAvaiable
    }

    const getMinimumDateTomorrow = () => {
        const tomorrow = new Date()

        tomorrow.setDate(tomorrow.getDate() +1)

        console.log("today: ", tomorrow)

        return { day: tomorrow.getDate(), month: tomorrow.getMonth() +1, year: tomorrow.getFullYear() }
    }

    getMinimumDateTomorrow()

    return (
        <>
            <Description>
                Escolha o dia e a hora
            </Description>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
                <BsFillCalendarCheckFill size={25} color="#2868ad" />
                <Title text={"Horários disponíveis"} />
            </div>

            <Content $vertical={isBiggerThan(DEFAULT_BREAKPOINT)}>
            
                <Calendar
                    // @ts-ignore
                    value={values.selectedDay}
                    // @ts-ignore
                    onChange={actions.onChangeSelectedDay}
                    colorPrimary='#c0c0c0'
                    minimumDate={getMinimumDateTomorrow()}
                    calendarClassName='custom-calendar'
                />

                <TimeSlotContainer $vertical={isLessThan(DEFAULT_BREAKPOINT)} >
                    {
                        isLoadingSlots ? (
                            <span>
                                isLoadingSlots
                            </span>
                        ) : (
                            slots && slots.length > 0 && slots.map((slot, i) => (
                                <Slot 
                                    label={slot.Label.split(" - ")[0]}
                                    key={i} 
                                    clickable={true} 
                                    onChangeSlotTime={() => actions.onChangeSlot(slot.Value)} 
                                    selected={values.slot === slot.Value}  
                                    disabled={handleIsDisabled(slot.Value)}                        
                                />
                            ))
                        )
                    }
                </TimeSlotContainer >
            
            </Content>
        </>   
    )
}

interface SlotProps {
    selected?: boolean 
    label?: string 
    icon?: React.ReactNode 
    size?: string 
    clickable?: boolean 
    onChangeSlotTime?: () => void
    disabled?: boolean
}


export const Slot: React.FC<SlotProps> = ({ selected, label, icon, size, clickable, onChangeSlotTime, disabled }) => {

    return (
        <SlotContainer 
            $size={size} 
            $clickable={clickable} 
            onClick={() => {
                if (!disabled && onChangeSlotTime) onChangeSlotTime()
            }}
            $selected={selected ?? false}
            $disabled={disabled}
        >         
            {icon}{label}
        </SlotContainer>
    )
}


export { CalendarComponent }