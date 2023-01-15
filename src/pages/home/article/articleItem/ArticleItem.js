import classnames from 'classnames'
import Icon from '../../../../components/icon/Icon'
import styles from './ArticleItem.module.scss'
import { ActionSheet, Image, Toast } from 'antd-mobile'
import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const actionSheetActions = [
  { text: '不感兴趣', key: 'unlike' },
  { text: '反馈辣鸡内容', key: 'feedback' },
  { text: '拉黑作者', key: 'block' }
]

const ArticleItem = memo(({ article }) => {
  const {
    art_id,
    cover: { type, images },
    title,
    aut_name,
    comm_count,
  } = article

  const isLogin = useSelector((state) => !!state.login.token)

  const [actionSheetVisible, setActionSheetVisible] = useState(false)

  const navigate = useNavigate()

  const onAction = (action) => {
    if (action.key === 'unlike') {
      console.log(art_id)
      Toast.show('暂时不能不感兴趣哟')
    }
    if (action.key === 'feedback') {
      Toast.show('暂时不能反馈哟')
    }
    if (action.key === 'block') {
      Toast.show('暂时不能拉黑作者哦')
    }
  }

  return (
    <div
      className={styles.root}
      onClick={() => {
        navigate(`/article/${article.art_id}`)
      }}
    >
      <div className={classnames('article-content', type === 3 ? 't3' : '', type === 0 ? 'none-mt' : '')}>
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, index) => {
              return (
                <div className="article-img-wrapper" key={index}>
                  <Image src={item} lazy height="100%" />
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        {
          <span
            className="close"
            onClick={(e) => {
              e.stopPropagation()
              setActionSheetVisible(true)
            }}
          >
            {isLogin && <Icon type="iconbtn_essay_close" />}
          </span>
        }
      </div>
      <ActionSheet
        extra="请选择你要进行的操作"
        cancelText="取消"
        visible={actionSheetVisible}
        actions={actionSheetActions}
        onAction={onAction}
        onClose={() => setActionSheetVisible(false)}
      />
    </div>
  )
})

export default ArticleItem