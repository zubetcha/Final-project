import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

const BottomPopup = (props) => {
  const { isOpen, onClose, children, heightPixel } = props

  const [isInDOM, setIsInDOM] = useState(false)

  const bodyOverflowStyleRef = useRef(document.body.style.overflow)
  const topRef = useRef(document.body.style.top)

  const [springProps, api] = useSpring(() => ({
    left: '0',
    bottom: '0',
    width: '100%',
    position: 'absolute',
    zIndex: '10000',
    height: '0px',
    // 애니메이션 동작이 완료되면 호출하는 콜백함수
    onRest: {
      height: (height) => {
        if (height.value === `${heightPixel}px`) {
          return
        }
        // onClose 동작이 완료된 것으로 간주하여 DOM에서 제거
        if (height.value === '0px') {
          setIsInDOM(false)
        }
      },
    },
  }))

  window.addEventListener('keyup', (e) => {
    if (isOpen && e.key === 'Escape') {
      onClose()
    }
  })

  const handleOverlayClick = useCallback(() => onClose(), [onClose])
  const handleContentClick = useCallback((e) => e.stopPropagation(), [])

  useEffect(() => {
    if (isOpen) {
      const currY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      bodyOverflowStyleRef.current = document.body.style.overflow
      topRef.current = document.body.style.top
      // 스크롤을 막고, 스크롤을 내린 만큼의 값을 top으로 고정시켜 화면이 맨 위로 올라가지 않도록 
      document.body.style.overflow = 'hidden'
      document.body.style.top = `${currY}px`
      // inInDOM이 true이면 애니메이션이 시작됨
      setIsInDOM(true)
    } 
    // 바텀 팝업을 닫으면 onClose 함수가 실행되어 아래로 내려가는 애니메이션 시작
    // onRest에 정의한 대로 isInDOM의 state가 false로 바뀜
    else {
      api.start({ height: '0px', immediate: false })
    }
  }, [isOpen, api])

  useEffect(() => {
    if (isInDOM) {
      api.start({ height: `${heightPixel}px` })
    } 
    // 내려가는 애니메이션이 끝나면 컴포넌트는 null을 반환하고, 
    // document.body의  overflow와 top을 원래대로 복원
    else if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = bodyOverflowStyleRef.current
      document.body.style.top = topRef.current
    }
  }, [isInDOM, api, heightPixel])


  // cleanup function
  // 컴포넌트가 정상적으로 닫히지 않고 언마운트되는 경우 document.body에 적용된 overflow: hidden이
  // 초기화되지 않고 빠져나가게 되어 스크롤이 막힘
  // 이런 경우 document.body의 스타일을 모두 복구하는 역할
  useEffect(() => {
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = bodyOverflowStyleRef.current
      document.body.style.top = topRef.current
    }
  }, [])

  // 내려가는 애니메이션이 끝나면 컴포넌트는 null을 반환
  if (!isInDOM) return null

  return (
    <>
      <Overlay onClick={handleOverlayClick} />
      <animated.div style={springProps} onClick={handleContentClick}>
        {children}
      </animated.div>
    </>
  )
}

const Overlay = styled.div`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: background-color 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
`

export default BottomPopup
