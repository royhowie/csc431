import { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import QueryResults from './QueryResults.jsx'

class Query extends Component {
  constructor (props) {
    super(props)

    this.state = {
      query: null,
      start: null,
      end: null,
    }
  }

  componentDidMount () {
    $('#date-picker-start').datepicker()
    $('#date-picker-end').datepicker()
  }

  processQuery (event) {
    event.preventDefault()

    const query = $('#queryInput').val()
    const start = $('#date-picker-start').datepicker('getDate')
    const end = $('#date-picker-end').datepicker('getDate')

    this.setState({ query, start, end })
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
              />
              <label htmlFor='date-picker-end'>end date</label>
              <input
                type='text'
                className='form-control'
                id='date-picker-end'
                placeholder='end date'
              />
            </div>
          </form>
        </div>
        <div className='col-lg-9'>
          <QueryResults
            query={this.state.query}
            start={this.state.start}
            end={this.state.end}
          />
        </div>
      </div>
    )
  }
}

export default Query
