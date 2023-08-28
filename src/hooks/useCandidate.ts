import { CandidatesContext } from '@/providers/CandidatesProvider'
import { useContext } from 'react'


const useCandidate = () => {
    const context = useContext(CandidatesContext)

    if (!context) {
        throw new Error("hook must be used within a provider")
    }

    const { 
        createCandidate,
        isCreatingCandidate,
        candidateCreationSuccess,
        candidateCreationFailure,
        updateCandidate,
        RESET,
        validateKeyErrorMessage,
        isValidatingAccessKey,
        keyValidationFailure,
        keyValidationSuccess,
        validateAccessKey,
        generateAccessKey, 
        iseGeneratingAccessKey, 
        candidate, 
        keyGenerationFailure, 
        keyGenerationSuccess } = context

    return {
        createCandidate,
        isCreatingCandidate,
        candidateCreationSuccess,
        candidateCreationFailure,
        updateCandidate,
        RESET,
        validateKeyErrorMessage,
        isValidatingAccessKey,
        keyValidationFailure,
        keyValidationSuccess,
        validateAccessKey,
        generateAccessKey,
        iseGeneratingAccessKey,
        candidate,
        keyGenerationFailure,
        keyGenerationSuccess
    }
}


export { useCandidate }