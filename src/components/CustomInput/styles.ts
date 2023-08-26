import styled, { css } from 'styled-components'


export const StyledContainer = styled.div`
    width: 354px;
    margin-bottom: 24px;

    & label {
        color: #000000;
        color: #2868ad;
        font-weight: 700;
    }
`; 


export const StyledInputWrapper = styled.div<{ $isFocus?: boolean, $display?: boolean }>`
    width: 100%;
    height: 54px;
    
    margin-top: 4px;

    background-color: transparent;
    background-color: #fff;
    border-radius: 4px;

    border-color: ${({ $isFocus }) => $isFocus ? "#2868ad" : "#c0c0c0"};
    //border-color: ${({ $isFocus, $display }) => $display ? $isFocus ? "#2868ad" : "#c0c0c0" : "transparent"};
    border-width: 0.5px;
    border-style: solid;

    padding: 8px;
    padding-left: 12px;

    cursor: pointer;

    position: relative;

`

export const StyledInput = styled.input<{ $display?: string }>`
    width: 100%;
    height: 100%;

    background-color: transparent;
    outline: none;
    border: none;
    color: #000000;
    font-size: 16px;

    cursor: pointer;

    ${({ $display }) => {
        if (!$display) {
            return css`
                //background-color: #fff;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 15;
            `
        }
    }}
`

export const HelperText = styled.span<{ $hasError?: boolean }>`
    height: 15px;
    color: ${({ $hasError }) => $hasError ? 'red' : '#c0c0c0'};
    font-size: 12px;
    width: 100%; max-width: 100%;
    font-weight: 700;
`

