import { Component } from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'

import About from './components/About.jsx'
import Gallery from './components/Gallery.jsx'
import NotFound from './components/NotFound.jsx'
import NavBar from './components/NavBar.jsx'
import PictureLayout from './components/PictureLayout.jsx'
import Query from './components/Query.jsx'

const App = () => (
  <Router>
    <div>
      <NavBar/>
      <div className='container'>
        <Switch>
          <Route path='/' exact component={Query}/>
          <Route path='/gallery' exact component={PictureLayout}/>
          <Route path='/gallery/:id' component={Gallery}/>
          <Route path='/about' exact component={About}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </div>
  </Router>
)

export default App
