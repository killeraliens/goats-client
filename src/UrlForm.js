import React, { Component } from 'react';
import AppContext from './AppContext';
import config from './config';

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
    debugger

    console.log('FETCH PERSONAL INFO USING ORIGINAL ASSIGNED TOKEN', this.context.user.facebook_provider_token)
    fetch(`https://graph.facebook.com/${this.context.user.facebook_provider_id}?fields=id,name&access_token=${this.context.user.facebook_provider_token}`)
      .then(res => {
      if (!res.ok) {
        return res.json().then(error => Promise.reject(error))
      }
      console.log(res)
      return res.json()
      })
      .catch(err => {
        console.log('trouble finding you', err)
      })

    // const postBody = {
    //   eventId: eventId,
    //   facebookProviderToken: this.context.user.facebook_provider_token,
    //   facebookProviderId: this.context.user.facebook_provider_id
    // }

    // const options = {
    //   method: "POST",
    //   body: JSON.stringify(postBody),
    //   headers: {
    //     "Content-Type": "application/json",
    //     // "Authorization": `Bearer ${config.API_KEY}`
    //   }
    // }
    // fetch(`${config.API_ENDPOINT}/api/event/facebook`, options)
    // .then(res => {
    //   if (!res.ok) {
    //     return res.json().then(error => Promise.reject(error))
    //   }
    //   return res.json()
    // })
    // .then(resJson => {
    //   console.log('SUCCESSS', resJson)
    //   //const newEvent = resJson
    //   //this.context.addEvent(newEvent)
    //   //this.props.onAddEvent(newEvent)
    // })
    // .catch(err => {
    //   console.log('trouble finding event', err)
    // })

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
