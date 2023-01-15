import classNames from 'classnames'
import CommentFooter from './commentFooter/CommentFooter'
import CommentInput from './commentInput/CommentInput'
import CommentItem from './commentItem/CommentItem'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import Icon from '../../components/icon/Icon'
import NavBar from '../../components/navBar/NavBar'
import NoComment from './noComment/NoComment'
import Share from './share/Share'
import Sticky from '../../components/sticky/Sticky'
import styles from './Article.module.scss'
import { followUser, getArticleDetail, getCommentList, getMoreCommentList } from '../../store/actions/article'
import { InfiniteScroll, Popup } from 'antd-mobile'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import 'highlight.js/styles/vs2015.css'

const Article = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authorRef = useRef(null)
  const commentRef = useRef(null)
  const ifShowComment = useRef(false)
  const wrapperRef = useRef(null)

  const { id } = useParams()
  const {
    detail: { title, read_count, comm_count, aut_photo, aut_name, content, pubdate, is_followed, like_count, aut_id },
    comment
  } = useSelector((state) => state.article)

  const [ifShowNavAuthor, setIfShowNavAuthor] = useState(false)
  const [popupCommentVisible, setPopupCommentVisible] = useState(false)
  const [popupShareVisible, setPopupShareVisible] = useState(false)

  useEffect(() => {
    dispatch(getArticleDetail(id))
  }, [dispatch, id])

  useEffect(() => {
    const codes = document.querySelectorAll('.dg-html pre > code')
    codes.forEach((el) => {
      hljs.highlightElement(el)
    })
  }, [id])

  useEffect(() => {
    const onScroll = () => {
      const react = authorRef.current?.getBoundingClientRect()

      if (react.top <= 0) {
        setIfShowNavAuthor(true)
      } else {
        ifShowNavAuthor && setIfShowNavAuthor(false)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [ifShowNavAuthor])

  useEffect(() => {
    dispatch(getCommentList(id))
  }, [dispatch, id])

  const hasMore = comment.end_id !== comment.last_id

  const goComment = () => {
    if (!ifShowComment.current) {
      window.scrollTo(0, commentRef.current?.offsetTop)
    } else {
      window.scrollTo(0, 0)
    }
    ifShowComment.current = !ifShowComment.current
  }

  const goCommentInput = () => {
    setPopupCommentVisible(true)
  }

  const goShare = () => {
    setPopupShareVisible(true)
  }

  const loadMore = async () => {
    await dispatch(getMoreCommentList(id, comment.last_id))
  }

  const onFollow = () => {
    dispatch(followUser(aut_id, id, is_followed))
  }

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          className="navBar"
          onLeftClick={() => navigate(-1)}
          extra={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {ifShowNavAuthor ? (
            <div className="nav-author">
              <img src={aut_photo} alt="" />
              <span className="name">{aut_name}</span>
              <span onClick={onFollow} className={classNames('follow', is_followed ? 'followed' : '')}>
                {is_followed ? '已关注' : '关注'}
              </span>
            </div>
          ) : (
            ''
          )}
        </NavBar>
        <div className="wrapper" ref={wrapperRef}>
          <div className="article-wrapper">
            <div className="header">
              <h1 className="title">{title}</h1>

              <div className="info">
                <span>{pubdate}</span>
                <span>{read_count} 阅读</span>
                <span>{comm_count} 评论</span>
              </div>

              <div className="author" ref={authorRef}>
                <img src={aut_photo} alt="" />
                <span className="name">{aut_name}</span>
                <span
                  onClick={onFollow}
                  className={classNames('follow', {
                    followed: is_followed
                  })}
                >
                  {is_followed ? '已关注' : '关注'}
                </span>
              </div>
            </div>

            <div className="content">
              <div className="content-html dg-html" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></div>
            </div>
          </div>
          <div className="comment" ref={commentRef}>
            <Sticky offset={46}>
              <div className="comment-header">
                <span>全部评论（{comm_count}）</span>
                <span>点赞（{like_count}）</span>
              </div>
            </Sticky>
          </div>
          {comm_count === 0 ? <NoComment></NoComment> : comment.results?.map((item) => <CommentItem key={item.com_id} comment={item}></CommentItem>)}
          {comm_count !== 0 && <InfiniteScroll hasMore={hasMore} loadMore={loadMore}></InfiniteScroll>}
        </div>
        <CommentFooter goComment={goComment} goShare={goShare} goCommentInput={goCommentInput}></CommentFooter>
        <Popup
          visible={popupShareVisible}
          onMaskClick={() => {
            setPopupShareVisible(false)
          }}
        >
          {popupShareVisible && <Share onClose={() => setPopupShareVisible(false)}></Share>}
        </Popup>
        <Popup
          visible={popupCommentVisible}
          onMaskClick={() => {
            setPopupCommentVisible(false)
          }}
        >
          {popupCommentVisible && <CommentInput onClose={() => setPopupCommentVisible(false)} articleId={id}></CommentInput>}
        </Popup>
      </div>
    </div>
  )
}

export default Article
