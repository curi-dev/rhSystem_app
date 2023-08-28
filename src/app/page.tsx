"use client"

import Image from 'next/image'
import LoadingBars from 'react-loading-icons'

import { useRouter } from 'next/navigation'

import { useState, useEffect } from 'react'

import { Button, Loading } from '@/components'

import { StyledFooter, StyledContainer, StyledHeader, EnterKey } from './styles'
import { StyledContainer as InputContainer, HelperText, StyledInput, StyledInputWrapper } from '@/components/CustomInput/styles'


import HeaderImage from './header-image.jpg'
import Logo from '../../public/wa_group.jpg'
import { useCandidate } from '@/hooks/useCandidate'
import { Overlay } from '@/components/Loading/styles'
import { TypewriterEffect } from './TypewriterEffect'

import { AiFillCloseCircle, AiFillLock } from 'react-icons/ai'
import { BsBoxArrowRight } from 'react-icons/bs'
import { BiSolidErrorCircle } from 'react-icons/bi'



export default function Home() {
  
  const { 
    RESET: ResetValues,
    validateKeyErrorMessage,
    keyValidationFailure,
    generateAccessKey, 
    iseGeneratingAccessKey, 
    candidate, 
    keyGenerationSuccess, 
    validateAccessKey, 
    isValidatingAccessKey } = useCandidate()

  const { push } = useRouter()

  const [isFocus, setIsFocus] = useState(false)
  const [showKeyField, setShowKeyField] = useState(false)
  const [key, setKey] = useState("")

  // adicionar verificação com regex 
  const [email, setEmail] = useState("")

  console.log("email: ", email)

  const handleGenerateAccessKey = () => {
    if (email.trim().length < 1) {
      return
    }

    generateAccessKey(email)
  }

  const handleValidateAccessKey = () => {
    if (key.length === 8) {
      validateAccessKey(key)
    }
  }

  
  useEffect(() => {
    if (email.trim().length > 0) {
      if (candidate) {
        setShowKeyField(true)
      } else {
        console.log("não acaba nunca")
        push("/form/1")
      }
    }
  }, [candidate])

  
  const handleOnChange = (e: any) => {
    setKey(e.target.value)
  }

  console.log("validateKeyErrorMessage: ", validateKeyErrorMessage)

  const handleCloseKeyAccessArea = () => {
    setShowKeyField(false)
    setKey("")
    setEmail("")

    ResetValues()
  }

  return (
    <>
    {
      iseGeneratingAccessKey && (
        <Loading />
      )
    }
    {
      showKeyField && (
      // true && (
        <>
        <Overlay>
          <div style={{ position: 'absolute', right: 15, top: 15, cursor: 'pointer', zIndex: 1000 }} onClick={handleCloseKeyAccessArea}>
            <AiFillCloseCircle size={30} />
          </div>  
            <div style={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',     
            }}>
              <div style={{ height: 50, marginBottom: 8 }}>
                <AiFillLock size={50} />
              </div>
              <span>Digite a chave de acesso</span>
              <div style={{ width: 350, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', marginTop: 12 }} >
                <TypewriterEffect text={key} />
                
                <EnterKey onClick={handleValidateAccessKey}>
                  {
                    isValidatingAccessKey ? (
                      <LoadingBars.SpinningCircles color='#fff' />    
                    ) : (
                      (keyValidationFailure && key.length === 8) ? 
                        <BiSolidErrorCircle size={35} color='#c1131e' /> : <BsBoxArrowRight size={30} />
                    )
                  }
                </EnterKey>
                
              </div>
              {/* {
                keyValidationFailure && (
                  <span style={{ alignSelf: 'flex-start', fontSize: 12, color: '#c1131e', fontWeight: 900 }}>{validateKeyErrorMessage}</span>
                )
              } */}
            </div>
        <input
          maxLength={8}
          onChange={handleOnChange} 
          style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            zIndex: 999, 
            backgroundColor: 'transparent',
            color: 'transparent'
          }} 
        />
        </Overlay>
        </>
      )
    }
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
              <StyledInput placeholder='  Digite seu email aqui' value={email} onChange={(ev) => setEmail(ev.target.value)} />
          </StyledInputWrapper>

          <HelperText>
              {/* helper text */}
          </HelperText>
        </InputContainer>
        <Button text={'Começar'} size={"100%"} onClick={handleGenerateAccessKey} />
      </div>
      <StyledFooter>
        @ Todos os direitos reservados.
      </StyledFooter>
    </StyledContainer>
    </>
  )
}
