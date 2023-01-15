import React from 'react'
import classnames from 'classnames'
import Input from '../../components/input/Input'
import NavBar from '../../components/navBar/NavBar'
import styles from './Login.module.scss'
import * as Yup from 'yup'
import { sendCode, login } from '../../store/actions/login'
import { Toast } from 'antd-mobile'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [time, setTime] = useState(0)

  const formik = useFormik({
    initialValues: {
      mobile: '18111111111',
      code: '246810'
    },
    onSubmit: async (values) => {
      await dispatch(login({ ...values }))
      Toast.show('登录成功')
      if (location.state?.from) {
        navigate(location.state?.from, { replace: true })
      } else {
        navigate('/Home', { replace: true })
      }
    },
    validationSchema: Yup.object().shape({
      mobile: Yup.string()
        .required('请输入手机号')
        .matches(/^1[3456789]\d{9}$/, '手机号格式错误'),

      code: Yup.string()
        .required('请输入验证码')
        .matches(/^\d{6}$/, '验证码6个数字')
    })
  })

  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isValid
  } = formik

  const onExtraClick = async () => {
    if (time > 0) return
    if (/^1[3456789]\d{9}$/.test(mobile)) {
      await dispatch(sendCode(mobile))
      Toast.show('获取验证码成功')
      setTime(60)
      let timeId = setInterval(() => {
        setTime((time) => {
          if (time === 1) {
            clearInterval(timeId)
          }
          return time - 1
        })
      }, 1000)
    } else {
      formik.setTouched({
        mobile: true
      })
      return
    }
  }

  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <div className="input-box">
              <Input
                value={mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                name="mobile"
                placeholder="请输入手机号"
                autoComplete="off"
              />
            </div>
            {touched.mobile && errors.mobile && <div className="validate">{errors.mobile}</div>}
          </div>

          <div className="input-item">
            <div className="input-box">
              <Input
                value={code}
                name="code"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="请输入验证码"
                extra={time === 0 ? '获取验证码' : `${time}s后获取`}
                onExtraClick={onExtraClick}
                maxLength={6}
                autoComplete="off"
              />
            </div>
            {touched.code && errors.code && <div className="validate">{errors.code}</div>}
          </div>

          <button type="submit" className={classnames('login-btn', isValid ? '' : 'disabled')} disabled={!isValid}>
            登录
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login