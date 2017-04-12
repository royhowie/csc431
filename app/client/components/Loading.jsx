import { Component, PropTypes } from 'react'

export default class Loading extends Component {
  render () {
    return <div>Loading...</div>
  }
}

Loading.propTypes = {
  status: PropTypes.bool.isRequired,
}
