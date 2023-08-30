import styled from 'styled-components'


export const Description = styled.span`
    font-size: 16px;
    color: #c0c0c0;

    margin-bottom: 8px;

`

export const ReadOnlyContainer = styled.div`
    flex: 1;

    & div label {
        color: #000000;
        color: #2868ad;
        font-weight: 700;
    }
`

export const SeparatorContainer = styled.div`
    margin-bottom: 8px;
`

export const StyledInputGroup = styled(SeparatorContainer)`
    display: flex;
    column-gap: 12px;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    flex: 1;
`