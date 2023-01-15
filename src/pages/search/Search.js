import classnames from 'classnames'
import Icon from '../../components/icon/Icon'
import NavBar from '../../components/navBar/NavBar'
import styles from './Search.module.scss'
import { Dialog, Divider } from 'antd-mobile'
import { getSuggestions, saveSuggestions, saveHistories } from '../../store/actions/search'
import { setLocalHistories } from '../../utils/storage'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const timeRef = useRef(-1)

  const { suggestions, histories } = useSelector((state) => {
    return state.search
  })

  const highlight = (str, key) => {
    return str.replace(new RegExp(key, 'gi'), (match) => {
      return `<span>${match}</span>`
    })
  }

  const onChange = (e) => {
    const text = e.target.value.trim()
    setKeyword(text)
    window.clearTimeout(timeRef.current)
    timeRef.current = window.setTimeout(() => {
      if (text) {
        setIsSearching(true)
        dispatch(getSuggestions(text))
      } else {
        setIsSearching(false)
      }
    }, 500)
  }

  const onClear = () => {
    setKeyword('')
    setIsSearching(false)
    dispatch(saveSuggestions([]))
  }

  const onClearHistory = () => {
    if (histories.length <= 0) return
    Dialog.confirm({
      content: '是否清空历史记录',
      onConfirm: () => {
        dispatch(saveHistories([]))
        setLocalHistories([])
      }
    })
  }

  const onSearch = (value) => {
    if (!value) return
    let newHistories = histories.filter((item) => item !== value)
    newHistories = [value, ...newHistories]
    if (newHistories.length > 10) {
      newHistories = newHistories.slice(0, 10)
    }
    dispatch(saveHistories(newHistories))
    setLocalHistories(newHistories)
    navigate('/search/result?key=' + value)
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onLeftClick={() => navigate(-1)}
        extra={
          <span onClick={() => onSearch(keyword)} className="search-text">
            <Icon type="iconbtn_search"></Icon>
          </span>
        }
      >
        <div className="navbar-search">
          <Icon type="iconbtn_search" className="icon-search" />

          <div className="input-wrapper">
            <input type="text" placeholder="请输入关键字搜索" value={keyword} onChange={onChange} />
            <Icon type="iconbtn_tag_close" className="icon-close" onClick={onClear} />
          </div>
        </div>
      </NavBar>

      <div className="history" style={{ display: isSearching ? 'none' : 'block' }}>
        <div className="history-header">
          <span>搜索历史</span>
          <span onClick={onClearHistory}>
            <Icon type="iconbtn_del" />
            清除全部
          </span>
        </div>

        <div className="history-list">
          {histories.map((item, index) => {
            return (
              <span className="history-item" key={index} onClick={() => onSearch(item)}>
                {item}
                <Divider direction="vertical" />
              </span>
            )
          })}
        </div>
      </div>

      <div
        className={classnames('search-result', {
          show: isSearching
        })}
      >
        {suggestions.map((item) => {
          return (
            <div className="result-item" key={item}>
              <Icon className="icon-search" type="iconbtn_search" />
              <div className="result-value" dangerouslySetInnerHTML={{ __html: highlight(item, keyword) }} onClick={() => onSearch(item)}></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Search
