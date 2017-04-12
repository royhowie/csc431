import { Component, PropTypes } from 'react'

import Loading from './Loading.jsx'

import { createContainer } from 'meteor/react-meteor-data'
import { Galleries } from '../../api/galleries.js'
import { Images } from '../../api/images.js'

import { moment } from 'meteor/momentjs:moment'

class Gallery extends Component {
  componentDidMount () {
    // If Meteor subscriptions have finished loading and no gallery
    // corresponding to `this.props.params.id` has been found, redirect back to
    // /portfolio
    if (!this.props.loading && !this.props.gallery) {
      this.props.history.push({
        pathname: '/gallery',
        query: { notfound: true },
      })
    }
  }

  getThumbnailLink () {
    return this.props.gallery.getThumbnailLink()
  }

  renderImages () {
    return this.props.images.map(image => {
      return (
        <div key={image._id} className='col-lg-4 col-md-3 col-sm-6 thumbnail'>
          <img src={`/img/${image.path}`}/>
          <div className='caption'>
            <h6 className='text-center'>{image.path}</h6>
          </div>
        </div>
      )
    })
  }

  render () {
    const gallery = this.props.gallery

    if (!gallery)
      return <Loading status={this.props.loading}/>

    let defaultMap = (_, key) => _[key]
    let details = [
      { key: 'name' },
      { key: 'date', fn: _ => moment(_.date).format('MMM Do, YYYY') },
      { key: 'description' },
      { key: 'thumbnail' },
    ].map(({key, fn=defaultMap}) => {
      return (
        <li key={key} className='list-group-item'>
          <span className='badge'>{key}</span>
          {fn(gallery, key)}
        </li>
      )
    })

    return (
      <div className='row container-fluid'>
        <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12'>
          {/* <h1 className='text-center'>{gallery.name}</h1> */}
          <img src={this.getThumbnailLink()}/>
        </div>
        <div className='col-lg-4 col-md-12 col-sm-12 col-xs-12'>
          <ul className='list-group'>{details}</ul>
        </div>
        <div className='row col-lg-12'>{this.renderImages()}</div>
      </div>
    )
  }
}


Gallery.propTypes = {
  gallery: PropTypes.object,
  loading: PropTypes.bool,
}

export default createContainer(props => {
  const id = props.match.params.id
  let galleryHandle = Meteor.subscribe('single-gallery', id)
  let imagesHandle = Meteor.subscribe('images')
  return {
    gallery: Galleries.findOne(id),
    images: Images.find({ gallery: id }).fetch(),
    loading: galleryHandle.ready() && imagesHandle.ready(),
  }
}, Gallery)
