import React, {Component} from 'react'
import { Route, Switch, NavLink } from 'react-router-dom';
import './App.css'
import config from './config.js'
import AppContext from './AppContext'
import AddEventPg from './AddEventPg'
import ListPg from './ListPg'
import ProfilePg from './ProfilePg'
import Login from './Login'
import LoginFB from './LoginFB'
import Registration from './Registration'
import PrivateRoute from './PrivateRoute'


class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      countries: [],
      data: null,
      isAuthenticated: false,
      //token: '',
      user: null,
      error: null
    }

  }

  onFailure = (error) => { this.setState({ error }) }

  fetchApiData = async (type) => {
    const response = await fetch(`${config.API_ENDPOINT}/api/${type}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  componentDidMount() {
    this.fetchApiData('event')
      .then(jsonEvents => {
        this.setState({
          events: jsonEvents
        })
      })
      .catch(err => {
        console.log('ERROR ON SERVER MOUNT', err)
      })
    this.fetchApiData('event')
      .then(jsonEvents => {
        this.setState({
          events: jsonEvents
        })
      })
      .catch(err => {
        console.log('ERROR ON SERVER MOUNT', err)
      })
  }


  addEvent = (newEvent) => {
    console.log('adding new event to state', newEvent)
    const events = [...this.state.events, newEvent]
    this.setState({ events })
  }

  updateUser = (id) => {
    console.log('do something with user id and state', id)
  }

  updateAuthenticated = (bool, user) => {
    this.setState({
      isAuthenticated: bool,
      user
    })
  }

  render() {
    const context = {
      events: this.state.events,
      addEvent: this.addEvent,
      user: this.state.user,
      token: this.state.token,
      isAuthenticated: this.state.isAuthenticated,
      updateAuthenticated: this.updateAuthenticated
    }
    const LoginOrLogoutLink = this.state.isAuthenticated && this.state.user
      ? <NavLink to={`/`}>Logout</NavLink> //change to profile menu or logout
      : <NavLink to='/login'>Login</NavLink>
    return(
      <div className="App">
        <AppContext.Provider value={context}>
          <div className="router-data">{this.state.data}</div>
          <nav>
            <NavLink to='/'>Events</NavLink>{<br/>}
            <NavLink to='/add-event'>Add Event</NavLink>{<br/>}
            {LoginOrLogoutLink}
          </nav>
          <main>
            <Switch>
              <Route exact path="/" component={ListPg}/>
              <PrivateRoute path="/add-event" component={AddEventPg}/>
              <Route path={`/profile/:id`} component={ProfilePg} />
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Registration}/>
            </Switch>
          </main>
        </ AppContext.Provider >
      </div>
    )
  }
}

export default App;
