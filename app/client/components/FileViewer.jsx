import { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import Loading from './Loading.jsx'
import { Images } from '../../api/images.js'

class FileViewer extends Component {
  render () {
    if (!this.props.image) {
      return <Loading status={this.props.loading}/>
    }
    return (
      <p>{JSON.stringify(this.props.image)}</p>
    )
  }
}

FileViewer.propTypes = {
  image: PropTypes.object,
  loading: PropTypes.bool.isRequired,
}

export default createContainer((props) => {
  const inode = parseInt(props.match.params.inode)
  let handle = Meteor.subscribe('single-image', inode)
  return {
    image: Images.findOne({ inode }),
    loading: handle.ready(),
  }
}, FileViewer)
