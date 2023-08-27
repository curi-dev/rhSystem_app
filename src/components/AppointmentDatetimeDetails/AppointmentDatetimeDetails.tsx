
import { DayValue } from 'react-modern-calendar-datepicker'
import { StyledContainer } from './styles'
import { SlotTimeValue } from '@/app/form/components/Calendar/interfaces'


interface AppointmentDatetimeDetailsProps {
    slots: any
    selectedDay: DayValue
    currStep?: number
    slot: SlotTimeValue | null
    time: any // type time / not semanthic
}


const AppointmentDatetimeDetails: React.FC<AppointmentDatetimeDetailsProps> = ({ slots, selectedDay, currStep, slot, time }) => {


    return (
        <StyledContainer>

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
                            currStep === 0 ? "Próxima Etapa" : "Por favor Selecione"
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
                    time ? time['label'] : (
                        currStep === 0 ? "Próxima Etapa" : "Por favor Selecione"
                    )
                }
                </span>
            </div>
        </div>
        </StyledContainer>
    )
}


export { AppointmentDatetimeDetails }