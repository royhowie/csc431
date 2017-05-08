import { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import GalleryThumbnail from './GalleryThumbnail.jsx'

import { Galleries } from '../../api/galleries.js'
import { Images } from '../../api/images.js'

import queryString from 'query-string'

class QueryResults extends Component {
  renderRows () {
    return this.props.images.map((row, i) => {
      return (
        <tr key={i} onClick={this.props.onClick(row)}>
          <td>{i+1}</td>
          <td>
            {
              row.is_dir ?
                <span className='glyphicon glyphicon-folder-open'/>
                : <span className='glyphicon glyphicon-file'/>
            }
          </td>
          <td className='file-name'>{row._id}</td>
        </tr>
      )
    })
  }

  render () {
    if (!this.props.ready) {
      return <h3>Loading...</h3>
    }

    if (!this.props.images.length) {
      return (
        <div>
          <h1>Query Results</h1>
          <p>Nothing found!</p>
        </div>
      )
    }

    return (
      <div>
        <h1>Query Results</h1>
        <p>
          Context: <code>{this.props.beginsWith}</code>
        </p>
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>type</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

QueryResults.propTypes = {
  beginsWith: PropTypes.string,
  end: PropTypes.instanceOf(Date),
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  query: PropTypes.string,
  ready: PropTypes.bool,
  start: PropTypes.instanceOf(Date),
}


export default createContainer((props) => {
  let handle = Meteor.subscribe('search-images', props.query, props.beginsWith)
  return {
    images: Images.find({}).fetch(),
    ready: handle.ready(),
  }
}, QueryResults)
