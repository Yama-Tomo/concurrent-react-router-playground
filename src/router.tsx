import { useLayoutEffect, useTransition, useRef, useState } from 'react'
import { Router, BrowserRouterProps } from 'react-router-dom'
import { createBrowserHistory } from '@remix-run/router'

export const BrowserRouter = ({ window, ...rest }: BrowserRouterProps) => {
  const historyRef = useRef<ReturnType<typeof createBrowserHistory>>()
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window, v5Compat: true })
  }

  const history = historyRef.current
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  })

  const [isPending, startTransition] = useTransition()

  useLayoutEffect(() => {
    return history.listen((update) => {
      startTransition(() => {
        setState(update)
      })
    })
  }, [history, startTransition, setState])

  return (
    <Router
      {...rest}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}
