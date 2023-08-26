import React, { useEffect } from 'react';
import { Calendar, DayValue } from "react-modern-calendar-datepicker";

import { Title } from '@/components';

import { SlotTimeValue } from './interfaces';

import { Description } from '../PersonalData/styles';
import { TimeSlotContainer, SlotContainer } from './styles'

import { BsFillCalendarCheckFill } from 'react-icons/bs'

import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { useSlots } from '@/hooks/useSlots';

// #c1131e
export const months = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
}

export const slots_mock = [
    { id: "", value: SlotTimeValue.SLOT_1, label: "6:00 AM - 7:00 AM" },
    { id: "", value: SlotTimeValue.SLOT_2, label: "7:00 AM - 8:00 AM" },
    { id: "", value: SlotTimeValue.SLOT_3, label: "8:00 AM - 9:00 AM" },
    { id: "", value: SlotTimeValue.SLOT_4, label: "9:00 AM - 10:00 AM" },
    { id: "", value: SlotTimeValue.SLOT_5, label: "10:00 AM - 11:00 AM" },
    { id: "", value: SlotTimeValue.SLOT_6, label: "11:00 AM - 12:00 PM" },
    { id: "", value: SlotTimeValue.SLOT_8, label: "12:00 PM - 13:00 PM" },
    { id: "", value: SlotTimeValue.SLOT_9, label: "13:00 AM - 14:00 PM" },
    { id: "", value: SlotTimeValue.SLOT_10, label: "14:00 PM - 15:00 PM" },
    { id: "", value: SlotTimeValue.SLOT_11, label: "15:00 PM - 16:00 PM" },
    { id: "", value: SlotTimeValue.SLOT_12, label: "16:00 PM - 17:00 PM" }
]

interface CalendarProps {
    values: any
    actions: any
    isModalOpen: boolean
}

// elevation of state
const CalendarComponent: React.FC<CalendarProps> = ({ actions, values, isModalOpen }) => {

    const { slots, fetchSlots, isLoadingSlots } = useSlots()

    useEffect(() => {
        fetchSlots()
    }, [])

    

    return (
        <>
            <Description>
                Escolha o dia e a hora
            </Description>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
                <BsFillCalendarCheckFill size={25} color="#2868ad" />
                <Title text={"Horários disponíveis"} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'stretch', flex: 1, width: '100%' }} >
            
                <Calendar
                    // @ts-ignore
                    value={values.selectedDay}
                    // @ts-ignore
                    onChange={actions.onChangeSelectedDay}
                    
                    shouldHighlightWeekends

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
                            slots && slots.length > 0 && slots.map((s, i) => (
                                <Slot 
                                    label={s.Label.split(" - ")[0]}
                                    key={i} 
                                    clickable={true} 
                                    onChangeSlotTime={() => actions.onChangeSlot(s.Value)} 
                                    selected={values.slot === s.Value}  
                                    disabled={!(values.selectedDay)}                        
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