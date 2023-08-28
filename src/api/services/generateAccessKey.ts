import api from "..";


export async function GenerateAccessKeyService(email: string) {

    try {
        const response = await api.get("/candidates/access-key/create", { params: { email } })

        if (response.status === 200) {
            return response.data
        } 
    } catch (error) {
        console.log("err: ", error)
    }
}