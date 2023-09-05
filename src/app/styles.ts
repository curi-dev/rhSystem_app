import styled from 'styled-components'


export const StyledContainer = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
  
    max-width: 872px;
    min-width: 320px;

    margin: 0 auto;
    
    background-color: #fff;

    position: relative;

    box-shadow: 0 1em 3em rgba(156, 136, 255,0.2);
`

export const StyledHeader = styled.div`

    width: 100%; 
    height: 257px; 
    position: relative;
    margin-bottom: 24px;
    
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
    height: 92px;
    margin-top: auto;
    
    text-align: center;

    padding: 24px;
`

export const EnterKey = styled.div`
    background-color: transparent;
    border: none;
    
    cursor: pointer;
    z-index: 1000;
`
