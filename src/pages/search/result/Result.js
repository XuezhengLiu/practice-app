import ArticleItem from '../../home/article/articleItem/ArticleItem'
import NavBar from '../../../components/navBar/NavBar'
import styles from './Result.module.scss'
import { getSearchResults } from '../../../store/actions/search'
import { InfiniteScroll } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'


const Result = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const key = search.get('key')
  const dispatch = useDispatch()
  const results = useSelector((state) => state.search.results)
  const [hasMore, setHasMore] = useState(true)

  let page = 1

  const loadMore = async () => {
    try {
      await dispatch(getSearchResults(key, page))
      page = page + 1
    } catch (error) {
      setHasMore(false)
    }
  }

  return (
    <div className={styles.root}>
      <NavBar className="navBar" onLeftClick={() => navigate(-1)}>
        搜索结果
      </NavBar>

      <div className="article-list">
        {results.map((item) => (
          <ArticleItem key={item.art_id} article={item}></ArticleItem>
        ))}
      </div>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

export default Result
