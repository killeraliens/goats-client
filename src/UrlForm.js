import React, { Component } from 'react';
import AppContext from './AppContext';

class UrlForm extends Component {
  static defaultProps = {
    onAddEvent: () => {}
  }

  static contextType = AppContext;

  state = {
    inputVal: '',
    loading: false
  }

  updateInputVal = (e) => {
    this.setState({
      inputVal: e.target.value
    })
  }

  getEventFromFacebook = (eventId) => {
    //what url do i fetch to send the eventId to search?
    fetch('localhost:5000/auth/facebook/callback')
    .then(res => {
      if (!res.ok) {
        throw new Error(res)
      }
      return res.json()
    })
    .then(resJson => {
      //const newEvent = resJson
      //this.context.addEvent(newEvent)
      //this.props.onAddEvent(newEvent)
    })
    .catch(err => {
      console.log('trouble finding event', err)
    })

  }

  handleSubmit = (e) => {
    e.preventDefault();
    //how do i shorten the below prop copy
    const stateCopy  = { ...this.state }
    const eventId = stateCopy.inputVal
    // should I also be sending the current users login credentials here?
    // Or For now we can use mine on server side? And I would allow access to the forms to any visitor?
    // this.callFacebookApi(eventId, this.context.user)
    this.getEventFromFacebook(eventId)
  }

  render() {
    if(this.state.loading) {
      return <div>Loading...</div>
    }

    return(
      <form className="UrlForm" onSubmit={this.handleSubmit}>
        <legend><h2>Add Event From Facebook</h2></legend>
        <label htmlFor="url-input">Type in Event Url or Id</label>
        <input id="url-input" name="url-input" type="text" value={this.state.inputVal} onChange={this.updateInputVal} required/>
        <button type="submit">Scrape Dis</button>
      </form>
    )
  }
}

export default UrlForm;
