import api from "..";


export async function ConfirmAppointmentService(appointmentId: string) {

    try {
        const response = await api.get("/appointments/confirm", { params: { appointmentId } })

        if (response.status === 200) {
            return response.data
        } 
    } catch (error) {
        console.log("err: ", error)
    }
}