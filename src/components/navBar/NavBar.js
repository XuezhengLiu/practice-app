import React from 'react'
import classNames from 'classnames'
import Icon from '../icon/Icon'
import styles from './NavBar.module.scss'
import { useNavigate } from 'react-router-dom'

function NavBar ({ children, extra, className, onLeftClick }) {

  const navigate = useNavigate()

  const back = () => {
    if (onLeftClick) {
      onLeftClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <div className={classNames(styles.root, className)}>
      <div className="left" onClick={back}>
        <Icon type="iconfanhui" />
      </div>
      <div className="title">{children}</div>
      <div className="right">{extra}</div>
    </div>
  )
}

export default NavBar