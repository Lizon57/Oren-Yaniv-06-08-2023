import { Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import 'normalize.css'

import { useOnFirstRender } from "./hooks/use-on-first-render"

import { routes } from "./routes/routes"

import { setInitialSelectedCity } from "@/store/actions/weather.action"

import { Loader } from "./cmps/common/loader/loader"
import { AppHeader } from "./cmps/layout/app-header/app-header"

import './styles/_main.scss'
import './_app.scss'


export function App() {
  useOnFirstRender(setInitialSelectedCity)


  return (
    <div className="app-layout-container">
      <Router>
        <AppHeader />

        <div className="content">
          <Suspense fallback={<Loader />}>
            <Routes>
              {routes.map(({ id, path, element: Element }) => <Route
                key={id}
                path={path}
                element={<Element />} />)}
            </Routes>
          </Suspense>
        </div>

        <footer>&copy; Oren Yaniv 2023</footer>
      </Router>
    </div>
  )
}