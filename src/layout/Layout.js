import React, { Suspense } from 'react'
import AuthRoute from '../components/authRoute/AuthRoute'
import classnames from 'classnames'
import Icon from '../components/icon/Icon'
import styles from './Layout.module.scss'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

function Layout () {

  const location = useLocation()
  const navigate = useNavigate()

  const Blog = React.lazy(() => import('../pages/blog/Blog'))
  const Home = React.lazy(() => import('../pages/home/Home'))
  const Video = React.lazy(() => import('../pages/video/Video'))
  const Profile = React.lazy(() => import('../pages/profile/Profile'))

  const buttons = [
    { id: 1, title: '首页', to: '/Home', icon: 'iconbtn_home' },
    { id: 2, title: '问答', to: '/Blog', icon: 'iconbtn_qa' },
    { id: 3, title: '视频', to: '/Video', icon: 'iconbtn_video' },
    { id: 4, title: '我的', to: '/Profile', icon: 'iconbtn_mine' }
  ]

  return (
    <div className={styles.root}>
      <div className={styles.root}>
        <div className="tab-content">
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              <Route path="*" element={<Home></Home>}></Route>
              <Route path="/Blog" element={<Blog></Blog>}></Route>
              <Route path="/Home/*" element={<Home></Home>}></Route>
              <Route
                path="/Profile"
                element={
                  <AuthRoute>
                    <Profile></Profile>
                  </AuthRoute>
                }
              ></Route>
              <Route path="/Video" element={<Video></Video>}></Route>
            </Routes>
          </Suspense>
        </div>
        <div className="tabbar">
          {buttons.map((btn) => {
            const selected = btn.to === location.pathname
            return (
              <div key={btn.id} className={classnames('tabbar-item', selected ? 'tabbar-item-active' : '')} onClick={() => navigate(btn.to)}>
                <Icon type={btn.icon + (selected ? '_sel' : '')} />
                <span>{btn.title}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Layout