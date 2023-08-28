"use client"

import { createContext, useState } from 'react'
import { useRouter } from 'next/navigation'

import { GenerateAccessKeyService, ValidateAccessKeyService } from '@/api/services'
import { ICandidate } from '@/models/Candidate'



interface CandidatesProviderInterface {
    generateAccessKey: (email: string) => Promise<any> 
    iseGeneratingAccessKey: boolean
    candidate: ICandidate | null
    keyGenerationSuccess: boolean
    keyGenerationFailure: boolean
    validateAccessKey: (key: string) => void
    isValidatingAccessKey: boolean
    keyValidationSuccess: boolean
    keyValidationFailure: boolean
    validateKeyErrorMessage: string | null
    RESET: () => void 
}

// APLICAR USEREDUCER
const CandidatesContext = createContext<CandidatesProviderInterface>({} as CandidatesProviderInterface)


const CandidatesProvider = ({ children }: any) => {
  
    const { push } = useRouter()
    
    // loading states
    const [iseGeneratingAccessKey, setIsGeneratingAccessKey] = useState(false)
    const [keyGenerationSuccess, setKeyGenerationSuccess] = useState(false)
    const [keyGenerationFailure, setkeyGenerationFailure] = useState(false)
    const [isValidatingAccessKey, setIsValidatingAccessKey] = useState(false)
    const [keyValidationSuccess, setKeyValidationSuccess] = useState(false)
    const [keyValidationFailure, setkeyValidationFailure] = useState(false)
    const [candidate, setCandidate] = useState<ICandidate | null>(null)
    const [validateKeyErrorMessage, setValidateKeyErrorMessage] = useState<string | null>(null)

    console.log("candidate: ", candidate)
    
    const RESET = () => {
        setCandidate(null)
        setKeyGenerationSuccess(false)
        setkeyGenerationFailure(false)
        setKeyValidationSuccess(false)
        setkeyValidationFailure(false)
    }

    const generateAccessKey = async (email: string) => {

        setIsGeneratingAccessKey(true)
        setTimeout(() => {
            GenerateAccessKeyService(email)
            .then(r => {
                console.log("key generated! Candidate:", r)

                setKeyGenerationSuccess(true)
                setkeyGenerationFailure(false)

                if (r) {
                    setCandidate(r)
                } 
                
                // push("/form/1")
            })
            .catch(e => {
                console.error("e: ", e)
                setkeyGenerationFailure(true)
                setKeyGenerationSuccess(false)
            })
            .finally(() => {
                setIsGeneratingAccessKey(false)
            })
        }, 3000)

    }

    const validateAccessKey = async (key: string) => {

        setIsValidatingAccessKey(true)
        setTimeout(async () => {
            if (candidate) {
                const response =  await ValidateAccessKeyService(key, candidate?.Id)

                if (response.error) {
                    console.error("e [validate function]: ", response)

                    setValidateKeyErrorMessage(response.message)
                    setkeyValidationFailure(true)
                    setKeyValidationSuccess(false)
                } else {
                    console.log("key validated! [context]", response)

                    setKeyValidationSuccess(true)
                    setkeyValidationFailure(false)

                    push("/form/2")
                }

                setIsValidatingAccessKey(false)
            }
            
        }, 3000)

    }



    return (
        <CandidatesContext.Provider value={{
            generateAccessKey,
            iseGeneratingAccessKey,
            candidate,
            keyGenerationSuccess,
            keyGenerationFailure,
            isValidatingAccessKey,
            keyValidationSuccess,
            keyValidationFailure,
            validateAccessKey,
            validateKeyErrorMessage,
            RESET
        }}>

            {children}

        </CandidatesContext.Provider>
    )
}

export default CandidatesProvider
export { CandidatesContext }