import React, {Component} from 'react'
import { NavLink, Switch, Route } from 'react-router-dom';
import './App.css'
import config from './config.js'
import AppContext from './AppContext'
import PrivateRoute from './Components/PrivateRoute'
import ProfilePg from './Components/ProfilePg'
import Forum from './Components/Forum/Forum'
import Landing from './Components/Landing/Landing'
import AuthedSplit from './Components/AuthedSplit/AuthedSplit';





class App extends Component {
  constructor() {
    super();
    this.state = {
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

  // async componentDidMount () {
  //   // console.log('THIS STATE',this.state)
  //   //console.log('THIS LOCAL', localStorage)
  //   this.fetchApiData('event')
  //     .then(events => {
  //       this.setState({ events })
  //     })
  //     .catch(err => {
  //       console.log('Error on fetch events', err)
  //     })

  // }

  // addEvent = (newEvent) => {
  //   console.log('adding new event to state', newEvent)
  //   const events = [...this.state.events, newEvent]
  //   this.setState({ events })
  // }

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
      user: this.state.user,
      updateAuthenticated: this.updateAuthenticated
    }

    const LoginOrLogoutLink = this.state.user //&& this.state.user
      ? <button onClick={this.destroyCurrentLoginState}>Logout</button> //send request to api / followup w context this.destroyCurrentLoginState() {}
      : <NavLink to='/signin'>Sign In</NavLink>

    return(
      <div className="App">
        <AppContext.Provider value={context}>
          {/* <Landing /> */}
          <Switch>
            <Route exact path="/public/:action" component={Landing}/>
            <PrivateRoute path={`/dashboard/:user_id`} render={props =>
              <AuthedSplit mainComponent={<ProfilePg />} />
            } />
            <PrivateRoute path={`/forum`} render={props =>
              <AuthedSplit mainComponent={<Forum />} />
            } />
          </Switch>
          {/* <nav>
            <NavLink to='/'>Events</NavLink>{<br/>}
            <NavLink to='/add-event'>Add Event</NavLink>{<br/>}
            {LoginOrLogoutLink}
          </nav>
          <Switch>
            <Route path={`/profile/:user_id`} component={ProfilePg} />
            <Route path="/signin" component={SignInForm}/>
            <Route path="/signup" component={SignUpForm}/>
          </Switch>
          <main>
          </main> */}
        </ AppContext.Provider >
      </div>
    )
  }
}

export default App;
