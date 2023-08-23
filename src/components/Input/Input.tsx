"use client"

import React from 'react'
import { IMaskInput } from 'react-imask'

import TextField from "@mui/material/TextField"

import { StyledContainer } from './styles'


interface InputWrapperProps {
    label: string

}

const InputWrapper: React.FC<InputWrapperProps> = ({ label }) => {

    return (
        <StyledContainer>
            <TextField 
                //id="outlined-basic" 
                label={label} 
                variant="outlined" 
                style={{ width: '100%' }} 
                inputProps={{
                    // @ts-ignore
                    inputComponent: TextMaskCustom as any
                }}
            />
        </StyledContainer>
    )
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
            {...other}
            mask="(#00) 000-0000"
            definitions={{
                '#': /[1-9]/,
            }}
            // @ts-ignore
            inputRef={ref}
            //ref={ref}
            onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            overwrite
            />
        )
    },
)



export { InputWrapper }