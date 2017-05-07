import { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { Galleries } from '../../api/galleries.js'

export default class GalleryThumbnail extends Component {
  getGalleryLink () {
    return this.props.gallery.getLink()
  }

  render () {
    return (
      <div className='col-sm-3 col-md-3 text-center'>
        <Link to={this.getGalleryLink()} className='thumbnail'>
          <span className='glyphicon glyphicon-folder-open' aria-hidden='true'/>
          <h3>{this.props.gallery.name}</h3>
        </Link>
      </div>
    )
  }
}

GalleryThumbnail.propTypes = {
  gallery: PropTypes.object.isRequired,
}
