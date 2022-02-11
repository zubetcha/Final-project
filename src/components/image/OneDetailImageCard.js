import React, { useState, forwardRef } from 'react'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'
import { imageApi, likeApi } from '../../shared/api'
import { useIsLoginState } from '../../shared/IsLoginContext'

import { Grid, ProfileImage } from '../../elements'
import { ShareBottomSheet, ConfirmModal, ConfirmButton } from '..'

import { ReactComponent as DeleteIcon } from '../../styles/icons/size(28*28)(30*30)/bin_28dp.svg'
import { ReactComponent as ShareIcon } from '../../styles/icons/size(28*28)(30*30)/share_28dp.svg'
import { ReactComponent as EmptyHeartIcon } from '../../styles/icons/size(28*28)(30*30)/heart_blank_28dp.svg'
import { ReactComponent as FullHeartIcon } from '../../styles/icons/size(28*28)(30*30)/heart_filled_28dp.svg'

const OneDetailImageCard = forwardRef((props, ref) => {
  const { image } = props

  const username = sessionStorage.getItem('username')
  const isLogin = useIsLoginState()

  const [likeCount, setLikeCount] = useState(image.likeCnt)
  const [isLiked, setIsLiked] = useState(image.isLike)
  const [shareVisible, setShareVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(!showModal)
  }

  const handleShareVisible = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShareVisible(!shareVisible)
  }

  const handleClickLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isLogin) {
      setShowLoginModal(true)
      return
    }
    if (isLiked) {
      await likeApi
        .likeBoard(image?.boardId)
        .then((response) => {
          setIsLiked(false)
          setLikeCount(likeCount - 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 취소 문제 발생', error.response)
        })
    } else {
      await likeApi
        .likeBoard(image?.boardId)
        .then((response) => {
          setIsLiked(true)
          setLikeCount(likeCount + 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 문제 발생', error.response)
        })
    }
  }

  const handleDeleteImage = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await imageApi
      .deleteImage(image?.boardId)
      .then((response) => {})
      .then(() => {
        window.location.replace('/image')
      })
      .catch((error) => {
        console.log('이미지 삭제 문제 발생', error.response)
      })
  }

  return (
    <>
      <Container ref={ref}>
        <Grid flex_between padding="16px">
          <Grid flex_align>
            <ProfileImage src={image?.profileImageUrl} size="40" />
            <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column' }}>
              <ImageWriter>{image?.writer}</ImageWriter>
              <ImageCreatedAt>{image?.createdAt.split('T')[0]}</ImageCreatedAt>
            </div>
          </Grid>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ShareIcon className="icon" onClick={handleShareVisible} />
            {image.username === username && <DeleteIcon className="icon" style={{ margin: '0 0 0 16px' }} onClick={handleShowModal} />}
            {/* <DeleteIcon className="icon" style={{ margin: '0 0 0 16px' }} onClick={handleShowModal} /> */}
          </div>
        </Grid>
        <Grid flex_center height="fit-content">
          <img src={image?.thumbNail} style={{ width: '100%' }} alt="짤 이미지" />
        </Grid>
        <Grid flex_align padding="10px 16px 20px">
          {isLiked ? <FullHeartIcon className="icon" onClick={handleClickLike} /> : <EmptyHeartIcon className="icon" onClick={handleClickLike} />}
          <ImageLikeCount>{likeCount}</ImageLikeCount>
        </Grid>
      </Container>
      <ShareBottomSheet type="image" shareVisible={shareVisible} setShareVisible={setShareVisible} thumbNail={image?.thumbNail} boardId={image?.boardId} />
      <ConfirmModal question="밈짤을 삭제하시겠어요?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
        <ConfirmButton _onClick={handleDeleteImage}>삭제</ConfirmButton>
      </ConfirmModal>
      <ConfirmModal showModal={showLoginModal} setShowModal={setShowLoginModal} title="로그인 후 이용할 수 있어요!" question="로그인 페이지로 이동하시겠어요?">
        <ConfirmButton _onClick={() => history.push('/login')}>이동</ConfirmButton>
      </ConfirmModal>
    </>
  )
})

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ImageWriter = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
`
const ImageCreatedAt = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.white};
`
const ImageLikeCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.white};
  padding: 0 0 0 5px;
`

export default OneDetailImageCard
