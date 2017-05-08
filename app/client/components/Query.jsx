import { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'
import QueryResults from './QueryResults.jsx'
import queryString from 'query-string'

class Query extends Component {
  constructor (props) {
    super(props)

    this.state = {
      query: null,
      beginsWith: '',
      path: [],
      start: null,
      end: null,
      timeout: null,
      treeView: false,
    }

    this.props.history.listen((location, action) => {
      let params = queryString.parse(location.search)
      this.setState({ beginsWith: params.beginsWith })
      if (action === 'POP') {
        this.state.path.pop()
      }
    })
  }

  setTextBox (params, key, $selector, cast=null) {
    if (params[key]) {
      $selector.val(params[key])
      let val = cast ? new cast(params[key]) : params[key]
      this.setState({ [key]: val })
    }
  }

  componentDidMount () {
    $('#date-picker-start').datepicker({ clearBtn: true })
    $('#date-picker-end').datepicker({ clearBtn: true })

    let params = queryString.parse(this.props.location.search)
    this.setTextBox(params, 'query', $('#queryInput'))
    this.setTextBox(params, 'start', $('#date-picker-start'), Date)
    this.setTextBox(params, 'end', $('#date-picker-end'), Date)
    this.setState({ beginsWith: params.beginsWith })

    if (params.tree && params.tree == 'true') {
      this.setState({ treeView: true })
      this.updateURL()
    }

    $('#date-picker-start').change(this.processQuery.bind(this))
    $('#date-picker-end').change(this.processQuery.bind(this))
  }

  handleClick (child, is_tree) {
    // If not in tree view, every result should transition to <FileViewer/>.
    if (!is_tree) {
      return () => this.props.history.push(`/file/${child.inode}`)
    }
    // If the child is a file, transition to the file-viewer component.
    else if (!child.is_dir) {
      return () => this.props.history.push(`/file/${child.inode}`)
    }

    // Otherwise, change the context of the tree.
    return () => {
      // Add the directory to the path
      this.state.path.push(child._id)

      // Regenerate the beginsWith parameter.
      const beginsWith = this.state.path.join('/') + '/'

      // Change the state so it propagates to <QueryResults/>.
      this.setState({ beginsWith })

      // Create a new set of URL parameters and update the URL accordingly.
      let params = {
        ...queryString.parse(this.props.location.search),
        beginsWith
      }
      this.props.history.push(`/?${queryString.stringify(params)}`)
    }
  }

  processQuery (event) {
    event.preventDefault()
    clearTimeout(this.state.timeout)

    const timeout = setTimeout(() => this.updateURL(), 500)

    this.setState({ timeout })
  }

  toggleTreeView () {
    this.setState({ treeView: !this.state.treeView })
    this.updateURL()
  }

  updateURL () {
    const query = $('#queryInput').val()
    const start = $('#date-picker-start').datepicker('getDate')
    const end = $('#date-picker-end').datepicker('getDate')
    const format = 'MM-DD-YYYY'

    let params = {
      ...queryString.parse(this.props.location.search),
      query,
      tree: (!this.state.treeView).toString(),
    }

    if (start) {
      params.start = moment(start).format(format)
    } else {
      delete params.start
    }
    if (end) {
      params.end = moment(end).format(format)
    } else {
      delete params.end
    }
    this.props.history.push(`/?${queryString.stringify(params)}`)
    this.setState({ query, start, end })
  }

  render () {
    return (
      <div className='container'>
        <div className='col-lg-3'>
          <h1>Query</h1>
          <form onSubmit={this.processQuery.bind(this)}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='queryInput'
                placeholder='text search'
                onChange={this.processQuery.bind(this)}
              />
              <label htmlFor='date-picker-start'>start date</label>
              <input
                type='text'
                className='form-control'
                id='date-picker-start'
                placeholder='start date'
                onChange={this.processQuery.bind(this)}
              />
              <label htmlFor='date-picker-end'>end date</label>
              <input
                type='text'
                className='form-control'
                id='date-picker-end'
                placeholder='end date'
                onChange={this.processQuery.bind(this)}
              />
              <div className='input-group' id='tree-view-group'>
                <span className='input-group-addon'>
                  <input
                    type='checkbox'
                    id='tree-view'
                    readOnly
                    checked={this.state.treeView}
                    onClick={this.toggleTreeView.bind(this)}
                  />
                </span>
                <input
                  type='text'
                  className='form-control'
                  readOnly
                  defaultValue='tree view'
                  onClick={this.toggleTreeView.bind(this)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className='col-lg-9'>
          <QueryResults
            query={this.state.query}
            start={this.state.start}
            end={this.state.end}
            onClick={this.handleClick.bind(this)}
            beginsWith={this.state.beginsWith}
            tree={this.state.treeView}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Query)
