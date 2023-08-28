import { ICandidate } from "@/models/Candidate";
import api from "..";



export async function CreateCandidateService(candidate: ICandidate) {

    console.log("candidate: ", candidate)

    try {
        const response = await api.post("/candidates/create", candidate)

        console.log("response [service]: ", response)

        if (response.status === 201) {
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