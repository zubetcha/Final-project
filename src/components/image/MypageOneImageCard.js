import React from 'react'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'
import { imageApi } from '../../shared/api'

import Grid from '../../elements/Grid'
import ConfirmModal from '../modal/ConfirmModal'
import { ReactComponent as DeleteIcon } from '../../styles/icons/delete_black_18dp.svg'
import { ReactComponent as EmptyHeart } from '../../styles/icons/좋아요 비활성_18dp.svg'

const MyPageOneImageCard = ({ image }) => {
  const boardId = image && image.boardId
  const createdDate = image && image.createdAt.split('T')[0]

  const [showModal, setShowModal] = React.useState(false)

  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(!showModal)
  }

  const handleDeleteImage = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await imageApi
      .deleteImage(boardId)
      .then((response) => {
        console.log(response.data)
      })
      .then(() => {
        window.location.reload()
      })
      .catch((error) => {
        console.log('이미지 삭제 문제 발생', error.response)
      })
  }

  return (
    <>
      <Wrapper
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          history.push(`/image/detail/${image.boardId}`)
        }}
      >
        <ImageSection>
          <Image src={image && image.thumbNail} />
        </ImageSection>
        <Grid flex_between padding="6px">
          <p className="createdDate">{image && createdDate}</p>
          {/* <Grid flex_align>
            <EmptyHeart />
            <span style={{ fontSize: '12px', paddingLeft: '4px' }}>{image && image.likeCnt}</span>
          </Grid> */}
          <DeleteIcon onClick={handleShowModal} style={{ cursor: 'pointer' }} />
        </Grid>
        {/* <DateSection>
          <p className="createdDate">{image && createdDate}</p>
        </DateSection> */}
      </Wrapper>
      {showModal && (
        <ConfirmModal question="밈짤을 삭제하시겠어요?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
          <DeleteButton onClick={handleDeleteImage}>삭제</DeleteButton>
        </ConfirmModal>
      )}
    </>
  )
}

const Wrapper = styled.div`
  position: relative;
  max-width: 200px;
  width: 100%;
  height: auto;
  margin-bottom: 16px;
  /* border-radius: 8px; */
  box-shadow: 0 4px 20px 4px hsl(0deg 0% 64% / 35%);
  display: flex;
  flex-direction: column;
  .createdDate {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.grey};
    text-align: right;
    padding: 3px 6px 5px;
  }
`

const ImageSection = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`

const Image = styled.img`
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
  /* border-top-right-radius: 8px; */
  /* border-top-left-radius: 8px; */
`

const DateSection = styled.div`
  height: 100%;
  .createdDate {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.grey};
    text-align: right;
    padding: 3px 6px 5px;
  }
`

const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default MyPageOneImageCard
