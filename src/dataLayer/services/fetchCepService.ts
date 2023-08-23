

export function FetchCepService(cep: string) {

    console.log("fetch cep service")

    fetch(`viacep.com.br/ws/${cep}/json/`)
    .then(r => {

    })
    .catch(e => {
        console.error(e)

    })
    .finally(() => {
        console.log("no answer")
    })
    
}