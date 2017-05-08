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
    $('#date-picker-start').datepicker()
    $('#date-picker-end').datepicker()

    let params = queryString.parse(this.props.location.search)
    this.setTextBox(params, 'query', $('#queryInput'))
    this.setTextBox(params, 'start', $('#date-picker-start'), Date)
    this.setTextBox(params, 'end', $('#date-picker-end'), Date)
    this.setState({ beginsWith: params.beginsWith })
  }

  handleClick (child) {
    // If the child is a file, transition to the file-viewer component.
    if (!child.is_dir) {
      return () => {
        this.props.history.push(`/file/${child.inode}`)
        console.log('FILE:', child)
      }
    }
    return () => {
      this.state.path.push(child._id)

      const beginsWith = this.state.path.join('/') + '/'
      this.setState({ beginsWith })
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

    const timeout = setTimeout(() => {
      const query = $('#queryInput').val()
      const start = $('#date-picker-start').datepicker('getDate')
      const end = $('#date-picker-end').datepicker('getDate')
      const format = 'MM-DD-YYYY'

      let params = { ...queryString.parse(this.props.location.search), query }

      if (start) {
        params.start = moment(start).format(format)
      }
      if (end) {
        params.end = moment(end).format(format)
      }
      this.props.history.push(`/?${queryString.stringify(params)}`)
      this.setState({ query, start, end })
    }, 500)

    this.setState({ timeout })
  }

  render () {
    return (
      <div className='container'>
        <div className='col-lg-3'>
          <h1>Query</h1>
          <form onSubmit={this.processQuery.bind(this)}>
            <div className='form-group'>
              {/* <label htmlFor='queryInput'>query</label> */}
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
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Query)
