"use client"

import { createContext, useState } from 'react'
import { useRouter } from 'next/navigation'

import { CreateAccessKeyService, ValidateAccessKeyService, CreateCandidateService } from '@/api/services'
import { ICandidate } from '@/models/Candidate'

import { useToast } from '@/hooks/useToast'



interface CandidatesProviderInterface {
    generateAccessKey: (email: string) => Promise<any> 
    iseGeneratingAccessKey: boolean
    candidate: ICandidate 
    keyGenerationSuccess: boolean
    keyGenerationFailure: boolean
    validateAccessKey: (key: string) => void
    isValidatingAccessKey: boolean
    keyValidationSuccess: boolean
    keyValidationFailure: boolean
    validateKeyErrorMessage: string | null
    RESET: () => void 
    updateCandidate: (field: string, value: string) => void
    createCandidate: (candidate: ICandidate) => Promise<void>
    isCreatingCandidate: boolean
    candidateCreationSuccess: boolean
    candidateCreationFailure: boolean
}

// APLICAR USEREDUCER
const CandidatesContext = createContext<CandidatesProviderInterface>({} as CandidatesProviderInterface)


const CandidatesProvider = ({ children }: any) => {
  
    const { push } = useRouter()
    const { warning } = useToast()
    
    const [candidate, setCandidate] = useState<ICandidate>({} as ICandidate)
    console.log("Candidate: ", candidate)
    
    // loading states
    const [isValidatingAccessKey, setIsValidatingAccessKey] = useState(false)
    const [iseGeneratingAccessKey, setIsGeneratingAccessKey] = useState(false)
    const [isCreatingCandidate, setIsCreatingCandidate] = useState(false)
    
    // success
    const [keyGenerationSuccess, setKeyGenerationSuccess] = useState(false)
    const [keyValidationSuccess, setKeyValidationSuccess] = useState(false)
    const [candidateCreationSuccess, setCandidateCreationSuccess] = useState(false)
    
    // failures
    const [keyGenerationFailure, setkeyGenerationFailure] = useState(false)
    const [keyValidationFailure, setkeyValidationFailure] = useState(false)
    const [candidateCreationFailure, setCandidateCreationFailure] = useState(false)
    
    // errors messages
    const [validateKeyErrorMessage, setValidateKeyErrorMessage] = useState<string | null>(null)


    const updateCandidate = (field: string, value: string) => {
        // @ts-ignore
        setCandidate({ [field]: value, ...candidate })
    }
    
    const RESET = () => {
        setCandidate({} as ICandidate)
        setKeyGenerationSuccess(false)
        setkeyGenerationFailure(false)
        setKeyValidationSuccess(false)
        setkeyValidationFailure(false)
    }

    const createCandidate = async (candidate: ICandidate): Promise<void> => {

        setIsCreatingCandidate(true)
      
        const response =  await CreateCandidateService(candidate)

        if (response.error) {
            console.error("e [create function]: ", response)

            //setValidateKeyErrorMessage(response.message)
            setCandidateCreationFailure(true)
            setCandidateCreationSuccess(false)

            setIsCreatingCandidate(false)

            warning(response.message, 5000)
            
        } else {
            
            console.log("candidate created! [context]", response)
            
            setCandidate( { Id: response.Id, ...candidate } )

            setCandidateCreationSuccess(true)
            setCandidateCreationFailure(false)

            setIsCreatingCandidate(false)
        }
    }

    const generateAccessKey = async (email: string) => {

        setIsGeneratingAccessKey(true)
        setTimeout(() => {
            CreateAccessKeyService(email)
            .then(r => {
                console.log("key generated! Candidate:", r)

                setKeyGenerationSuccess(true)
                setkeyGenerationFailure(false)

                if (r) {
                    setCandidate(r)
                } 
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
            if (!!(Object.values(candidate).length)) {
                const response =  await ValidateAccessKeyService(key, candidate?.Id as string)

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
            RESET,
            updateCandidate,
            createCandidate,
            isCreatingCandidate,
            candidateCreationSuccess,
            candidateCreationFailure,
        }}>

            {children}

        </CandidatesContext.Provider>
    )
}

export default CandidatesProvider
export { CandidatesContext }