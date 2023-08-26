import api from "..";


export async function fetchAllSlotsService() {

    const response = await api.get("/slots/index")

    if (response.status === 200) {
        return response.data
    }


    return false
}