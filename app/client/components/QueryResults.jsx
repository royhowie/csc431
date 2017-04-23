import { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import GalleryThumbnail from './GalleryThumbnail.jsx'
import { Galleries } from '../../api/galleries.js'


class QueryResults extends Component {
  renderGalleryThumbnails () {
    return this.props.galleries.map(gallery => {
      return <GalleryThumbnail key={gallery._id} gallery={gallery} />
    })
  }

  render () {
    if (!this.props.ready) {
      return <h3>Loading...</h3>
    }

    return (
      <div>
        <h1>Query Results</h1>
        <div className='row'>
          {this.renderGalleryThumbnails()}
        </div>
      </div>
    )
  }
}

QueryResults.propTypes = {
  end: PropTypes.instanceOf(Date),
  galleries: PropTypes.array.isRequired,
  query: PropTypes.string,
  ready: PropTypes.bool,
  start: PropTypes.instanceOf(Date),
}


export default createContainer((props) => {
  let handle = Meteor.subscribe('search-galleries', props.query)
  return {
    galleries: Galleries.find({}).fetch(),
    ready: handle.ready(),
  }
}, QueryResults)
