import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import { Spinner } from '../components'

import styled from 'styled-components'

const GoogleLoginHandler = (props) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.user)

  let code = new URL(window.location.href).searchParams.get('code')

  React.useEffect(async () => {
    await dispatch(userActions.googleLoginDB(code))
  }, [])
  return (
    <BackGround>
      <Spinner />
    </BackGround>
  )
}

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  margin: 100px 0 0 0;
`

export default GoogleLoginHandler
