import React, {Component} from 'react'
import { Route, Switch, NavLink } from 'react-router-dom';
import './App.css'
import config from './config.js'
import AppContext from './AppContext'
import AddEventPg from './AddEventPg'
import ListPg from './ListPg'
import Login from './Login'
import Registration from './Registration'
import PrivateRoute from './PrivateRoute'


class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      data: null,
      isAuthenticated: false,
      token: '',
      user: null,
      error: null
    }

  }

  logout = () => {
    this.setState({
      isAuthenticated: false,
      token: '',
      user: null
    })
  }

  facebookResponse = (e) => { }

  onFailure = (error) => { alert(error) }

  fetchData = async () => {
    const response = await fetch(`${config.API_ENDPOINT}/api/event`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  componentDidMount() {
    this.fetchData()
      .then(jsonEvents => {
        //console.log('component did mount', res.events)
        this.setState({
          events: jsonEvents
        })
      })
      .catch(err => console.log('ERROR ON SERVER MOUNT', err))
  }


  addEvent = (newEvent) => {
    console.log('adding new event to state', newEvent)
  }

  updateUser = (id) => {
    console.log('do something with user id and state', id)
  }

  render() {
    const context = {
      events: this.state.events,
      addEvent: this.addEvent,
      user: this.state.user,
      isAuthenticated: this.state.isAuthenticated,
      updateUser: this.updateUser
    }
    return(
      <div className="App">
        <AppContext.Provider value={context}>
          <div className="router-data">{this.state.data}</div>
          <nav>
            <NavLink to='/'>Events</NavLink>{<br/>}
            <NavLink to='/add-event'>Add Event</NavLink>{<br/>}
            <NavLink to='/login'>Login</NavLink>
          </nav>
          <main>
            <Switch>
              <Route exact path="/" component={ListPg}/>
              <PrivateRoute path="/add-event" component={AddEventPg}/>
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
