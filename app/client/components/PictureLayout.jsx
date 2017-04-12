import { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import GalleryThumbnail from './GalleryThumbnail.jsx'
import { Galleries } from '../../api/galleries.js'

class PictureLayout extends Component {
  renderGalleryThumbnails () {
    return this.props.galleries.map(gallery => {
      return <GalleryThumbnail key={gallery._id} gallery={gallery} />
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          {this.renderGalleryThumbnails()}
        </div>
      </div>
    )
  }
}

PictureLayout.propTypes = {
  galleries: PropTypes.array.isRequired,
}

export default createContainer(() => {
  Meteor.subscribe('galleries')
  return {
    galleries: Galleries.find({}, { sort: { date: 1 } }).fetch(),
  }
}, PictureLayout)
