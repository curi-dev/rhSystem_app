import styled from 'styled-components'


export const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
  
    max-width: 872px;

    margin: 0 auto;
    
    background-color: #fff;

    position: relative;
`

export const StyledHeader = styled.div`

    width: 100%; 
    height: 334px; 
    position: relative;
    margin-bottom: 32px;
    
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

export const EnterKey = styled.div`
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center; justify-content: center;

    border-radius: 50%;
    background-color: transparent;
    border: none;

    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(110%);

    cursor: pointer;
    z-index: 1000;
`
