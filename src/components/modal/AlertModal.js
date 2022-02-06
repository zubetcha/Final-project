import React from 'react'
import styled from 'styled-components'
import Backdrop from '@mui/material/Backdrop'
import ModalContainer from './ModalContainer'

const AlertModal = React.memo(({ showModal, children }) => {
  return (
    <>
      <Backdrop open={showModal} sx={{ zIndex: 10000 }}>
        <ModalContainer type="alert">
          <AlertText>{children}</AlertText>
        </ModalContainer>
      </Backdrop>
    </>
  )
})

const AlertText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
<<<<<<< HEAD
=======
  font-weight: 500;
>>>>>>> 1c18f66015b63eef4263bacd5c7295e5220d32d0
`

export default AlertModal
