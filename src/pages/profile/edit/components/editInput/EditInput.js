import styles from './EditInput.module.scss'
import { TextArea, Input } from 'antd-mobile'
import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import NavBar from '../../../../../components/navBar/NavBar'

const EditInput = ({ onClose, type, onCommit }) => {
  const defaultValue = useSelector((state) => state.profile.profile[type])
  const [value, setValue] = useState(defaultValue || '')
  const refInput = useRef(null)
  const textareaInput = useRef(null)

  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus()
      refInput.current.nativeElement.setSelectionRange(-1, -1)
    }
    if (textareaInput.current) {
      textareaInput.current.focus()
      textareaInput.current.nativeElement.setSelectionRange(-1, -1)
    }
  })

  return (
    <div className={styles.root}>

      <NavBar
        onLeftClick={onClose}
        extra={
          <span className="commit-btn" onClick={() => onCommit(type, value)}>
            OK!
          </span>
        }
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </NavBar>
      <div className="content">
        <h3>{type === 'name' ? '昵称' : '简介'}</h3>

        {type === 'name' ? (
          <Input
            ref={refInput}
            className="wrap"
            placeholder="请输入昵称"
            value={value}
            onChange={(val) => {
              setValue(val)
            }}
          />
        ) : (
          <TextArea
            ref={textareaInput}
            className="wrap"
            placeholder="请输入简介"
            value={value}
            onChange={(val) => {
              setValue(val)
            }}
            showCount
            maxLength={100}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
