import { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { Galleries } from '../../api/galleries.js'

export default class GalleryThumbnail extends Component {
  getGalleryLink () {
    return this.props.gallery.getLink()
  }

  getThumbnailLink () {
    return this.props.gallery.getThumbnailLink()
  }

  render () {
    return (
      <div className='col-sm-6 col-md-4'>
        <Link to={this.getGalleryLink()} className='thumbnail'>
          <img src={this.getThumbnailLink()}/>
          <div className='caption'>
            <h3 className='text-center'>{this.props.gallery.description}</h3>
          </div>
        </Link>
      </div>
    )
  }
}

GalleryThumbnail.propTypes = {
  gallery: PropTypes.object.isRequired,
}
