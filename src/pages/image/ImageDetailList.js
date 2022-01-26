import React, { useEffect, useRef, createRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import { actionCreators as imageActions } from '../../redux/modules/image'

import { ImageWrapper, Footer, OneDetailImageCard } from '../../components'
import InfinityScroll from '../../shared/InfinityScroll'

import { ReactComponent as ArrowBackIcon } from '../../styles/icons/arrow_back_ios_black_24dp.svg'

const ImageDetailList = (props) => {
  const dispatch = useDispatch()
  const imageData = useSelector((state) => state.image)
  const boardId = imageData.boardId
  const index = imageData.image_list.findIndex((image) => image.boardId === boardId)
  /* map 메소드 안의 여러 DOM 요소 중 하나를 참조해야 할 때*/
  const imageRefs = useRef(imageData.image_list.map(() => createRef()))

  const getImageList = () => {
    dispatch(imageActions.getImageListDB(imageData.page))
  }

  useEffect(() => {
    imageRefs.current[index]?.current.scrollIntoView()
  }, [])

  useEffect(() => {
    if (imageData.image_list.length === 0) {
      dispatch(imageActions.getImageListDB(0))
    }
  }, [dispatch])

  return (
    <>
      <ImageWrapper>
        <Header>
          <ArrowBackIcon className="icon" onClick={() => history.replace('/image')} />
        </Header>
        <Container>
          <InfinityScroll type="white" callNext={getImageList} paging={{ next: imageData.has_next }}>
            {imageData.image_list.map((image, i) => {
              return <OneDetailImageCard ref={imageRefs.current[i]} key={`image-detail-${image.boardId}`} image={image} />
            })}
          </InfinityScroll>
        </Container>
        <Footer />
      </ImageWrapper>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 56px 0 0;
  padding: 0 0 90px;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Header = styled.div`
  width: 100%;
  height: 56px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.grey}; */
  background-color: #000;
`

export default ImageDetailList
