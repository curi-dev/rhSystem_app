import styled, { css } from 'styled-components'

export const Content = styled.div<{ $vertical: boolean }>`
    display: flex; 
    justify-content: space-evenly; 
    flex: 1;
    width: 100%;

    flex-direction: ${({ $vertical }) => $vertical ? 'column' : 'row'};
`

export const TimeSlotContainer = styled.div<{ $color?: string, $vertical: boolean }>`
    flex: 1;
    height: auto;
    padding: 8px;
    
    overflow: scroll;
    background-color: ${({ color }) => color ? color : 'transparent'};

    ${({ $vertical }) => {
        return $vertical ? css`

        ` : css`
            display: flex;

            & div + div {
                margin-left: 8px;
            }
        `
    }}
`

export const SlotContainer = styled.div<{ $size?: string, $clickable?: boolean, $selected: boolean, $disabled?: boolean }>`
    min-width: 80px;
    height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    margin-bottom: 8px;
    
    width: ${({ $size }) => $size ? `${$size}px` : '100%'};
    background-color: ${({ $selected, $disabled }) => $selected && !$disabled ? '#2868ad' : '#fff'};
    border-color: ${({ $disabled }) => $disabled ? '#e0e0e0' : '#2868ad'};
    color: ${({ $selected, $disabled }) => $disabled ? '#e0e0e0' : $selected ? "#fff" : '#2868ad'};
    cursor: ${({ $clickable, $disabled }) => $disabled ? 'not-allowed' : $clickable && 'pointer'};

    & svg {
        margin-right: 4px;
    }

`