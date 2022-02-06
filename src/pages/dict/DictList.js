import React, { useState } from 'react'
import '../../styles/css/DictList.css'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'
import Pagination from 'rc-pagination'
import SearchPage from '../../shared/SearchPage'
import { dictApi } from '../../shared/api'
import { DictNavBar, SpeedDialButton, TodayDictCardSwiper, Header, Footer, OneDictionaryCard, ConfirmModal, ConfirmButton } from '../../components'
import { Grid, Title } from '../../elements'
import { ReactComponent as WriteIcon } from '../../styles/icons/write.svg'

const DictList = () => {
  const userId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const isLogin = userId !== null && token !== null ? true : false

  const [dict, setDict] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [showModal, setShowModal] = useState(false)

  const getDictListDB = async () => {
    let response = await dictApi.getDictMain(pageSize, currentPage)
    let totalLength = await dictApi.tellMeTotalLength()

    setDict(response.data.data)
    setTotalCount(totalLength.data.data)
  }

  const handleClickWrite = () => {
    if (!isLogin) {
      setShowModal(true)
    } else {
      history.push('/dict/write')
    }
  }

  React.useEffect(() => {
    getDictListDB()
  }, [currentPage])

  return (
    <>
      <Header location="오픈 밈사전"></Header>
      <div className="DictLayout">
        <DictNavBar />
        <SearchBarSection>
          <SearchPage />
        </SearchBarSection>
        <div className="TitleBox">
          <Title>인기 밈</Title>
        </div>
        <Grid padding="10px 16px 16px">
          <TodayDictCardSwiper />
        </Grid>
        <div className="DictListPagination">
          <div className="TitleBox">
            <Title>밈 목록</Title>
          </div>
          <div className="DictList">
            {dict.map((dict) => (
              <OneDictionaryCard key={dict.dictId} dict={dict} />
            ))}
          </div>
          <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
        </div>
      </div>
      <Footer />
      <SpeedDialButton _onClick={handleClickWrite}>
        <WriteIcon fill="#FFFFFF" />
      </SpeedDialButton>
      <ConfirmModal showModal={showModal} setShowModal={setShowModal} title="로그인 후 이용할 수 있어요!" question="로그인 페이지로 이동하시겠어요?">
        <ConfirmButton _onClick={() => history.push('/login')}>이동</ConfirmButton>
      </ConfirmModal>
    </>
  )
}

const SearchBarSection = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px 16px;
`

export default DictList
