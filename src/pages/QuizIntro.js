import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { history } from '../redux/ConfigureStore'
import { actionCreators as quizActions } from '../redux/modules/quiz'
import { mainApi } from '../shared/api'

import Header from '../components/Header'
import Footer from '../components/Footer'
import QuizIntroImage from '../styles/image/quiz_main_image_3.gif'
import Spinner from '../components/Spinner'
import Grid from '../elements/Grid'

const QuizIntro = (props) => {
  const dispatch = useDispatch()
  const levelList = ['lv1', 'lv2', 'lv3']

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }, [])

  useEffect(() => {
    async function submitVisitors() {
      try {
        const result = await mainApi.countVisitors()
      } catch (error) {
        console.log('방문자 전송 문제 발생', error.response)
      }
    }
    submitVisitors()
  }, [])

  return (
    <>
      <Header type="QuizIntro" location="밈퀴즈" />
      <Wrapper>
        {/* {loading ? (
          <Spinner />
        ) : ( */}
        <>
          <img src={QuizIntroImage} className="quiz-intro-gif" alt="퀴즈 인트로 움짤" />
          <Grid flex_center column>
            <div style={{ padding: '20px 0 10px' }}>
              <p className="subject-question">
                어느 레벨의 밈을
                <br />
                테스트하고 싶으신가요?
              </p>
            </div>
            {levelList.map((level, index) => {
              return (
                <div className="subject-button-box" onClick={() => history.push(`/quiz/${level}`)}>
                  <button className="subject-button">Lv. {index + 1}</button>
                </div>
              )
            })}
          </Grid>
          <div style={{ width: '100%', height: '6px' }}></div>
        </>
        {/* )} */}
        <Footer />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 56px 0 0;
  margin: 0 0 80px;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .quiz-intro-gif {
    width: 100.5%;
    object-fit: cover;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
    object-fit: cover;
  }
  .subject-question {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-family: 'YdestreetL';
    font-style: normal;
    font-weight: normal;
    text-align: center;
  }
  .subject-button-box {
    width: 100%;
    padding: 12px 48px;
    .subject-button {
      width: 100%;
      height: fit-content;
      padding: 15px 24px;
      border: 2px solid ${({ theme }) => theme.colors.black};
      text-align: left;
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-family: 'Pretendard Variable';
      font-style: normal;
      font-weight: 500;
      transition: background-color 0.1s ease-in-out;
      &:hover {
        background-color: ${({ theme }) => theme.colors.yellow};
      }
    }
  }
`

export default QuizIntro
