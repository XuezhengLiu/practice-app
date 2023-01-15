import React, { useEffect, useState } from 'react'
import ArticleItem from '../articleItem/ArticleItem'
import styles from './ArticleList.module.scss'
import { getArticleList } from '../../../../store/actions/home'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'

const ArticleList = ({ channelId, activeId }) => {

  const dispatch = useDispatch()

  const current = useSelector((state) => state.home.articles[channelId])

  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (current) return
    if (channelId === activeId) {
      dispatch(getArticleList(channelId, Date.now()))
    }
  }, [channelId, activeId, dispatch, current])

  const loadMore = async () => {
    if (!current.timestamp) {
      setHasMore(false)
      return
    }
    try {
      await dispatch(getArticleList(channelId, current.timestamp, true))
    } catch (error) {
      setHasMore(false)
    }
  }

  const onRefresh = () => {
    setHasMore(true)
    dispatch(getArticleList(channelId, Date.now()))
  }

  if (!current)
    return null

  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        <div className="articles">
          {current.list.map((item) => {
            return (
              <div className="article-item" key={item.art_id}>
                <ArticleItem article={item}></ArticleItem>
              </div>
            )
          })}
        </div>
      </PullToRefresh>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

export default ArticleList
