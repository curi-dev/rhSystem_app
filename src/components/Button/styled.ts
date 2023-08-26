import styled, { css } from 'styled-components'


export const StyledButton = styled.button<{ $hollow?: boolean, $size?: number | string }>`
    width: ${({ $size }) => $size ? $size : '128px'};
    height: 55px;
    background-color: #000000;
    background-color: #2868ad;
    outline: none;
    border: 0;
    border-radius: 6px;
    cursor: pointer;

    font-size: 16px;
    font-weight: 900;
    //font-family: 'Poppins', 'sans-serif';

    ${({ $hollow }) => {
        if ($hollow) {
            return css`
                background-color: #fff;
                outline: none;
                border: 1px solid #000000;
                border: 1px solid #2868ad;
                color: #2868ad;
            `
        }
    }}
`