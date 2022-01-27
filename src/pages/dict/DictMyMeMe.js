import React from 'react'

import '../../styles/css/DictMyMeme.css'

import { DictNavBar, Header, Footer, DictMyScrapbook } from '../../components'
import { Title, Grid } from '../../elements'
import { history } from '../../redux/ConfigureStore'

const isLogin = localStorage.getItem('token')

const DictMyMeMe = () => {
  return (
    <>
      <Header location="오픈 밈사전"></Header>
      <div className="DictLayout">
        <DictNavBar />
        <Grid padding="24px 16px 10px">
          <Title>내가 스크랩한 목록</Title>
        </Grid>
        <div className="MyDictMemeSection">
          <div className="MyDictMemeList">
            {isLogin ? (
              <DictMyScrapbook />
            ) : (
              <div className="MyDictMemePlzLoginSection">
                <div className="MyDictMemePlzLoginText">로그인이 필요한 서비스에요</div>

                <div
                  className="MyDictMemeGoToLogin"
                  onClick={() => {
                    history.push('/login')
                  }}
                >
                  <button className="MyDictMemeGoToLogin1">로그인 하고 스크랩 해볼래요</button>
                  <button className="MyDictMemeGoToLogin2">
                    <svg width="46" height="10" viewBox="0 0 96 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 29H93L65.1497 1" stroke="black" stroke-width="5" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DictMyMeMe
