import React, { useState, useEffect } from 'react'
import { mainApi } from '../shared/api'
import { history } from '../redux/ConfigureStore'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import styled from 'styled-components'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Lazy, Autoplay, Keyboard, Pagination } from 'swiper'
import { Header, Footer, AlertModal, MainPageImageSlide, PopularBoardCardSwiper } from '../components'
import { Grid } from '../elements'
import { ReactComponent as MainMoreIcon } from '../styles/icons/mainMore.svg'
import { ReactComponent as MainFeedBackBarIcon } from '../styles/icons/mainFeedBackBar.svg'

import 'swiper/swiper.min.css'
import 'swiper/components/lazy/lazy.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import '../styles/css/Main.css'

const Main = (props) => {
  SwiperCore.use([Lazy, Autoplay, Keyboard, Pagination])

  const dispatch = useDispatch()

  const isFirst = useSelector((state) => state.user.is_first)
  const nickname = sessionStorage.getItem('nickname')

  const [popularImages, setPopularImages] = useState([])
  const [todayMemes, setTodayMemes] = useState([])

  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => {
    setTimeout(() => {
      setShowModal(false)
    }, 2000)
  }

  const handleShowModal = () => {
    setShowModal(true)
    handleCloseModal()
  }

  const searchDictDB = async () => {
    let response = await mainApi.mainPage()

    setPopularImages(response.data.data.popularImages)
    setTodayMemes(response.data.data.todayMemes)
  }

  useEffect(() => {
    if (isFirst) {
      handleShowModal()
    }
    dispatch(userActions.initFirstLogin())
  }, [])

  React.useEffect(() => {
    searchDictDB()
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
      <Header location="Memegle" />
      <div className="MainPageLayout">
        <div className="MainPageCarouselSection">
          <div className="MainPageCarouselText">
            <div className="MainPageCarouselText_1">이벤트</div>
            <div className="MainPageCarouselText_2">다들 밈중독 정도는 되겠지?</div>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            lazy={true}
            grabCursor={true}
            breakpoints={{
              769: {
                slidesPerView: 1,
                slidesPerGroup: 2,
              },
            }}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
            }}
            pagination={{
              dynamicBullets: true,
            }}
            keyboard={{
              enabled: true,
            }}
            className="mySwiper"
          >
            <SwiperSlide
              onClick={() => {
                history.push('/quiz')
              }}
              className="main-swiper-slide"
            >
              <MainPageImageSlide type="quiz" />
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                window.open('https://forms.gle/xmfGQt2WsPQhiHg87', '_blank')
              }}
              className="main-swiper-slide"
            >
              <MainPageImageSlide type="event" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="MainPageFeedBackSection" onClick={() => window.open('https://forms.gle/xmfGQt2WsPQhiHg87', '_blank')}>
          <div className="MainPageFeedBackText1">피드백 남기고 스타벅스 커피 받아가자</div>
          <div className="MainPageFeedBackBar">
            <MainFeedBackBarIcon />
          </div>
          <div className="MainPageFeedBackText2">Go!</div>
        </div>
        <div className="MainPageTagSection">
          <div className="MainPageTagName">오늘의 밈</div>
          <div className="MainPageTagList">
            {todayMemes.map((todayMemes) => (
              <div className="MainPageTag" key={todayMemes.dictId} onClick={() => history.push(`/dict/detail/${todayMemes.dictId}`)}>
                {todayMemes.dictName}
              </div>
            ))}
          </div>
          <div className="MainPageTagMoreButton_1">
            <div className="MainPageTagMoreButton_1st" onClick={() => history.push('/dict')}>
              <div className="MainPageTagMoreButton1">More</div>
              <MainMoreIcon strokeWidth="2" />
            </div>
          </div>
        </div>
        <div className="MainPageTopPostSection">
          <div className="MainPageTopPostText">명예의 밈글</div>
          <Grid padding="16px 16px 0  ">
            <PopularBoardCardSwiper popularImages={popularImages} />
          </Grid>
          <div className="MainPageTagMoreButton_2">
            <div className="MainPageTagMoreButton_2nd" onClick={() => history.push('/image')}>
              <div className="MainPageTagMoreButton2">More</div>
              <MainMoreIcon strokeWidth="2" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showModal && (
        <AlertModal showModal={showModal}>
          <Username>{nickname}</Username> 님 만반잘부! 🙋🏻
        </AlertModal>
      )}
    </>
  )
}

const Username = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue};
`

export default Main
