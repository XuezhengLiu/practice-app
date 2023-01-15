import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'

function Footer () {

  const navigate = useNavigate()

  const tabs = [
    {
      key: '/',
      title: 'Home',
    },
    {
      key: '/Blog',
      title: 'Blog',
    },
    {
      key: '/Video',
      title: 'Video',
    },
    {
      key: '/Account',
      title: 'Account'
    },
  ]

  const changeTab = (key) => {
    navigate(key)
  }

  return (
    <div style={{ position: 'fixed', bottom: '0', width: '100%' }}>
      <TabBar onChange={changeTab}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}

export default Footer