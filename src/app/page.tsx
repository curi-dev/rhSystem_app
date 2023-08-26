"use client"
import Image from 'next/image'
import { useState } from 'react'
import { StyledFooter, StyledContainer, StyledHeader } from './styles'
import { StyledContainer as InputContainer, HelperText, StyledInput, StyledInputWrapper } from '@/components/CustomInput/styles'

import HeaderImage from './header-image.jpg'

import Logo from '../../public/wa_group.jpg'
import { Button } from '@/components'


export default function Home() {

  const [isFocus, setIsFocus] = useState(false)

  const [email, setEmail] = useState("")


  return (
    <StyledContainer>
      <StyledHeader>
        <Image src={HeaderImage} alt={'call-center'} fill />
      </StyledHeader>
      <div style={{ width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Image 
          src={Logo} 
          alt='Logo WA' 
          style={{ width: 150, marginBottom: 32 }} 
        />
        <InputContainer $size={'100%'}>
          <label >
              Email do candidato
          </label>
          <StyledInputWrapper $isFocus={isFocus} >
              <StyledInput placeholder='  Digite seu email aqui' />
          </StyledInputWrapper>

          <HelperText>
              {/* helper text */}
          </HelperText>
        </InputContainer>
        <Button text={'Começar'} size={"100%"} />
      </div>
      <StyledFooter>
        @ Todos os direitos reservados.
      </StyledFooter>
    </StyledContainer>
  )
}
