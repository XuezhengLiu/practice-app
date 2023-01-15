import CommentFooter from '../commentFooter/CommentFooter'
import CommentInput from '../commentInput/CommentInput'
import CommentItem from '../commentItem/CommentItem'
import NavBar from '../../../components/navBar/NavBar'
import NoComment from '../noComment/NoComment'
import request from '../../../utils/request'
import styles from './CommentReply.module.scss'
import { getCommentList } from '../../../store/actions/article'
import { InfiniteScroll, Popup } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'


const CommentReply = ({ originCommet }) => {
  const dispatch = useDispatch()
  const { id: articleId } = useParams()
  const [hasMore, setHasMore] = useState(true)
  const [inputVisible, setInputVisible] = useState(false)
  const [replyDetail, setReplyDetail] = useState({
    end_id: '',
    last_id: '',
    results: [],
    total_count: 0
  })

  const loadMore = async () => {
    const res = await request({
      url: '/comments',
      method: 'get',
      params: {
        type: 'c',
        source: originCommet.com_id,
        offset: replyDetail.last_id
      }
    })
    setReplyDetail({
      ...res.data,
      results: [...replyDetail.results, ...res.data.results]
    })
    setHasMore(res.data.end_id !== res.data.last_id)
  }


  const onAddReply = async (content) => {
    const res = await request({
      url: '/comments',
      method: 'post',
      data: {
        target: originCommet.com_id,
        content,
        art_id: articleId
      }
    })
    setReplyDetail({
      ...replyDetail,
      results: [res.data.new_obj, ...replyDetail.results]
    })
    dispatch(getCommentList(articleId))
    setInputVisible(false)
  }

  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        <NavBar className="transparent-navbar">{originCommet.reply_count + '条回复'}</NavBar>

        <div className="origin-comment">
          <CommentItem comment={originCommet} type="reply" />
        </div>

        <div className="reply-list">
          <div className="reply-header">全部回复</div>

          {originCommet?.reply_count === 0 ? (
            <NoComment />
          ) : (
            replyDetail?.results?.map((item) => {
              return <CommentItem comment={item} key={item.com_id} type="reply" />
            })
          )}
          {originCommet?.reply_count !== 0 && <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>}
        </div>

        <CommentFooter type="reply" goCommentInput={() => setInputVisible(true)} />
      </div>
      <Popup
        visible={inputVisible}
        onMaskClick={() => {
          setInputVisible(false)
        }}
        bodyStyle={{ height: '100vh' }}
      >
        {inputVisible && <CommentInput articleId={articleId} onAddReply={onAddReply} onClose={() => setInputVisible(false)} name={originCommet.aut_name}></CommentInput>}
      </Popup>
    </div>
  )
}

export default CommentReply
