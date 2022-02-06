import React, { useState, useCallback } from 'react'
import '../../styles/css/DictEdit.css'
import { useDispatch } from 'react-redux'
import { dictApi } from '../../shared/api'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import { Header, ConfirmModal, ConfirmButton } from '../../components'

const DictEdit = (props) => {
  const dispatch = useDispatch()

  const [dict, setDict] = useState([])
  const [summary, setSummary] = React.useState('')
  const [content, setContent] = React.useState('')
  const [recentWriter, setRecentWriter] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [editLive, setEditLive] = React.useState(false)

  const handleShowModal = (e) => {
    setShowModal(!showModal)
  }

  const getDictEditLive = async () => {
    let response = await dictApi.getDictEditLive(dictId)
    const _editLive = response.data.data

    setEditLive(_editLive)
  }

  const getDictListDB = async () => {
    let response = await dictApi.getDictDetail(dictId)
    const _dict = response.data.data

    setDict(_dict)
    setSummary(_dict.summary)
    setContent(_dict.meaning)
  }

  React.useEffect(() => {
    getDictListDB()
  }, [])

  React.useEffect((dictId) => {
    getDictEditLive(dictId)

    const interval = setInterval(() => {
      getDictEditLive(dictId)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const dictId = Number(props.match.params.dictId)
  const newRecentWriter = window.localStorage.getItem('nickname')

  const debounceFunction = (callback, delay) => {
    let timer
    return (...args) => {
      // 실행한 함수(setTimeout())를 취소
      clearTimeout(timer)
      // delay가 지나면 callback 함수를 실행
      timer = setTimeout(() => callback(...args), delay)
    }
  }

  const printValue = useCallback(
    debounceFunction((value) => console.log(value), 500),
    []
  )

  const onChangeSummary = async (e) => {
    printValue(e.target.value)
    await setSummary(e.target.value)
  }

  const onChangeContent = async (e) => {
    printValue(e.target.value)
    await setContent(e.target.value)
  }

  const editDict = () => {
    dispatch(dictActions.editDictDB(dictId, summary, content))
  }

  return (
    <>
      <Header type="goBack" location="오픈 밈사전" />
      <div className="DictCardEditPageLayout">
        <div className="DictCardEditInputSection">
          <div className="DictCardEditInputTitleContainer">
            <div className="DictCardEditInputTitleGuideText">
              밈 단어<span className="highlight">*</span>
            </div>
            <div className="DictCardEditInputTitle">{dict.title}</div>
          </div>
          <div className="DictCardEditInputSummaryContainer">
            <div className="DictCardEditInputSummaryGuideText">
              한줄설명<span className="highlight">*</span>
            </div>
            <input
              className="DictCardEditInputSummary"
              type="text"
              cols="40"
              rows="3"
              maxlength="25"
              value={summary}
              onChange={onChangeSummary}
              placeholder="단어의 뜻을 25자 이내로 요약하여 입력해주세요"
            />
          </div>
          <div className="DictCardEditInputContentContainer">
            <div className="DictCardEditInputContentGuideText">부가설명</div>
            <textarea className="DictCardEditInputContent" type="text" cols="40" rows="10" value={content} onChange={onChangeContent} placeholder="추가적인 설명이나 예시를 작성해 주세요">
              {dict.meaning}
            </textarea>
          </div>
        </div>
      </div>
      <div className="DictCardEditTemporaryOrSubmitButton">
        <div className="DictCardEditSubmitButton" type="submit">
          <button className="DictCardEditSubmitButton_1" onClick={handleShowModal} disabled={!(summary !== '' && content !== '')}>
            편집
          </button>
          <div className="DictCardEditSubmitButton_2"></div>
        </div>
      </div>
      {showModal && (
        <ConfirmModal question="편집하신 단어를 게시하시겠어요?" showModal={showModal} setShowModal={setShowModal}>
          <ConfirmButton _onClick={editDict}>게시</ConfirmButton>
        </ConfirmModal>
      )}
    </>
  )
}

export default DictEdit
