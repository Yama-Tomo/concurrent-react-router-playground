import { useEffect, useState } from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'

TopBarProgress.config({
  barColors: { 0: '#41d1ff', 1: '#41d1ff' }
})
export type DelayedTopBarProps = { delayMs: number }
export const DelayedTopBar = ({ delayMs }: DelayedTopBarProps) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, delayMs)

    return () => {
      clearTimeout(timer)
    }
  }, [delayMs, setShow])

  return show ? <TopBarProgress /> : <></>
}
