import { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import GalleryThumbnail from './GalleryThumbnail.jsx'

import { Galleries } from '../../api/galleries.js'
import { Images } from '../../api/images.js'

import queryString from 'query-string'

class QueryResults extends Component {
  renderRows (is_tree) {
    if (is_tree) {
      return this.props.images.map((row, i) => {
        return (
          <tr key={i} onClick={this.props.onClick(row, is_tree)}>
            <td>{i+1}</td>
            <td>
              {
                row.is_dir ?
                  <span className='glyphicon glyphicon-folder-open'/>
                  : <span className='glyphicon glyphicon-file'/>
              }
            </td>
            <td>{row._id}</td>
          </tr>
        )
      })
    }
    return this.props.images.map((row, i) => {
      return (
        <tr key={i} onClick={this.props.onClick(row, is_tree)}>
          <td>{i+1}</td>
          <td>
            <span className='glyphicon glyphicon-file'/>
          </td>
          <td>{row.path}</td>
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
        {
          this.props.tree &&
          <p>Context: <code>{this.props.beginsWith}</code></p>
        }
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>type</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows(this.props.tree)}
          </tbody>
        </table>
      </div>
    )
  }
}

QueryResults.propTypes = {
  beginsWith: PropTypes.string,
  end: PropTypes.instanceOf(Date),
  galleries: PropTypes.array,
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  query: PropTypes.string,
  ready: PropTypes.bool,
  start: PropTypes.instanceOf(Date),
  tree: PropTypes.bool.isRequired,
}

export default createContainer((props) => {
  // If tree view, use the aggregate search.
  if (props.tree) {
    let handle = Meteor.subscribe('search-images-aggregate', {
      query: props.query,
      beginsWith: props.beginsWith,
      start: props.start,
      end: props.end,
    })
    return {
      images: Images.find({}).fetch(),
      ready: handle.ready(),
    }
  // Otherwise, just display all relevent images.
  } else {
    let handle = Meteor.subscribe('search-images-general', {
      query: props.query,
      beginsWith: props.beginsWith,
      start: props.start,
      end: props.end,
    })
    let gallery_handle = Meteor.subscribe('search-galleries', props.start, props.end)
    return {
      galleries: Galleries.find({}).fetch(),
      images: Images.find({}).fetch(),
      ready: handle.ready() && gallery_handle.ready(),
    }
  }
}, QueryResults)
