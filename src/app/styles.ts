import styled, { css } from 'styled-components'


export const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 872px;

    margin: 0 auto;
    padding: 16px;

    background-color: #fff;

    position: relative;
`

export const StyledHeader = styled.div`

    position: absolute; top: 0; left: 0; width: 100%; height: 300px; 
    
    & img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
    }

`

export const StyledFooter = styled.footer`
    width: 100%;
    background-color: #c1131e;
    height: 96px;
    margin-top: auto;
    position: absolute;
    bottom: 0;
    left: 0;

    text-align: center;

    padding: 24px;
`

