import React, { FC, lazy, Suspense } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

const Home = lazy(() => import("./pages/Home"))

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/">
          <Suspense fallback={<h1>loading</h1>}>
            <Home />
          </Suspense>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App