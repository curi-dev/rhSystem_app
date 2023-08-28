import api from "..";


export async function CreateAppointmentService(appointment: any) {

    console.log("appointment: ", appointment)

    try {
        const response = await api.post("/appointments/create", appointment)

        if (response.status === 200) {
            return response.data
        } 
        
    } catch (error: any) {
        console.log("error [service]: ", error.response.data)
        return {
            error: true,
            message: error.response.data
        }
    }
}