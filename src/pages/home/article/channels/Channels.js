import classnames from 'classnames'
import Icon from '../../../../components/icon/Icon'
import styles from './Channels.module.scss'
import { addUserChannel, deleteUserChannel, getAllChannels } from '../../../../store/actions/home'
import { Toast } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Channels = ({ userChannles = [], tabActiveIndex, onClose, onChange }) => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    dispatch(getAllChannels())
  }, [dispatch])

  const allChannels = useSelector((state) => state.home.allChannels)
  const recommedChannels = allChannels.filter((item) => !userChannles.map((item) => item.id).includes(item.id))

  const onAddChannel = (channels) => {
    dispatch(addUserChannel(channels))
  }

  const onChannelItemClick = (index) => {
    if (isEdit) return Toast.show('当前处于编辑状态，不允许跳转')
    setIsEdit(false)
    onChange(index)
    onClose()
  }

  const onDeleteChannel = async (item, index) => {
    if (userChannles.length <= 4) {
      return Toast.show('最少保留4个频道')
    }

    if (tabActiveIndex === index) {
      onChange(0)
    } else if (index < tabActiveIndex) {
      onChange(tabActiveIndex - 1)
    }

    dispatch(deleteUserChannel(item))
  }

  const onEdit = () => setIsEdit(!isEdit)

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        <div className={classnames('channel-item', isEdit ? 'edit' : '')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击{isEdit ? '删除' : '进入'}频道</span>
            <span className="channel-item-edit" onClick={onEdit}>
              {isEdit ? '保存' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {userChannles.map((item, index) => (
              <span key={item.id} className={classnames('channel-list-item', index === tabActiveIndex ? 'selected' : '')} onClick={() => onChannelItemClick(index)}>
                {item.name}
                {item.id !== 0 && (
                  <Icon
                    type="iconbtn_tag_close"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteChannel(item, index)
                    }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recommedChannels.map((item) => (
              <span key={item.id} className="channel-list-item" onClick={() => onAddChannel([item])}>
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
