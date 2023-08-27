import styled from 'styled-components'


export const StyledContainer = styled.div`
    margin-bottom: 16px;
    background-color: #f8f9fc;
    border-radius: 12px;
    height: 100%;
    max-height: 218px;
    width: 100%;

    color: #000000;

    padding: 16px;

    position: relative;

    //margin-top: auto;

    & > div {
        height: 50%;

        & > div:first-child {
            
            margin-bottom: 6px;

            & span {
                font-weight: 300;
                font-size: 14px;
            }
        }

        & div span {
            font-weight: 700;
            font-size: 18px;
        }      
    }
`