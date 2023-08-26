"use client"
import Image from 'next/image'
import { useState } from 'react'
import { StyledFooter, StyledContainer, StyledHeader } from './styles'
import { StyledContainer as InputContainer, HelperText, StyledInput, StyledInputWrapper } from '@/components/CustomInput/styles'

import HeaderImage from './header-image.jpg'

import Logo from '../../public/wa_group.jpg'


export default function Home() {

  const [isFocus, setIsFocus] = useState(false)

  return (
    <StyledContainer>
      <StyledHeader>
        <Image src={HeaderImage} alt={'call-center'} fill />
      </StyledHeader>
      <div style={{ marginTop: 382, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image 
          src={Logo} 
          alt='Logo WA' 
          style={{ width: 150, marginRight: 20 }} 
        />
        <InputContainer>
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
      </div>
      <StyledFooter>
        @ Todos os direitos reservados.
      </StyledFooter>
    </StyledContainer>
  )
}
