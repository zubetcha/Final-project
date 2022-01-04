import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { history } from '../redux/ConfigureStore'
import axios from 'axios'
import { dictApi } from '../shared/api'
import { actionCreators as dictActions } from '../redux/modules/dict'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import '../styles/css/TodayDictCardSwiper.css'

import SwiperCore, { FreeMode, Pagination, Navigation, Scrollbar } from 'swiper'

const TodayDictCardSwiper = (props) => {
  SwiperCore.use([FreeMode, Pagination, Navigation, Scrollbar])

  const dispatch = useDispatch()

  const [todayDict, setTodayDict] = useState([])

  React.useEffect(() => {
    getTodayDictList()
  }, [])

  const getTodayDictList = async () => {
    let response = await dictApi.getTodayDict()
    setTodayDict(response.data.data)
    console.log(response)
  }

  console.log(todayDict)

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        keyboard={{
          enabled: true,
        }}
        centeredSlides={true}
        slidesPerGroupSkip={0}
        grabCursor={true}
        breakpoints={{
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        scrollbar={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        freeMode={true}
        loop={true}
        className="mySwiper"
      >
        {todayDict.map((todayDict) => (
          <SwiperSlide>
            <div className="TodayDictCard" onClick={() => history.push(`/dict/detail/${todayDict.dictId}`)}>
              <div className="TodayDictCard_1" key={todayDict.id}>
                <div className="TodayDictCard_Title">{todayDict.title}</div>
                <div className="TodayDictCard_Summary">{todayDict.summary}</div>
              </div>
              <div className="TodayDictCard_2"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default TodayDictCardSwiper