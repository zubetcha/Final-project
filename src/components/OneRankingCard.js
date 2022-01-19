import React from 'react'
import styled from 'styled-components'

import Grid from '../elements/Grid'
import { AiOutlineThunderbolt } from 'react-icons/ai'

const OneRankingCard = ({ rank, index, first }) => {
  const styles = { first: first, index: index }
  return (
    <>
      <Container {...styles}>
        <div>
          <ProfileImage src={rank?.profileImage} {...styles}>
            <div className="rank-box">
              <p className="rank-text">{Number.isInteger(index) && index + 1}</p>
            </div>
          </ProfileImage>
        </div>
        <p className="nickname">{rank?.nickname}</p>
        <Grid flex_center>
          <AiOutlineThunderbolt />
          <span className="count">{rank?.postCount}</span>
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: ${(props) => (props.first ? '110px' : '80px')};
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  .nickname {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: 10px 0 2px;
  }
  .count {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 500;
  }
`

const ProfileImage = styled.div`
  position: relative;
  width: ${(props) => (props.first ? '100px' : '70px')};
  height: ${(props) => (props.first ? '100px' : '70px')};
  border-radius: 100px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  box-shadow: 0 4px 12px 4px hsl(0deg 0% 64% / 36%);
  .rank-box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -5px;
    background-color: ${(props) => (props.index === 0 ? '#FFD400' : props.index === 1 ? '#F97D39' : '#6698FC')};
    width: ${(props) => (props.first ? '30px' : '20px')};
    height: ${(props) => (props.first ? '30px' : '20px')};
    border-radius: 30px;
    cursor: default;
    .rank-text {
      font-size: ${(props) => (props.first ? '16px' : '12px')};
      font-weight: 700;
      height: fit-content;
    }
  }
`

export default OneRankingCard