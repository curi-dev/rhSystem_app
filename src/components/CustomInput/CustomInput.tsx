"use client"

import InputMask from 'react-input-mask'
import { InputHTMLAttributes, useState } from 'react'

import { StyledContainer, StyledInput, StyledInputWrapper, HelperText } from './styles'

import { AiOutlineUpload } from 'react-icons/ai'


interface InputWrapperProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    field?: string
    helperText?: string
}

const Input: React.FC<InputWrapperProps> = ({ field, label, helperText, ...props }) => {

    const [isFocus, setIsFocus] = useState(false)

    const { type } = props

    const isFileInput = (type === 'file')

    return  (
        <StyledContainer>
            <label htmlFor={field}>
                {label}
            </label>
            <StyledInputWrapper $isFocus={isFocus} $display={!isFileInput}>
                {
                    type === 'file' && (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: '#c0c0c0'}}>
                                Upload do arquivo
                            </span>
                            <AiOutlineUpload color="#c0c0c0" />
                        </div>
                    )
                }          
                <StyledInput 
                    onBlur={() => setIsFocus(false)} 
                    onFocus={() => {
                        console.log("onFocus")
                        return setIsFocus(true)
                    }} 
                    
                    // @ts-ignore
                    $display={!isFileInput}
                    
                    {...props}
                />
            </StyledInputWrapper>
            <HelperText>
                {helperText}
            </HelperText>
        </StyledContainer>
    )
}

interface InputMaskComponentProps extends InputWrapperProps {
    mask: string
}

// Will work fine
const InputMaskComponent: React.FC<InputMaskComponentProps> = ({ label, field, mask }) => (

    
    <InputMask mask={mask} value={""} onChange={() => console.log("on change")}>
        {/* @ts-ignore */}
      {(inputProps) => <Input {...inputProps} label={label} field={field} />}
    </InputMask>
)





export { Input, InputMaskComponent }