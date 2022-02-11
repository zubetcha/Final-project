import React from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import { Spinner } from '../components'

const GoogleLoginHandler = (props) => {
  const dispatch = useDispatch()

  let code = new URL(window.location.href).searchParams.get('code')

  React.useEffect(() => {
    const googleLogin = async () => {
      await dispatch(userActions.googleLoginDB(code))
    }
    googleLogin()
  }, [])

  return (
    <>
      <Spinner />
    </>
  )
}

export default GoogleLoginHandler
