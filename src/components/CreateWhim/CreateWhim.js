import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import { createWhim } from '../../api/whim'
import messages from '../AutoDismissAlert/messages'

class CreateWhim extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      location: '',
      body: ''
    }

    this.goBack = this.goBack.bind(this)
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateWhim = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props

    createWhim(this.state, user)
      .catch(error => {
        this.setState({ body: '' })
        msgAlert({
          heading: 'Create whim failed with error: ' + error.message,
          message: messages.createWhimFailure,
          variant: 'danger'
        })
      })
  }

  goBack () {
    this.props.history.goBack()
  }

  // removed time for now
  // <Form.Group controlId="time">
  //   <Form.Control
  //     required
  //     className="field"
  //     type="datetime-local"
  //     name="time"
  //     value={time}
  //     placeholder=''
  //     onChange={this.handleChange}
  //   />
  // </Form.Group>

  render () {
    const { title, location, body } = this.state

    return (
      <div className="row form mainbox">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <p className="ptitles">Add Whim</p>
          <Form onSubmit={this.onCreateWhim}>
            <Form.Group controlId="title">
              <Form.Control
                required
                className="field"
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Control
                required
                className="field"
                type="text"
                name="location"
                value={location}
                placeholder="Location"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="body">
              <Form.Control
                required
                className="field"
                type="text"
                name="body"
                value={body}
                placeholder="Details"
                as="textarea"
                rows={3}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              className="button"
              variant="primary"
              type="submit"
              onClick={this.goBack}
            >
              Add Whim
            </Button>
            <Button
              variant="secondary"
              className="button"
              type="button"
              onClick={this.goBack}
            >Go Back</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreateWhim)
