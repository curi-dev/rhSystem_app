import api from "..";


export async function GetAppointmentsService() {

    try {
        const response = await api.get("/appointments/index")

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