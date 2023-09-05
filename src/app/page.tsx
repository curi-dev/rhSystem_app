"use client"

import Image from 'next/image'
import LoadingBars from 'react-loading-icons'

import { useRouter } from 'next/navigation'

import { useState, useEffect } from 'react'

import { Button, Loading } from '@/components'

import { StyledFooter, StyledContainer, StyledHeader, EnterKey } from './styles'
import { StyledContainer as InputContainer, HelperText, StyledInput, StyledInputWrapper } from '@/components/CustomInput/styles'

import { useCandidate } from '@/hooks/useCandidate'
import { Overlay } from '@/components/Loading/styles'
import { TypewriterEffect } from './TypewriterEffect'

import { AiFillCloseCircle, AiFillLock } from 'react-icons/ai'
import { BsBoxArrowRight } from 'react-icons/bs'
import { BiSolidErrorCircle } from 'react-icons/bi'


import HeaderImage from '../../public/header-image.jpg'
import Logo from '../../public/wa_group.jpg'


export default function Home() {
  
  const { 
    updateCandidate,
    RESET: ResetValues,
    keyValidationFailure,
    generateAccessKey, 
    iseGeneratingAccessKey, 
    candidate, 
    keyGenerationSuccess,
    keyGenerationFailure, 
    validateAccessKey, 
    isValidatingAccessKey } = useCandidate()

  const { push } = useRouter()

  const [isFocus, setIsFocus] = useState(false)
  const [showKeyField, setShowKeyField] = useState(false)
  const [key, setKey] = useState("")
  const [email, setEmail] = useState("") // adicionar verificação com regex 
  

  // review this function
  useEffect(() => {
    if (email.trim().length > 0) {

      let candidateExists = !!(Object.values(candidate).length)

      console.log("candidateExists: ", candidateExists)

      if (candidateExists) {
        setShowKeyField(true)

      } else {
        setShowKeyField(false)
        updateCandidate('Email', email)
        push('/form/1')
        
      }
    }
  }, [keyGenerationSuccess, keyGenerationFailure])

  useEffect(() => {
    ResetValues()
  }, [])

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
  
  const handleOnChange = (e: any) => {
    setKey(e.target.value)
  }

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
      //true && (
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
              <div style={{ 
                width: 350, 
                maxWidth: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                position: 'relative', 
                marginTop: 12,
              }} 
                >
                <TypewriterEffect text={key} />               
                <EnterKey onClick={handleValidateAccessKey}>
                  {
                    isValidatingAccessKey ? (
                      <LoadingBars.SpinningCircles color='#fff' />    
                    ) : (
                      (keyValidationFailure && key.length === 8) ? 
                        <BiSolidErrorCircle size={25} color='#c1131e' /> : <BsBoxArrowRight size={25} />
                    )
                  }
                </EnterKey>
                
              </div>
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
            color: 'transparent',
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
      <div style={{ 
        width: '100%', 
        maxWidth: 400, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 8
      }}
      >
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
              <StyledInput 
                onBlur={() => setIsFocus(false)} 
                onFocus={() => setIsFocus(true)} 
                value={email} 
                onChange={(ev) => setEmail(ev.target.value)} 
                style={{ paddingLeft: 12 }}
              />
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
