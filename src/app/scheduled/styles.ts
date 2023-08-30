import styled from 'styled-components'


export const StyledContainer = styled.div`
    width: 100%;
    max-width: 872px;

    margin: 0 auto;
    padding: 16px;

    background-color: #fff;

    box-shadow: 0 1em 3em rgba(156, 136, 255,0.2);
`

export const AppointmentDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 248px;

    border-radius: 12px;
    border: 2px solid #2868ad;
    padding: 26px;
    margin-bottom: 16px;

    position: relative;
`


export const Description = styled.span`
    font-size: 16px;
    color: #c0c0c0;

    margin-bottom: 8px;

`

export const ReadOnlyContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 35px;

    & label {
        color: #2868ad;
        font-weight: 700;
        margin-right: 4px;
    }

    & span {
        font-size: 16px;
        color: #c0c0c0;
    }
`

export const StyledInputGroup = styled.div`
    width: 100%;
    display: flex;
    column-gap: 12px;
`

export const AppointmentActionsWrapper = styled.div`
    position: absolute;
    right: 16px;
    bottom: 16px;

    display: flex; align-items: center;

    
    & svg {
        cursor: pointer;
        margin-left: 12px;
    }
`



