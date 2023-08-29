import React, { useEffect, useMemo } from 'react';
//import { Calendar } from "react-modern-calendar-datepicker";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import { utils } from '@amir04lm26/react-modern-calendar-date-picker';

import { Title } from '@/components';

import { Description } from '../PersonalData/styles';
import { TimeSlotContainer, SlotContainer } from './styles'

import { BsFillCalendarCheckFill } from 'react-icons/bs'

// import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { useSlots } from '@/hooks/useSlots';



interface CalendarProps {
    values: any
    actions: any
}

// elevation of state
const CalendarComponent: React.FC<CalendarProps> = ({ actions, values }) => {

    const { slots, fetchSlots, isLoadingSlots, avaiableSlots = [] } = useSlots()
    
    console.log("avaiableSlots: ", avaiableSlots)

    useEffect(() => {
        fetchSlots()
    }, [])

    const handleIsDisabled = (slotValue: string): boolean => {
        const hasSelectedDay = !!(values.selectedDay)
        const slotIsAvaiable = (avaiableSlots as number[])?.includes(Number(slotValue))

        return !hasSelectedDay || !slotIsAvaiable
    }


    return (
        <>
            <Description>
                Escolha o dia e a hora
            </Description>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
                <BsFillCalendarCheckFill size={25} color="#2868ad" />
                <Title text={"Horários disponíveis"} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', flex: 1, width: '100%' }} >
            
                <Calendar
                    // @ts-ignore
                    value={values.selectedDay}
                    // @ts-ignore
                    onChange={actions.onChangeSelectedDay}
                    colorPrimary='#c0c0c0'
                    //minimumDate={{ day: dayValue.day , month: dayValue.month, year: dayValue.year }}
                    minimumDate={utils('en').getToday()}
                    //maximumDate={{ day: 30, month: 9, year: 2023 }}

                    // renderFooter={true}
                    calendarClassName='custom-calendar'
                />

                <TimeSlotContainer >
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
            
            </div>
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

    console.log("disabled: ", disabled)

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