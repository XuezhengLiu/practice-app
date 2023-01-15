import Icon from '../../../components/icon/Icon'
import styles from './CommentFooter.module.scss'
import { collectArticle, likeArticle } from '../../../store/actions/article'
import { useDispatch, useSelector } from 'react-redux'


const CommentFooter = ({ goCommentInput, goComment, goShare, type = 'normal' }) => {
  const dispatch = useDispatch()
  const { detail } = useSelector((state) => state.article)

  const onCollect = () => {
    dispatch(collectArticle(detail.art_id, detail.is_collected))
  }

  const onLike = () => {
    dispatch(likeArticle(detail.art_id, detail.attitude))
  }

  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={goCommentInput}>
        <Icon type="iconbianji" />
        <span>{type === 'normal' ? '去评论' : '去回复'}</span>
      </div>

      {type === 'normal' ? (
        <>
          <div className="action-item" onClick={goComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {<span className="bage">{detail.comm_count}</span>}
          </div>
          <div className="action-item" onClick={onLike}>
            <Icon type={detail.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
        </>
      ) : null}

      <div className="action-item" onClick={onCollect}>
        <Icon type={detail.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
        <p>收藏</p>
      </div>

      <div className="action-item" onClick={goShare}>
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
