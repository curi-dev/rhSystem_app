"use client"

import { InputHTMLAttributes, useEffect, useState } from 'react'
import InputMask from 'react-input-mask'

import { useFormContext } from 'react-hook-form'

import { StyledContainer, StyledInput, StyledInputWrapper, HelperText } from './styles'

import { AiOutlineUpload } from 'react-icons/ai'


interface InputWrapperProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    field: string
    helperText?: string
    needsUpdateOnBlur?: (value: string) => void
    registerOptions: any
}

const Input: React.FC<InputWrapperProps> = ({ 
    field, 
    label, 
    helperText, 
    needsUpdateOnBlur = null, 
    registerOptions = { required: true }, ...props }) => {

    const { register, formState: { errors }, trigger } = useFormContext()
    
    const [isFocus, setIsFocus] = useState(false)

    const { type } = props

    const isFileInput = (type === 'file')

    const getHelperText = () => {
        if (Object.keys(errors).includes(field)) {
            return <HelperText $hasError>
                    {/* @ts-ignore */}
                    {errors.field?.message || "verifique novamente o campo"}
                </HelperText>
             
        }
        return <HelperText>
                {helperText}
            </HelperText>
    }


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
                    { ...register(field, registerOptions) } 
                    
                    //value={self}
                    onBlur={() => {
                        trigger(field)
                        setIsFocus(false)
                    }} 
                    onFocus={() => setIsFocus(true)} 
                    
                    // @ts-ignore
                    $display={!isFileInput}
                    
                    {...props}
                />
            </StyledInputWrapper>
            
            {getHelperText()}
            
        </StyledContainer>
    )
}

interface InputMaskComponentProps extends InputWrapperProps {
    mask: string
}

// Will work fine
const InputMaskComponent: React.FC<InputMaskComponentProps> = ({ label, field, mask, registerOptions }) => {

    const [maskValue, setValueMask] = useState("")
    const [isFocus, setIsFocus] = useState(false)

    const { register, trigger, formState: { errors }, setValue } = useFormContext()
    console.log("errors: ", errors)

    useEffect(() => {
        register(field, registerOptions)
    }, [])

    const getHelperText = () => {
        if (Object.keys(errors).includes(field)) {
            return <HelperText $hasError>
                    {/* @ts-ignore */}
                    {errors.field?.message || "verifique novamente o campo"}
                </HelperText>          
        }
    }


    return (
        <InputMask 
            mask={mask} 
            value={maskValue}
            onChange={(e) => {
                const updatedValue = e.target.value
                setValueMask(updatedValue)

                const fieldValue = updatedValue.replace(/[-()]/g, "").replace(" ", "")
                console.log("fieldValue: ", fieldValue)

                setValue(field, fieldValue)
            }} 

        >
        {/* @ts-ignore */}
        {(inputProps) => (
             <StyledContainer>
             <label htmlFor={field}>
                 {label}
             </label>
             <StyledInputWrapper $isFocus={isFocus} >
                 <StyledInput
                     onBlur={() => {
                         trigger(field)
                         setIsFocus(false)
                     }} 
                     onFocus={() => setIsFocus(true)} 
                     {...inputProps}
                 />
             </StyledInputWrapper>
             
             {getHelperText()}
             
         </StyledContainer>
        )}
        </InputMask>
)}





export { Input, InputMaskComponent }