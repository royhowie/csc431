import { Component } from 'react'
import { Link } from 'react-router-dom'

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
          <Link className='navbar-brand' to='/'>
            Image Management Service
          </Link>
        </div>
        <div className='collapse navbar-collapse' id='navbar-collapse'>
          <ul className='nav navbar-nav'>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/gallery'>pictures</Link></li>
            <li><Link to='/1234567890'>404 mistake</Link></li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}
