
import { ButtonHTMLAttributes } from 'react'
import { StyledButton } from './styled'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    fill?: boolean
    hollow?: boolean
    size?: number | string
}

const Button: React.FC<ButtonProps> = ({ text, fill = true, hollow = false, size, ...props }) => {


    return (
        <StyledButton {...props} $hollow={hollow} $size={size} >
            {text}
        </StyledButton>
    )
}


export { Button }