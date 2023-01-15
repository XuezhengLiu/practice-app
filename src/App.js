import AuthRoute from './components/authRoute/AuthRoute'
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

function App () {
  const Login = React.lazy(() => import('./pages/login/Login'))
  const Layout = React.lazy(() => import('./layout/Layout'))
  const Edit = React.lazy(() => import('./pages/profile/edit/Edit'))
  const Chat = React.lazy(() => import('./pages/profile/chat/Chat'))
  const FeedBack = React.lazy(() => import('./pages/profile/feedback/FeedBack'))
  const Search = React.lazy(() => import('./pages/search/Search'))
  const Result = React.lazy(() => import('./pages/search/result/Result'))
  const Article = React.lazy(() => import('./pages/article/Article'))

  return (
    <>
      <div className="app">
        <Suspense fallback={<div>loading</div>}>
          <Routes>
            <Route path="/Login" element={<Login></Login>}></Route>
            <Route path="*" element={<Layout></Layout>}></Route>
            <Route path="/search" element={<Search></Search>}></Route>
            <Route path="/search/result" element={<Result></Result>}></Route>
            <Route path="/article/:id" element={<Article></Article>}></Route>
            <Route
              path="/profile/edit"
              element={
                <AuthRoute>
                  <Edit></Edit>
                </AuthRoute>
              }
            ></Route>
            <Route
              path="/profile/chat"
              element={
                <AuthRoute>
                  <Chat></Chat>
                </AuthRoute>
              }
            ></Route>
            <Route
              path="/profile/feedback"
              element={
                <AuthRoute>
                  <FeedBack></FeedBack>
                </AuthRoute>
              }
            ></Route>
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
