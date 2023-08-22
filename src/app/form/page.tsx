"use client"

import { TextField } from "@mui/material"

import { StyledContainer } from './styles'


const Form = () => {


    return (
        <StyledContainer>
            <TextField id="outlined-basic" label="Nome completo" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Telefone" variant="outlined" />
            <TextField id="outlined-basic" label="CEP" variant="outlined" />
            <TextField id="outlined-basic" label="Endereço" variant="outlined" />
            <TextField id="outlined-basic" label="Número" variant="outlined" />
            <TextField id="outlined-basic" label="Complemento" variant="outlined" />
            <TextField id="outlined-basic" label="Bairro" variant="outlined" />
            <TextField id="outlined-basic" label="Cidade" variant="outlined" />
            <TextField id="outlined-basic" label="Estado" variant="outlined" />        
        </StyledContainer>
    )
}


export default Form