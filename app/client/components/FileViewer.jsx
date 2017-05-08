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
      <div>
        <h1>
          <code>{this.props.image.path}</code>
        </h1>
        <img src={`/img${this.props.image.path}`}></img>
      </div>
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
