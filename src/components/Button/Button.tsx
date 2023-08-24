
import { ButtonHTMLAttributes } from 'react'
import { StyledButton } from './styled'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    fill?: boolean
    hollow?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, fill = true, hollow = false, ...props }) => {


    return (
        <StyledButton {...props} $hollow={hollow} >
            {text}
        </StyledButton>
    )
}


export { Button }