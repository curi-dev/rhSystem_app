import LoadingBars from 'react-loading-icons'

import { Overlay } from './styles'

const Loading = () => {


    return (
        <Overlay>
            <LoadingBars.SpinningCircles color='#fff' />    
            {/* <LoadingBars.ThreeDots color='#000000' stroke="#2868ad"  /> */}
        </Overlay>
    )
}

export { Loading }