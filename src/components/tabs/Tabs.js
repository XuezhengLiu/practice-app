import React, { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './Tabs.module.scss'

const Tabs = ({ index = 0, tabs = [], children, onChange }) => {
  const lineRef = useRef()
  const navRef = useRef()

  const [activeIndex, setActiveIndex] = useState(index)

  const changeTab = (index) => {
    setActiveIndex(index)
    onChange && onChange(index)
  }

  useEffect(() => {
    setActiveIndex(index)
  }, [index])

  useEffect(() => {

    let count = 0

    const activeTab = navRef.current.children[activeIndex]
    const activeTabWidth = activeTab.offsetWidth || 60
    const activeOffsetLeft = activeTab.offsetLeft || 8
    const tabWidth = navRef.current.offsetWidth || 289

    const to = activeOffsetLeft - (tabWidth - activeTabWidth) / 2
    const from = navRef.current.scrollLeft
    const frames = Math.round((0.2 * 1000) / 16)

    const animate = () => {
      navRef.current.scrollLeft += (to - from) / frames
      if (++count < frames) {
        requestAnimationFrame(animate)
      }
    }

    animate()

    lineRef.current.style.transform = 'translateX(' +
      (activeOffsetLeft + activeTabWidth / 2 - 15 * (window.innerWidth / 375)) +
      'px)'
  }, [activeIndex, tabs])

  return (
    <div className={styles.root}>
      <div className="tabs">
        <div className="tabs-wrap">
          <div className="tabs-nav" ref={navRef}>
            {tabs.map((item, i) => (
              <div
                className={classnames('tab', i === activeIndex ? 'active' : '')}
                key={i}
                onClick={() => changeTab(i)}
              >
                <span>{item.name}</span>
              </div>
            ))}
            <div className="tab-line" ref={lineRef}></div>
          </div>
        </div>

        <div className="tabs-content">
          {React.Children.map(children, (child, index) => {
            return (
              <div
                className="tabs-content-wrap"
                style={{ display: index === activeIndex ? 'block' : 'none' }}
              >
                {
                  React.cloneElement(child, { aid: tabs[activeIndex]?.id || 0 })
                }
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
}

export default Tabs