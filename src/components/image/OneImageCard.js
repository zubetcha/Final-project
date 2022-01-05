import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { likeApi } from '../../shared/api'
import { history } from '../../redux/ConfigureStore'

import ShareBottomSheet from '../ShareBottomSheet'

import { MdShare } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { HiHeart } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'

const OneImageCard = ({ image }) => {
  const [hover, setHover] = useState(false)
  const [toggleMenu, setToggleMenu] = useState(false)
  const [likeCount, setLikeCount] = useState(image.likeCnt)
  const [isLiked, setIsLiked] = useState(image.isLike)
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

  const handleBottomSheetVisible = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setBottomSheetVisible(true)
  }

  const handleClickLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLiked) {
      await likeApi
        .likeBoard(image.boardId)
        .then((response) => {
          console.log(response.data)
          setIsLiked(false)
          setLikeCount(likeCount - 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 취소 문제 발생', error.response)
        })
    } else {
      await likeApi
        .likeBoard(image.boardId)
        .then((response) => {
          console.log(response.data)
          setIsLiked(true)
          setLikeCount(likeCount + 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 문제 발생', error.response)
        })
    }
  }

  return (
    <>
      <ImageBox
        onMouseOver={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
        onClick={() => {
          history.push(`/image/detail/${image && image.boardId}`)
        }}
      >
        <ImageThumbnail src={image && image.thumbNail}></ImageThumbnail>
        {/* {hover && ( */}
        <Overlay className={`${hover ? 'active' : 'in-active'}`}>
          <div style={{ width: '100%', height: '100%', padding: '7px 7px 5px 7px', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-between' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
              <button className="share-button" onClick={handleBottomSheetVisible}>
                <MdShare fontSize="18px" />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className="like-button">
                {isLiked ? <HiHeart style={{ fontSize: '18px' }} onClick={handleClickLike} /> : <HiOutlineHeart style={{ fontSize: '18px' }} onClick={handleClickLike} />}
              </button>
              <span className="like-count">{likeCount}</span>
            </div>
          </div>
        </Overlay>
      </ImageBox>
      {bottomSheetVisible && <ShareBottomSheet bottomSheetVisible={bottomSheetVisible} setBottomSheetVisible={setBottomSheetVisible} />}
    </>
  )
}

const ImageBox = styled.div`
  position: relative;
  max-width: 160px;
  max-height: 270px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  .active {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;
    transition: all 0.3s ease-in-out;
  }
  .inactive {
    display: none;
  }
`
const ImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Overlay = styled.div`
  .share-button {
    color: ${({ theme }) => theme.colors.white};
    z-index: 1000;
    padding: 0;
  }
  .like-button {
    color: ${({ theme }) => theme.colors.white};
    z-index: 1000;
    padding: 0 3px 0 0;
  }
  .like-count {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`

export default OneImageCard
