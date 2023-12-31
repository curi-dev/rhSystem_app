import styled from 'styled-components'


export const StyledContainer = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    max-width: 872px;

    margin: 0 auto;

    background-color: #fff;

    box-shadow: 0 1em 3em rgba(156, 136, 255,0.2);

    position: relative;
`

export const Content = styled.div`
    width: 100%;
    flex: 1;

    padding-bottom: 84px;
`

export const FormWrapper = styled.form`
    width: 100%; 
    padding: 16px;
`

export const SideMenu = styled.menu`
    width: 33%;
    border-right-color: #c0c0c0;
    border-right-width: 1px;
    border-right-style: solid;
    
    display: flex;
    flex-direction: column;
    
    padding-bottom: 84px;

    & h3 {
        color: #000000;
        font-size: 20px;
        margin-bottom: 16px;
    }

`

export const Footer = styled.footer`
    width: 100%;
    height: 74px;
    max-width: 872px;
  
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

    //visibility: hidden;
`


// export const LogoWrapper = styled.div`
//     width: 100%; height: 102; position: relative; margin-top: 20; margin-bottom: 32;

//     & img {
//         width: 100;
//         min-width: 175; 
//         max-height: 100%; 
//         object-fit: cover; 
        
//         position: absolute;
//         top: 0;
//         left: 0;
        
//         margin-left: 50%;
//         transform: translateX(-50%); 
//     }

// `

