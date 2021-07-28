import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { HomePage, Store } from './pages'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/store/:storeName' component={Store} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
