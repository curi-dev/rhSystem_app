
import { ButtonHTMLAttributes } from 'react'
import { StyledButton } from './styled'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    fill?: boolean
    hollow?: boolean
    size?: number | string
}


const Button: React.FC<ButtonProps> = ({ text, fill = true, hollow = false, size, ...rest }) => {

    return (
        <StyledButton $hollow={hollow} $size={size} {...rest} >
            {text}
        </StyledButton>
    )
}


export { Button }