import React, { Component } from 'react';
import AppContext from './AppContext';

class CustomEventForm extends Component {
  static defaultProps = {
    onAddEvent: () => {}
  }

  static contextType = AppContext;

  state = {
    event: {
      title: '',
      imageUrl: '',
      date: '',
      bands: '',
      venueId: ''
    }

  }

  validate = (newEvent) => {
    console.log('validating....success');
    this.props.onAddEvent(newEvent)
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = { ...this.state.event };
    this.validate(newEvent);
  }

  updateTitle = (e) => {
    const event = { ...this.state.event}
    event.title = e.target.value
    this.setState({
      event
    })
  }

  render() {
    return(
      <form className="CustomEventForm" onSubmit={this.handleSubmit}>
        <label htmlFor="event-title">Title</label>
        <input type="text" id="event-title" name="event-title" value={this.state.event.title} onChange={this.updateTitle} />
        <button type="submit">Add It</button>
      </form>
    )
  }
}

export default CustomEventForm;
