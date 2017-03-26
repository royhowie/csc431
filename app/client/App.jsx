import { Component } from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'

import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Index from './components/Index.jsx'
import NotFound from './components/NotFound.jsx'
import NavBar from './components/NavBar.jsx'

const App = () => (
  <Router>
    <div>
      <NavBar/>
      <div className='container'>
        <Switch>
          <Route path='/' exact component={Index}/>
          <Route path='/home' exact component={Home}/>
          <Route path='/about' exact component={About}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </div>
  </Router>
)

export default App
