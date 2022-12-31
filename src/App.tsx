import { useState, Suspense, lazy } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import './App.css'

const ReactIssues = lazy(() => import('./pages/ReactIssues'))
const TypescriptIssues = lazy(() => import('./pages/TypescriptIssues'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/issues/react/:page"
            element={<ReactIssues />}
          />
          <Route
            path="/issues/typescript/:page"
            element={<TypescriptIssues />}
          />
        </Route>
      </Routes>
    </div>
  )
}

const Layout = () =>
  (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/issues/react/1">facebook/react</Link>
          </li>
          <li>
            <Link to="/issues/typescript/1">microsoft/typescript</Link>
          </li>
        </ul>
      </nav>
      <hr/>
      <Suspense fallback={<>...</>}>
        <Outlet/>
      </Suspense>
    </>
  )

export default App
