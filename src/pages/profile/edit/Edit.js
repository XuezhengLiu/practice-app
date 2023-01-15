import React from 'react'
import { useEffect, useState, useRef } from 'react'
import NavBar from '../../../components/navBar/NavBar'
import EditInput from './components/editInput/EditInput'
import styles from './Edit.module.scss'
import { List, DatePicker, Toast, Popup, ActionSheet, Dialog } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { getProfile, updatePhoto, updateProfile } from '../../../store/actions/profile'
import dayjs from 'dayjs'
import { saveToken } from '../../../store/actions/login'
import { removeTokenInfo } from '../../../utils/storage'
import { logout } from '../../../store/actions/profile'

const photoActions = [
  { text: '拍照', key: '2' },
  { text: '本地选择', key: '3' }
]

const genderActions = [
  { text: '男', key: '0' },
  { text: '女', key: '1' }
]

function Edit () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileRef = useRef(null)

  const profile = useSelector((state) => state.profile.profile)
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const [popupVisible, setPopupVisible] = useState({
    visible: false,
    type: ''
  })
  const [actionSheetVisible, setActionSheetVisible] = useState({
    visible: false,
    type: ''
  })
  const [datePickerVisible, setDatePickerVisible] = useState(false)

  const popupClose = () => {
    setPopupVisible({
      visible: false,
      type: ''
    })
  }

  const actionSheetClose = () => {
    setActionSheetVisible({
      visible: false,
      type: ''
    })
  }

  const fileChange = async (e) => {
    const file = e.target.files[0]
    await dispatch(updatePhoto(file))
    Toast.show('修改成功')
    actionSheetClose()
  }

  const onCommit = async (type, value) => {
    await dispatch(updateProfile({ [type]: value }))
    Toast.show('修改成功')
    popupClose()
    actionSheetClose()
  }

  const actionSheetAction = (action) => {
    if (action.key === '0' || action.key === '1') {
      onCommit(actionSheetVisible.type, Number(action.key))
    } else if (action.key === '2') {
      Toast.show('暂不支持拍照功能')
    } else if (action.key === '3') {
      fileRef.current.click()
    }
  }

  const handleLogout = () => {
    Dialog.confirm({
      title: '温馨提示',
      content: '你确定要退出？',
      onConfirm: async () => {
        dispatch(
          saveToken({
            token: '',
            refresh_token: ''
          })
        )
        removeTokenInfo()
        logout()
        navigate('/Login', { replace: true })
      }
    })
  }

  return (
    <div className={styles.root}>
      <NavBar>个人信息</NavBar>
      <div className="wrapper">
        <List className="profile-list">
          <List.Item
            extra={
              <span className="avatar-wrapper">
                <img src={profile.photo} alt="" />
              </span>
            }
            onClick={() => {
              setActionSheetVisible({
                visible: true,
                type: 'photo'
              })
            }}
          >
            头像
          </List.Item>
          <List.Item
            extra={profile.name}
            onClick={() => {
              setPopupVisible({
                visible: true,
                type: 'name'
              })
            }}
          >
            昵称
          </List.Item>
          <List.Item
            extra={<span className={classNames('intro', profile.intro ? 'normal' : '')}>{profile.intro || '未填写'}</span>}
            onClick={() => {
              setPopupVisible({
                visible: true,
                type: 'intro'
              })
            }}
          >
            简介
          </List.Item>
        </List>
        <List className="profile-list">
          <List.Item
            extra={profile.gender === 0 ? '男' : '女'}
            onClick={() => {
              setActionSheetVisible({
                visible: true,
                type: 'gender'
              })
            }}
          >
            性别
          </List.Item>
          <List.Item
            extra={profile.birthday}
            onClick={() => {
              setDatePickerVisible(true)
            }}
          >
            生日
          </List.Item>
        </List>
      </div>
      <div className="logout">
        <button className="btn" onClick={handleLogout}>
          退出登录
        </button>
      </div>
      <input ref={fileRef} type="file" onChange={fileChange} style={{ display: 'none' }} hidden />
      <Popup visible={popupVisible.visible} onMaskClick={popupClose} position="right" bodyStyle={{ width: '100vw' }}>
        {popupVisible.visible && <EditInput onClose={popupClose} onCommit={onCommit} type={popupVisible.type}></EditInput>}
      </Popup>
      <ActionSheet
        visible={actionSheetVisible.visible}
        actions={actionSheetVisible.type === 'photo' ? photoActions : genderActions}
        cancelText="取消"
        onAction={actionSheetAction}
        onClose={actionSheetClose}
      ></ActionSheet>
      <DatePicker
        value={new Date(profile.birthday)}
        visible={datePickerVisible}
        onClose={() => {
          setDatePickerVisible(false)
        }}
        min={new Date('1990-01-01')}
        max={new Date()}
        precision="day"
        onConfirm={(val) => {
          onCommit('birthday', dayjs(val).format('YYYY-MM-DD'))
        }}
      ></DatePicker>
    </div>
  )
}

export default Edit