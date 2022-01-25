import React from 'react'
import styled from 'styled-components'
import { Grid } from '../elements'
import RobotSpinner from '../styles/image/spinner.png'

const NotFound = (props) => {
  return (
    <>
      <Grid flex_center height="100%">
        <SpinnerBox>
          <img src={RobotSpinner} className="spinner-robot" alt="로봇 캐릭터 이미지" />
          <div className="spinner-text">
            잘못된 경로입니다!
            <br />
            <a href="/" className="move-to-main">
              여기
            </a>
            를 클릭하면 메인 페이지로 이동합니다.
          </div>
        </SpinnerBox>
      </Grid>
    </>
  )
}

const SpinnerBox = styled.div`
  max-width: 300px;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .spinner-text {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    padding: 20px 0 0 0;
    color: #767676;
    text-align: center;
  }
  .spinner-robot {
    width: 100px;
    height: 100px;
  }
  .move-to-main {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 900;
    padding: 20px 0 0 0;
    color: #767676;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.1s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.colors.blue};
    }
  }
`

export default NotFound
