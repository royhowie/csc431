import { Component } from 'react'
import { withRouter } from 'react-router'

class NotFound extends Component {
  constructor (props) {
    super(props)
    this.state = { timeout: null }
  }
  componentWillMount () {
    const timeout = setTimeout(() => {
      this.props.history.push('/')
    }, 2500)

    this.setState({ timeout })
  }

  componentWillUnmount () {
    console.log(this.state.timeout)
    clearTimeout(this.state.timeout)
  }

  render () {
    return (
      <div id='not-found-block' className='text-center'>
        <h1>404: That's a dead-end!</h1>
        <p>Sending you back to the home page.</p>
      </div>
    )
  }
}

export default withRouter(NotFound)
