import styled from 'styled-components'


export const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    overflow: hidden;

    max-width: 872px;

    margin: 0 auto;

    background-color: #fff;
`

export const Content = styled.div`
    width: 100%;
    flex: 1;
    padding: 16;
`

export const SideMenu = styled.menu`
    width: 33%;
    //min-width: 173px;
    border-right-color: #c0c0c0;
    //border-right-color: #c0131d;
    border-right-width: 1px;
    border-right-style: solid;
    
    padding: 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-bottom: 84px;

    & h3 {
        color: #000000;
        font-size: 20px;
        margin-bottom: 16px;
    }

`

export const Footer = styled.footer`
    width: 100%;
    max-width: 872px;
    height: 84px;

    display: flex;
    padding: 16px;
    align-items: center;
    justify-content: space-between;

    border-top: 1px;
    border-top-color: #c0c0c0;
    border-top-style: solid;

    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    background-color: #fff;
    z-index: 15;

    //column-gap: calc(calc(100%) * 0.05);

    /* padding-left: calc(calc(100%) * 0.20);
    padding-right: calc(calc(100%) * 0.20); */
`

export const InterviewInformation = styled.div`
    margin-bottom: 16px;
    background-color: #f8f9fc;
    border-radius: 12px;
    height: 218px;
    width: 100%;

    color: #000000;

    padding: 16px;

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

