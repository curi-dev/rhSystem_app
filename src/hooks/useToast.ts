import { toast } from 'react-toastify'


const useToast = () => {

    const success = (message: string, durationMs: number) => {
        toast.success(message, {
            position: "top-right",
            autoClose: durationMs,
            hideProgressBar: false,
            pauseOnHover: true,
            progress: 1,
            theme: "colored",
        })

    }

    const warning =  (message: string, durationMs: number) => {
        toast.success(message, {
            position: "top-right",
            autoClose: durationMs,
            hideProgressBar: false,
            pauseOnHover: true,
            progress: 1,
            theme: "colored",
        })

    }

    return {
        success,
        warning
    }
}


export { useToast }