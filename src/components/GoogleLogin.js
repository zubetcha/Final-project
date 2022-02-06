import React from 'react'
import styled from 'styled-components'
import { ReactComponent as GoogleLogo } from '../styles/image/google_color.svg'

const GoogleButton = (props) => {
  let _clientId = process.env.REACT_APP_GOOGLE_API_KEY
  let _callBack = process.env.REACT_APP_GOOGLE_CALLBACK_URL

  return (
    <>
      <a
        onClick={() => {
          window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${_clientId}&redirect_uri=${_callBack}&response_type=code&scope=email%20profile%20openid&access_type=offline`
        }}
      >
        <Background>
          <WhiteBack>
            <GoogleLogo fill="" width="30px" height="30px" />
          </WhiteBack>
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
  background-color: white;
  overflow: hidden;
`

const WhiteBack = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default GoogleButton
