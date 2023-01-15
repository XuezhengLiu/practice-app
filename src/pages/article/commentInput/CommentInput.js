import NavBar from '../../../components/navBar/NavBar'
import { addComment, getArticleDetail } from '../../../store/actions/article'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './CommentInput.module.scss'


const CommentInput = ({ onClose, onAddReply, articleId, name }) => {
  const dispatch = useDispatch()
  const txtRef = useRef(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    setTimeout(() => {
      txtRef.current?.focus()
    }, 600)
  }, [])

  const onSendComment = async () => {
    if (!value) return
    await dispatch(addComment(articleId, value))
    await dispatch(getArticleDetail(articleId))
    onClose()
  }

  return (
    <div className={styles.root}>
      <NavBar
        onLeftClick={onClose}
        extra={
          name ? (
            <span className="publish" onClick={() => onAddReply && onAddReply(value)}>
              回复
            </span>
          ) : (
            <span className="publish" onClick={onSendComment}>
              OK!
            </span>
          )
        }
      >
        {name ? '回复评论' : '评论文章'}
      </NavBar>

      <div className="input-area">
        {name && <div className="at">@{name}:</div>}
        <textarea ref={txtRef} placeholder="说点什么~" rows={10} value={value} onChange={(e) => setValue(e.target.value.trim())} />
      </div>
    </div>
  )
}

export default CommentInput
