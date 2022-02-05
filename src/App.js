import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/ConfigureStore'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/theme'
import Auth from './shared/auth'
import { MobileFrame, Background, Spinner } from './components'
import NaverLoginHandler from './shared/NaverLoginHandler'
import KakaoLoginHandler from './shared/KakaoLoginHandler'
import GoogleLoginHandler from './shared/GoogleLoginHandler'

const Main = lazy(() => import('../src/pages/Main'))
const QuizIntro = lazy(() => import('../src/pages/QuizIntro'))
const Quiz = lazy(() => import('../src/pages/Quiz'))
const QuizResult = lazy(() => import('../src/pages/QuizResult'))
const Join = lazy(() => import('../src/pages/user/Join'))
const Login = lazy(() => import('../src/pages/user/Login'))
const Mypage = lazy(() => import('../src/pages/user/Mypage'))
const PostDetail = lazy(() => import('../src/pages/post/PostDetail'))
const PostEdit = lazy(() => import('../src/pages/post/PostEdit'))
const PostList = lazy(() => import('../src/pages/post/PostList'))
const PostWrite = lazy(() => import('../src/pages/post/PostWrite'))
const DictEdit = lazy(() => import('../src/pages/dict/DictEdit'))
const DictList = lazy(() => import('../src/pages/dict/DictList'))
const DictWrite = lazy(() => import('../src/pages/dict/DictWrite'))
const DictDetail = lazy(() => import('../src/pages/dict/DictDetail'))
const DictHistory = lazy(() => import('../src/pages/dict/DictHistory'))
const DictMyMeMe = lazy(() => import('../src/pages/dict/DictMyMeMe'))
const DictSearch = lazy(() => import('../src/pages/dict/DictSearch'))
const DictStat = lazy(() => import('../src/pages/dict/DictStat'))
const ImageList = lazy(() => import('../src/pages/image/ImageList'))
const ImageUpload = lazy(() => import('../src/pages/image/ImageUpload'))
const ImageDetailList = lazy(() => import('../src/pages/image/ImageDetailList'))
const NotFound = lazy(() => import('../src/pages/NotFound'))

function App() {
  return (
    <>
      <Wrapper>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ConnectedRouter history={history}>
            <BackgroundOpacity />
            <Background className="BackgroundPage" />
            <MobileFrame className="MobileFramePage">
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route path="/" exact component={Main} />
                  <Route path="/join" exact component={Auth(Join, false)} />
                  <Route path="/login" exact component={Auth(Login, false)} />
                  <Route path="/mypage" exact component={Auth(Mypage, true)} />
                  <Route path="/quiz" exact component={QuizIntro} />
                  <Route path="/quiz/:category" exact component={Quiz} />
                  <Route path="/quiz/:category/result" exact component={QuizResult} />
                  <Route path="/dict/question" exact component={PostList} />
                  <Route path="/dict/question/detail/:questionId" exact component={PostDetail} />
                  <Route path="/dict/question/write" exact component={Auth(PostWrite, true)} />
                  <Route path="/dict/question/edit/:questionId" exact component={Auth(PostEdit, true)} />
                  <Route path="/dict" exact component={DictList} />
                  <Route path="/dict/write" exact component={Auth(DictWrite, true)} />
                  <Route path="/dict/edit/:dictId" exact component={Auth(DictEdit, true)} />
                  <Route path="/dict/detail/:dictId" exact component={DictDetail} />
                  <Route path="/dict/search/:keyword" exact component={DictSearch} />
                  <Route path="/dict/history/:dictId" exact component={DictHistory} />
                  <Route path="/dict/mymeme" exact component={DictMyMeMe} />
                  <Route path="/dict/stat" exact component={DictStat} />
                  <Route path="/image" exact component={ImageList} />
                  <Route path="/image/upload" exact component={ImageUpload} />
                  <Route path="/image/detail" exact component={ImageDetailList} />
                  {/* Social Login Redirect Handler */}
                  <Route path="/redirect/naver" component={NaverLoginHandler} />
                  <Route path="/redirect/kakao" component={KakaoLoginHandler} />
                  <Route path="/redirect/google" component={GoogleLoginHandler} />
                  {/* Wrong Path */}
                  <Route component={NotFound} />
                </Switch>
              </Suspense>
            </MobileFrame>
          </ConnectedRouter>
        </ThemeProvider>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #2b2b2b;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .BackgroundPage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -999;
  }

  .MobileFramePage {
    z-index: 999;
  }
`

const BackgroundOpacity = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(250, 250, 250, 0.5);
  background-size: contain;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export default App
