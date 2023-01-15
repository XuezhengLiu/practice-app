import { useRef, useEffect } from 'react'
import styles from './Sticky.module.scss'
import throttle from 'lodash/fp/throttle'



const Sticky = ({ offset = 0, children }) => {
  const containerRef = useRef(null)
  const placeholderRef = useRef(null)

  useEffect(() => {
    const containerDOM = containerRef.current
    const placeholderDOM = placeholderRef.current

    const onScroll = throttle(60, () => {
      const { top } = placeholderDOM.getBoundingClientRect()
      if (top <= offset) {
        containerDOM.style.position = 'fixed'
        containerDOM.style.top = `${offset}px`
        placeholderDOM.style.height = `${containerDOM.offsetHeight}px`
      } else {
        containerDOM.style.position = 'static'
        containerDOM.style.top = 'auto'
        placeholderDOM.style.height = '0px'
      }
    })
    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [offset])

  return (
    <div className={styles.root}>
      <div ref={placeholderRef} className="sticky-placeholder" />
      <div className="sticky-container" ref={containerRef}>
        {children}
      </div>
    </div>
  )
}

export default Sticky
