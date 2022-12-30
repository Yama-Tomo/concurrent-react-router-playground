import { useState, Suspense, lazy } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import './App.css'

const Page1 = lazy(() => import('./pages/Page1'))
const Page2 = lazy(() => import('./pages/Page2'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
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
            path="page1"
            element={
              <Suspense fallback={<>...</>}>
                <Page1 />
              </Suspense>
            }
          />
          <Route
            path="page2"
            element={
              <Suspense fallback={<>...</>}>
                <Page2 />
              </Suspense>
            }
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
            <Link to="/page1">page 1</Link>
          </li>
          <li>
            <Link to="/page2">page 2</Link>
          </li>
        </ul>
      </nav>
      <hr/>
      <Outlet/>
    </>
  )

export default App
