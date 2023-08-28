"use client"

import { createContext, useState } from 'react'
import { useRouter } from 'next/navigation'

import { CreateAccessKeyService, ValidateAccessKeyService, CreateCandidateService } from '@/api/services'
import { ICandidate } from '@/models/Candidate'



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
    createCandidate: (candidate: ICandidate) => Promise<boolean>
    isCreatingCandidate: boolean
    candidateCreationSuccess: boolean
    candidateCreationFailure: boolean
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
    const [candidate, setCandidate] = useState<ICandidate>({} as ICandidate)
    const [validateKeyErrorMessage, setValidateKeyErrorMessage] = useState<string | null>(null)

    const [isCreatingCandidate, setIsCreatingCandidate] = useState(false)
    const [candidateCreationSuccess, setCandidateCreationSuccess] = useState(false)
    const [candidateCreationFailure, setCandidateCreationFailure] = useState(false)

    console.log("candidate: ", candidate)

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

    const createCandidate = async (candidate: ICandidate): Promise<boolean> => {

        setIsCreatingCandidate(true)
      
        const response =  await CreateCandidateService(candidate)

        if (response.error) {
            console.error("e [create function]: ", response)

            //setValidateKeyErrorMessage(response.message)
            setCandidateCreationFailure(true)
            setCandidateCreationSuccess(false)

            setIsCreatingCandidate(false)
            return false
        } else {
            console.log("candidate created! [context]", response)
            setCandidate({ Id: response.Id, ...candidate })

            setCandidateCreationSuccess(true)
            setCandidateCreationFailure(false)

            setIsCreatingCandidate(false)
            return true
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