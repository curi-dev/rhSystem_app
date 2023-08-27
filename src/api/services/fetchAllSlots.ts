import api from "..";


export async function fetchAllSlotsService() { // not a good name

    const response = await api.get("/slots/index")

    if (response.status === 200) {
        return response.data
    }


    return false
}