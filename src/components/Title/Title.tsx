import { StyledContainer } from './styles'


const Title: React.FC<{ text: string }> = ({ text }) => {

    return (
        <StyledContainer>
            <h2>
                {text}
            </h2>
        </StyledContainer>
    )
}


export { Title }