import styled from 'styled-components'
import css from 'styled-jsx/css';


export const TimeSlotContainer = styled.div<{ color?: string }>`
    width: 123px;
    height: 500px;
    padding: 8px;
    
    //border: 1px solid #c0c0c0;
    //border-radius: 12px;

    position: 'absolute';
    right: 0;
    top: 0;
    
    overflow: scroll;
    background-color: ${({ color }) => color ? color : 'transparent'};
`

export const SlotContainer = styled.div<{ $size?: string, $clickable?: boolean, $selected: boolean, $disabled?: boolean }>`
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