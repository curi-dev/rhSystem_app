import LoadingBars from 'react-loading-icons'

import { Overlay } from './styles'

const Loading: React.FC<{ overlayOpacity?: number }> = ({ overlayOpacity }) => {


    return (
        <Overlay $opacity={overlayOpacity}>
            <LoadingBars.SpinningCircles color='#fff' />    
            {/* <LoadingBars.ThreeDots color='#000000' stroke="#2868ad"  /> */}
        </Overlay>
    )
}

export { Loading }