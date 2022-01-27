import React from 'react'
import styled from 'styled-components'
import { ReactComponent as KakaoLogo } from '../styles/image/kakaotalk.svg'

const KakaoButton = (props) => {
  let _apiKey = process.env.REACT_APP_KAKAO_API_KEY
  let _callBack = process.env.REACT_APP_KAKAO_CALLBACK_URL

  return (
    <>
      <a
        onClick={() => {
          window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${_apiKey}&redirect_uri=${_callBack}&response_type=code`
        }}
      >
        <Background>
          <BlackBack>
            <KakaoLogo fill="#FFE330" width="60px" height="55px"></KakaoLogo>
          </BlackBack>
        </Background>
      </a>
    </>
  )
}

const Background = styled.div`
  width: 53px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 50px;
  background-color: #ffe330;
  overflow: hidden;

  -webkit-appearance: none;
`

const BlackBack = styled.div`
  background-color: #3a1d1d;
  border: none;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37px;
  height: 30px;

  -webkit-appearance: none;
`

export default KakaoButton
