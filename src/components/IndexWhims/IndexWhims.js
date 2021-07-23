import React, { Component } from 'react'
import { indexWhims, deleteWhim, updateWhim } from '../../api/whim'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
// import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'

class IndexWhims extends Component {
  constructor (props) {
    super(props)

    this.state = {
      whims: null,
      title: '',
      location: '',
      body: '',
      formDisplay: false,
      formBody: '',
      formId: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexWhims(user)
      .then(res => this.setState({ whims: res.data.whims }))
      .catch(error => msgAlert({
        heading: 'Whim indexing failed ' + error.message,
        message: messages.indexWhimFailure,
        variant: 'danger'
      }))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.indexWhimSuccess,
        variant: 'success'
      }))
  }

  showEditForm = (event) => {
    event.preventDefault()
    this.setState({
      formDisplay: true,
      formId: event.target.getAttribute('data-id')
    })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  whimUpdate = (event) => {
    console.log(event)
    event.preventDefault()
    const { title, location, body, formId } = this.state
    const { user, msgAlert, history } = this.props
    updateWhim(user, formId, title, location, body)
      .then(() => this.setState({
        formId: null,
        formBody: '',
        formDisplay: false
      }))
      // .then(() => msgAlert({
      //   heading: 'Success!',
      //   message: messages.updatePostSuccess,
      //   variant: 'success'
      // }))
      .then(() => history.push('/'))
      .then(() => history.push('/index-whims'))
      .catch(error => msgAlert({
        heading: 'Whim update failed ' + error.message,
        message: messages.updateWhimFailure,
        variant: 'danger'
      }))
  }

  whimDelete = (event) => {
    const id = event.target.getAttribute('data-id')
    const { user, msgAlert, history } = this.props
    deleteWhim(user, id)
      // .then(() => msgAlert({
      //   heading: 'Success!.',
      //   message: messages.deletePostSuccess,
      //   variant: 'success'
      // }))
      .then(() => history.push('/'))
      .then(() => history.push('/index-whims'))
      .catch(error => msgAlert({
        heading: 'Whim deletion failed ' + error.message,
        message: messages.deleteWhimFailure,
        variant: 'danger'
      }))
  }

  // whimDelete = (event) => {
  //   const itemId = event.target.getAttribute('whim-id')
  //   const { user, msgAlert, history } = this.props
  //   deleteItem(user, whimId)
  //     // .then(() => msgAlert({
  //     //   heading: 'Success!.',
  //     //   message: messages.deletePostSuccess,
  //     //   variant: 'success'
  //     // }))
  //     .then(() => history.push('/'))
  //     .then(() => history.push('/index-whims'))
  //     .catch(error => msgAlert({
  //       heading: 'Whim deletion failed ' + error.message,
  //       message: messages.deletePostFailure,
  //       variant: 'danger'
  //     }))
  // }

  goBack = event => {
    this.setState({ formDisplay: false, formId: null })
  }

  // removing time for now
  // <Form.Group controlId="date">
  //   <Form.Control
  //     // required
  //     className="field"
  //     type="datetime-local"
  //     name="time"
  //     value={time}
  //     placeholder=''
  //     onChange={this.handleChange}
  //   />
  // </Form.Group>

  render () {
    const { whims, formDisplay, title, location, body } = this.state

    let whimsJsx = ''
    // here we manage states (1. loading 2. no posts 3. display posts)
    if (whims === null) {
      whimsJsx = (
        <Spinner animation="border" variant="primary" />
      )
    } else if (whims.length === 0) {
      whimsJsx = (
        <div>
          <p>No whims to display! Go add a whim!</p>
          <Button
            variant="primary"
            href={'#create-whim'}
          >
            Add Whim</Button>
        </div>
      )
    } else if (formDisplay) {
      whimsJsx = (
        <Form onSubmit={this.whimUpdate}>
          <Form.Group controlId="title">
            <Form.Control
              // required
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
              // required
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
              // required
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
          >
              Update
          </Button>
          <Button
            variant="secondary"
            className="button"
            type="button"
            onClick={this.goBack}
          >Go Back</Button>
        </Form>
      )
    } else {
      whimsJsx = (
        <div>
          <Button
            className="button"
            variant="secondary"
            href={'#create-potluck'}
          >
            Add Whim</Button>
          <p></p>
          <ul className="list">
            <Card border="primary">
              {whims.slice(0).reverse().map(whim => (
                <li key={whim._id}>
                  <ul>
                    <li>{whim.title}</li>
                    <li>Location: {whim.location}</li>
                    <li>Details: {whim.body}</li>
                  </ul>
                  {/*  leaving this out for now, have yet to find a good use
                    for it
                    <div className="timestamp">
                    {(new Date(potluck.createdAt)).toDateString()}
                    <span> </span>
                    {(new Date(potluck.createdAt)).toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })}
                  </div> */}
                  <Button
                    variant="danger"
                    className="button"
                    type="button"
                    onClick={this.whimDelete}
                    data-id={whim._id}
                  >
                    Delete
                  </Button>
                  <Button
                    className="button"
                    variant="secondary"
                    type="button"
                    onClick={this.showEditForm}
                    data-id={whim._id}
                  >
                    Edit
                  </Button>
                </li>
                // {<Accordion>
                //   <Card border="primary">
                //     <Card.Header>
                //       <Accordion.Toggle as={Button} variant="info" eventKey="0">
                //         View items for {potluck.title}
                //       </Accordion.Toggle>
                //     </Card.Header>
                //     <Accordion.Collapse eventKey="0">
                //       <Card.Body>
                //         <Button
                //           variant="secondary"
                //           className="button"
                //           type="button"
                //           href={`#/create-item/${potluck._id}`}>
                //             Add Item</Button>
                //         {potluck.items.map(item => (
                //           <div key={item._id}>
                //             <Card.Body>
                //               <Card border="secondary">
                //                 <Card.Body>
                //                   {item.name} by {item.ownerEmail}
                //                 </Card.Body>
                //               </Card>
                //               {this.props.user._id === item.owner
                //                 ? <Button
                //                   className="button"
                //                   variant="danger"
                //                   onClick={this.itemDelete}
                //                   potluck-id={potluck._id}
                //                   item-id={item._id}
                //                   // href={`#/items/${item._id}/delete-item/${potluck._id}`}
                //                 >
                //                   Delete</Button> : ''}
                //               {this.props.user._id === item.owner
                //                 ? <Button
                //                   className="button"
                //                   variant="secondary"
                //                   // onClick={this.itemUpdate}
                //                   // potluck-id={potluck._id}
                //                   // item-id={item._id}
                //                   href={`#/items/${item._id}/edit-item/${potluck._id}`}
                //                 >
                //                   Edit</Button> : ''}
                //               <div className="item-separator">
                //               </div>
                //             </Card.Body>
                //           </div>
                //         ))}
                //       </Card.Body>
                //     </Accordion.Collapse>
                //   </Card>
                //   <Card bg="primary" border="primary">
                //   </Card>
                // </Accordion>}
                //   <p></p>
                // </li>
              ))}
            </Card>
          </ul>
        </div>
      )
    }

    return (
      <div className="row d-flex">
        <div className="col-sm-10 col-md-8 mx-auto mt-5 mainbox">
          <Card border="primary">
            <Card.Header>My Whims</Card.Header>
            <Card.Body>
              {whimsJsx}
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(IndexWhims)
