import React from 'react'
import classNames from 'classnames'
import styles from './Input.module.scss'

function Input ({ extra, onExtraClick, className, ...rest }) {
  return (
    <div className={styles.root}>
      <input className={classNames('input', className)} {...rest} />
      {extra && (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      )}
    </div>
  )
}

export default Input