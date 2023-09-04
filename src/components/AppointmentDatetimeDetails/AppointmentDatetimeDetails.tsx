
import { DayValue } from 'react-modern-calendar-datepicker'
import { StyledContainer } from './styles'
import { Slot } from '@/app/form/[step]/components/Calendar/interfaces'


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

interface AppointmentDatetimeDetailsProps {
    selectedDay: DayValue
    currStep?: number
    slot: Slot | undefined
}


const AppointmentDatetimeDetails: React.FC<AppointmentDatetimeDetailsProps> = ({ selectedDay, currStep, slot }) => {

    

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
                            ) : currStep && (
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
                    slot?.Label ? slot.Label : currStep && (
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