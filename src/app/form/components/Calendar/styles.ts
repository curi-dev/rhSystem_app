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

export const SlotContainer = styled.div<{ size?: string, clickable?: boolean }>`
    width: ${({ size }) => size ? `${size}px` : '100%'};
    height: 39px;

    color: #2868ad;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 8px;
    border: 1px solid #2868ad;
    margin-bottom: 8px;

    cursor: ${({ clickable }) => clickable && "pointer"};

    & svg {
        margin-right: 4px;
    }

`