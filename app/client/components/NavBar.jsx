import { Component } from 'react'
import NavLink from './NavLink.jsx'

export default class NavBar extends Component {
  render () {
    return (
      <nav className='navbar navbar-default container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#navbar-collapse'
            aria-expanded='false'
          >
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <NavLink className='navbar-brand' to='/'>
            Image Management
          </NavLink>
        </div>
        <div className='collapse navbar-collapse' id='navbar-collapse'>
          <ul className='nav navbar-nav'>
            <li><NavLink to='/home'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li><NavLink to='/login'>Login</NavLink></li>
          </ul>
        </div>
      </nav>
    )
  }
}
