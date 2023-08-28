import { AxiosResponse } from "axios"
import api from ".."


//export async function ValidateAccessKeyService(key: string, candidate: string): Promise<AxiosResponse<any, string> | null> {
export async function ValidateAccessKeyService(key: string, candidate: string) {
    
    try {
        const response = await api.get("/candidates/access-key/use", { params: { key, candidate } })

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

    return null
}

