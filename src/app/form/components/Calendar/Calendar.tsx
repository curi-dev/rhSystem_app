import React from 'react';

import { Calendar } from "react-modern-calendar-datepicker";

import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { Description } from '../PersonalData/styles';
import { Title } from '@/components';

import { TimeSlotContainer, SlotContainer } from './styles'


import { BsFillCalendarCheckFill } from 'react-icons/bs'


const CalendarComponent = () => {

    
    const [selectedDay, setSelectedDay] = React.useState(null);

    return (
        <>
            <Description>
                Agende sua entrevista
            </Description>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
                <BsFillCalendarCheckFill size={25} color="#2868ad" />
                <Title text={"Horários disponíveis"} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }} >
                <Calendar
                    // @ts-ignore
                    value={selectedDay}
                    // @ts-ignore
                    onChange={setSelectedDay}
                    shouldHighlightWeekends

                    calendarClassName='custom-calendar'
                />

                <TimeSlotContainer >
                    {Array.from({ length: 15 }).map(s => (
                        <Slot clickable={true} />
                    ))}
                </TimeSlotContainer >
            </div>
        </>   
    )
}


export const Slot: React.FC<{ label?: string, icon?: React.ReactNode, size?: string, clickable?: boolean }> = ({ label, icon, size, clickable }) => {

    return (
        <SlotContainer size={size} clickable={clickable}>         
            {icon}
            
            {label ?? "10:00h"}
        </SlotContainer>
    )
}


export { CalendarComponent }