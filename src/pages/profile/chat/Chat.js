import Icon from '../../../components/icon/Icon'
import NavBar from '../../../components/navBar/NavBar'
import { Input } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './Chat.module.scss'
import io from 'socket.io-client'
import { getTokenInfo } from '../../../utils/storage'

const Chat = () => {
  const [messageList, setMessageList] = useState([])
  const [userMsg, setUserMsg] = useState('')
  const user = useSelector((state) => state.profile.user)
  const clientRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const clinet = io('http://toutiao.itheima.net', {
      transports: ['websocket'],
      query: {
        token: getTokenInfo().token
      }
    })

    clientRef.current = clinet

    clinet.on('connect', () => {
      setMessageList((messageList) => {
        return [...messageList, { type: 'robot', text: '您好主人，恭候着您的消息' }]
      })
    })
    clinet.on('message', (value) => {
      setMessageList((messageList) => {
        return [...messageList, { type: 'robot', text: value.msg }]
      })
    })

    return () => {
      clinet.close()
    }
  }, [])

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight - listRef.current.offsetHeight
  }, [messageList])

  const onKeyUp = (e) => {
    if (e.keyCode !== 13) return
    if (!userMsg) return
    setMessageList((messageList) => {
      return [...messageList, { type: 'user', text: userMsg }]
    })
    setUserMsg('')
    clientRef.current.emit('message', {
      msg: userMsg,
      tiemstamp: Date.now()
    })
  }

  return (
    <div className={styles.root}>
      <NavBar className="fixed-header">小智同学</NavBar>
      <div className="chat-list" ref={listRef}>
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div key={index} className="chat-item">
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            return (
              <div key={index} className="chat-item user">
                <img src={user.photo || 'http://toutiao.itheima.net/images/user_head.jpg'} alt="" />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      <div className="input-footer">
        <Icon type="iconbianji" />
        <Input value={userMsg} onChange={(value) => setUserMsg(value)} onKeyUp={onKeyUp} className="input no-border" placeholder="请描述您的问题" />
      </div>
    </div>
  )
}

export default Chat
