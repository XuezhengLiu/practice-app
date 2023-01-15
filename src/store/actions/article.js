import request from '../../utils/request'

export const addComment = (id, content) => {
  return async (dispatch) => {
    const res = await request({
      url: '/comments',
      method: 'post',
      data: {
        target: id,
        content
      }
    })

    dispatch(saveNewComment(res.data.new_obj))
  }
}

export const getArticleDetail = (id) => {
  return async (dispatch) => {
    const res = await request({
      url: `articles/${id}`,
      method: 'get'
    })

    dispatch(saveDetial(res.data))
  }
}

export const getCommentList = (id) => {
  return async (dispatch) => {
    const res = await request({
      url: '/comments',
      method: 'get',
      params: {
        type: 'a',
        source: id
      }
    })

    dispatch(saveComment(res.data))
  }
}

export const getMoreCommentList = (id, last_id) => {
  return async (dispatch) => {
    const res = await request({
      url: '/comments',
      method: 'get',
      params: {
        type: 'a',
        source: id,
        offset: last_id
      }
    })

    dispatch(saveMoreComment(res.data))
  }
}

export const saveComment = (commentDetail) => {
  return {
    type: 'article/saveComment',
    payload: commentDetail
  }
}

export const saveDetial = (articleDetail) => {
  return {
    type: 'article/saveDetail',
    payload: articleDetail
  }
}

export const saveMoreComment = (commentDetail) => {
  return {
    type: 'article/saveMoreComment',
    payload: commentDetail
  }
}

export const saveNewComment = (comment) => {
  return {
    type: 'article/saveNewComment',
    payload: comment
  }
}



export const likeArticle = (id, attitude) => {
  return async (dispatch) => {
    if (attitude === 1) {
      await request({
        url: '/article/likings/' + id,
        method: 'delete'
      })
    } else {
      await request({
        url: '/article/likings',
        method: 'post',
        data: {
          target: id
        }
      })
    }
    dispatch(getArticleDetail(id))
  }
}

export const collectArticle = (id, is_collected) => {
  return async (dispatch) => {
    if (is_collected) {
      await request({
        url: '/article/collections/' + id,
        method: 'delete'
      })
    } else {
      await request({
        url: '/article/collections',
        method: 'post',
        data: {
          target: id
        }
      })
    }
    dispatch(getArticleDetail(id))
  }
}

export const followUser = (aut_id, art_id, is_followed) => {
  return async (dispatch) => {
    if (is_followed) {
      await request({
        url: '/user/followings/' + aut_id,
        method: 'delete'
      })
    } else {
      await request({
        url: '/user/followings',
        method: 'post',
        data: {
          target: aut_id
        }
      })
    }
    dispatch(getArticleDetail(art_id))
  }
}
