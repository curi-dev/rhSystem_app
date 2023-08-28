import styled from 'styled-components'


export const Overlay = styled.div<{ $opacity?: number }>`
    width: 100%;
    height: 100%;
    background-color: ${({ $opacity }) => `rgba(0, 0, 0, ${$opacity})`}; 
    position: absolute; 
    left: 0; 
    top: 0; 
    display: flex; 
    align-items: center; 
    justify-content: center;
`