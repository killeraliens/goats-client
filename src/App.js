import React, {Component} from 'react'
import { Route, Switch, NavLink } from 'react-router-dom';
import './App.css'
import config from './config.js'
import AppContext from './AppContext'
import AddEventPg from './AddEventPg'
import ListPg from './ListPg'
import ProfilePg from './ProfilePg'
import SignUpForm from './Forms/SignUpForm/SignUpForm'
// import LoginFB from './LoginFB'
import SignInForm from './Forms/SignInForm/SignInForm'
import PrivateRoute from './PrivateRoute'
//browser local storage api



class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      // countries: [],
      // data: null,
      user: JSON.parse(localStorage.getItem('user')) || null,
      error: null
    }

  }



  //onFailure = (error) => { this.setState({ error }) }

  fetchApiData = async (type) => {
    const response = await fetch(`${config.API_ENDPOINT}/api/${type}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  async componentDidMount () {
    // console.log('THIS STATE',this.state)
    //console.log('THIS LOCAL', localStorage)
    this.fetchApiData('event')
      .then(events => {
        this.setState({ events })
      })
      .catch(err => {
        console.log('Error on fetch events', err)
      })

  }



  addEvent = (newEvent) => {
    console.log('adding new event to state', newEvent)
    const events = [...this.state.events, newEvent]
    this.setState({ events })
  }

  updateAuthenticated = (user) => {
    this.setState({
      user
    }, () => {
      localStorage.setItem("user", JSON.stringify(this.state.user))
    })
  }

  destroyCurrentLoginState = () => {
    this.updateAuthenticated(null)
  }

  render() {
    const context = {
      events: this.state.events,
      addEvent: this.addEvent,
      user: this.state.user,
      updateAuthenticated: this.updateAuthenticated
    }

    const LoginOrLogoutLink = this.state.user //&& this.state.user
      ? <button onClick={this.destroyCurrentLoginState}>Logout</button> //send request to api / followup w context this.destroyCurrentLoginState() {}
      : <NavLink to='/signin'>Sign In</NavLink>
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
              <Route path={`/profile/:user_id`} component={ProfilePg} />
              <Route path="/signin" component={SignInForm}/>
              <Route path="/signup" component={SignUpForm}/>

            </Switch>
          </main>
        </ AppContext.Provider >
      </div>
    )
  }
}

export default App;
