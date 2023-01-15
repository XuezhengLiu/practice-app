import React from 'react'
import classNames from 'classnames'

function Icon ({ type, className, ...rest }) {
  return (
    <svg
      {...rest}
      className={classNames('icon', className)}
      aria-hidden="true"
    >
      <use xlinkHref={'#' + type}></use>
    </svg>
  )
}

export default Icon