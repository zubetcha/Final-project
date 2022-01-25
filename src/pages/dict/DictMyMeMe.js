import React from 'react'

import '../../styles/css/DictMyMeme.css'

import DictNavBar from '../../components/DictNavBar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DictMyScrapbook from '../../components/DictMyScrapbook'
import Title from '../../elements/Title'
import Grid from '../../elements/Grid'

const DictMyMeMe = (props) => {
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
            <DictMyScrapbook />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DictMyMeMe
