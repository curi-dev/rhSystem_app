'use client'

import { ICandidate } from "@/models/Candidate"
import { StyledContainer, AppointmentDetailsContainer, ReadOnlyContainer, StyledInputGroup, Description } from "./styles"
import { Title } from "@/components"


interface AppointmentDetails {
    Id: string
    RoomURL: string
    Time: string
    Date: Date
    candidate: ICandidate

}

const mocked_appointments: AppointmentDetails[] = [
    { 
        Id: "",
        RoomURL: "",
        Time: "",
        Date: new Date(), 
        candidate: { Name: "Tiago Curi", Id: "", Email: "shopper.tiago@gmail.com", Phone: "21977412995" } 
    },
    { 
        Id: "",
        RoomURL: "",
        Time: "",
        Date: new Date(), 
        candidate: { Name: "Tiago Curi", Id: "",Email: "shopper.tiago@gmail.com", Phone: "21977412995" } 
    },
    { 
        Id: "",
        RoomURL: "",
        Time: "",
        Date: new Date(), 
        candidate: { Name: "Tiago Curi", Id: "", Email: "shopper.tiago@gmail.com", Phone: "21977412995" } 
    },
    { 
        Id: "",
        RoomURL: "",
        Time: "",
        Date: new Date(), 
        candidate: { Name: "Tiago Curi", Id: "", Email: "shopper.tiago@gmail.com", Phone: "21977412995" } 
    },
    { 
        Id: "",
        RoomURL: "",
        Time: "",
        Date: new Date(), 
        candidate: { Name: "Tiago Curi", Id: "", Email: "shopper.tiago@gmail.com", Phone: "21977412995" } 
    },
    { 
        Id: "",
        RoomURL: "",
        Time: "",
        Date: new Date(), 
        candidate: { Name: "Tiago Curi", Id: "", Email: "shopper.tiago@gmail.com", Phone: "21977412995" } 
    },
    
]

const Scheduled = () => {


    // @ts-ignore
    const organized_appointments: [AppointmentDetails[]] = mocked_appointments.reduce(function (acc, currValue) {

        if (!!acc.length) {
            console.log("currValue.Date: ", currValue.Date.toISOString())
            console.log("acc[acc.length -1][0]['Date']: ", (acc[acc.length -1][0]['Date'] as Date).toISOString())

            if (currValue.Date.toISOString() !== (acc[acc.length -1][0]['Date'] as Date).toISOString()) {
                // @ts-ignore
                acc.push([currValue])
            } else {
                acc[acc.length -1].push(currValue)
            }
        } else {
            acc.push([currValue])
        }

        return acc
    }, [] as any[])

    console.log("organized_appointments: ", organized_appointments)

    return (

        <StyledContainer>
            <Title text={"Agendamentos confirmados"} />
            {
                organized_appointments.map(day_appointments => {
                    {
                        <h1>{(day_appointments[0]['Date'] as Date).toISOString()}</h1>
                    }
                    
                    return day_appointments.map(A => (
                        // <div style={{ width: '48%', height: 'auto', border: '1px solid blue' }}>
                        <AppointmentDetailsContainer>
                        
                            {/* <h3 style={{ margin: 20, color: '#2868ad' }}>Confirme seus dados</h3> */}

                            <StyledInputGroup>
                                <ReadOnlyField field={'Candidato:'} value={A.candidate.Name} />
                                <ReadOnlyField field={'Email:'} value={A.candidate.Email} />
                            </StyledInputGroup>

                            <StyledInputGroup>
                                <ReadOnlyField field={'Data:'} value={A.Date.toISOString()} />
                                <ReadOnlyField field={'Hora:'} value={A.Time} />
                            </StyledInputGroup>
                            
                            <ReadOnlyField field={'Telefone:'} value={A.candidate.Phone} />
                            <ReadOnlyField field={'Currículo:'} value={"link para o currículo"} />
                            <ReadOnlyField field={'Room:'} value={"link para a sala da entrevista"} />
                        
                        </AppointmentDetailsContainer>                      
                    ))

                })
            }

        </StyledContainer>
    )
}


const ReadOnlyField: React.FC<{ field: string, value: string }> = ({ field, value }) => {


    return (
        <ReadOnlyContainer>
            {/* <div style={{ marginRight: 4 }}> */}
            <label>
                {field}
            </label>
            {/* </div> */}
            <span >
                {value || ""}
            </span>
        </ReadOnlyContainer>

    )
}



export default Scheduled