import React from 'react'
import ArticleList from './article/articleList/ArticleList'
import Channels from './article/channels/Channels'
import Icon from '../../components/icon/Icon'
import styles from './Home.module.scss'
import Tabs from '../../components/tabs/Tabs'
import { getUserChannels } from '../../store/actions/home'
import { Popup } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [popupVisible, setPopupVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(1)

  useEffect(() => {
    dispatch(getUserChannels())
  }, [dispatch])

  const userChannles = useSelector((state) => state.home.userChannels)

  const onChange = (index) => {
    setActiveIndex(index)
  }
  const onClose = () => {
    setPopupVisible(false)
  }

  return (
    <div className={styles.root}>
      <Tabs tabs={userChannles} onChange={onChange}>
        {userChannles.map((item) => (
          <ArticleList key={item.id} channelId={item.id} activeId={userChannles[activeIndex].id}></ArticleList>
        ))}
      </Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => navigate('/search')}></Icon>
        <Icon type="iconbtn_channel" onClick={() => setPopupVisible(true)}></Icon>
      </div>
      <Popup
        visible={popupVisible}
        onMaskClick={() => {
          setPopupVisible(false)
        }}
        position="right"
      >
        {popupVisible && <Channels tabActiveIndex={activeIndex} onClose={onClose} userChannles={userChannles} onChange={onChange}></Channels>}
      </Popup>
    </div>

  )
}

export default Home