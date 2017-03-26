import { Component } from 'react'

export default class Index extends Component {
  componentWillMount () {
    document.title = 'Image Management Service - Index'
  }

  render () {
    return (
      <div>
        <p>This route loads Index.jsx</p>
      </div>
    )
  }
}
