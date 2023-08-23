import Image from 'next/image'

import { Container } from './styles'

import HeaderImage from './header-image.jpg'

const Header = () => {


    return (
        <Container>
            <Image src={HeaderImage} alt={'call-center'} fill />           
        </Container>
    )
}


export { Header }