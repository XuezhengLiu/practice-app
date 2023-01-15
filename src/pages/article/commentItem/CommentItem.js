import CommentReply from '../commentReply/CommentReply'
import Icon from '../../../components/icon/Icon'
import styles from './CommentItem.module.scss'
import { Popup } from 'antd-mobile'
import { useState } from 'react'


const CommentItem = ({ comment, type = 'normal' }) => {
  const [replyVisible, setReplyVisible] = useState(false)

  return (
    <div className={styles.root}>
      <div className="avatar">
        <img src={comment.aut_photo} alt="" />
      </div>

      <div className="comment-info">
        <div className="comment-info-header">
          <span className="name">{comment.aut_name}</span>
          <span className="thumbs-up">
            {comment.like_count} <Icon type={comment.is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          </span>
        </div>
        <div className="comment-content">{comment.content}</div>

        <div className="comment-footer">
          {type === 'normal' && (
            <span className="replay" onClick={() => setReplyVisible(true)}>
              {comment.reply_count === 0 ? '' : comment.reply_count} 回复 <Icon type="iconbtn_right" />
            </span>
          )}

        </div>
      </div>
      <Popup
        visible={replyVisible}
        onMaskClick={() => {
          setReplyVisible(false)
        }}
        bodyStyle={{ height: '100vh' }}
      >
        <CommentReply originCommet={comment}></CommentReply>
      </Popup>
    </div>
  )
}

export default CommentItem
