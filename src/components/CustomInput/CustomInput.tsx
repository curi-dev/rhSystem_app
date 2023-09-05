"use client"

import { InputHTMLAttributes, useEffect, useState } from 'react'
import InputMask from 'react-input-mask'

import { useFormContext } from 'react-hook-form'

import { StyledContainer, StyledInput, StyledInputWrapper, HelperText } from './styles'

import { AiOutlineUpload } from 'react-icons/ai'
import { useCandidate } from '@/hooks/useCandidate'


interface InputWrapperProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    field: string
    helperText?: string
    needsUpdateOnBlur?: (value: string) => void
    registerOptions: any
    customSize?: string
}

const Input: React.FC<InputWrapperProps> = ({ 
    field, 
    label, 
    helperText, 
    needsUpdateOnBlur = null, 
    customSize = undefined,
    registerOptions = { required: true }, ...props }) => {

    const { register, formState: { errors }, trigger, watch } = useFormContext()
    const { updateCandidate } = useCandidate()

    const fieldValue = watch(field)
    
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
        <StyledContainer $size={customSize}>
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
                        let capitalizedField = field.replace(field[0], field[0].toUpperCase())
                        updateCandidate(capitalizedField, fieldValue)
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
const InputMaskComponent: React.FC<InputMaskComponentProps> = ({ label, field, mask, registerOptions, ...rest }) => {

    const [maskValue, setValueMask] = useState("")
    const [isFocus, setIsFocus] = useState(false)

    const { updateCandidate } = useCandidate()
    const { register, trigger, formState: { errors }, setValue, watch } = useFormContext()
   
    const fieldValue = watch(field)

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
            
                setValue(field, fieldValue)
            }} 

            {...rest}

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
                        let capitalizedField = field.replace(field[0], field[0].toUpperCase())
                        updateCandidate(capitalizedField, fieldValue)
                        
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