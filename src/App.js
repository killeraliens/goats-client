import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom';
import './App.css'
import config from './config.js'
import AppContext from './AppContext'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard/Dashboard'
import Forum from './Components/Forum/Forum'
import Landing from './Components/Landing/Landing'
import AuthedSplit from './Components/AuthedSplit/AuthedSplit';
import CreateFlyer from './Components/CreateFlyer/CreateFlyer';
import DUMMY from './DUMMY.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem('user')) || null,
      error: null,
      users: DUMMY.users || []
    }

  }

  fetchApiData = async (type) => {
    const response = await fetch(`${config.API_ENDPOINT}/api/${type}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  updateAuthenticated = (user) => {
    console.log('updating locale with', user)
    this.setState({
      user
    }, () => {
      localStorage.setItem("user", JSON.stringify(this.state.user))
    })
  }

  updateUser = (newProps) => {
    console.log('setting new user values in app context')
    this.setState({ user: {...this.state.user, ...newProps}}, () => console.log('current user:', this.state.user))
  }

  destroyCurrentLoginState = () => {
    this.updateAuthenticated(null)
  }

  updateUsers = (changedUser) => {
    let foundUser = this.state.users.find(user => user.id.toString() === changedUser.id.toString())
    let updatedUser;
    if (!foundUser) {
      foundUser = {
        id: changedUser.id,
        username: changedUser.username,
        admin: false,
        image_url: changedUser.image_url,
        created: changedUser.created,
        city_name: changedUser.city_name,
        region_name: changedUser.region_name,
        country_name: changedUser.country_name
      }
      updatedUser = { ...foundUser }
    }
    updatedUser = { ...foundUser, ...changedUser }
    let filteredUsers = this.state.users.filter(user => user.id.toString() !== changedUser.id.toString())
    this.setState({ users: [...filteredUsers, { ...updatedUser }] })
  }

  render() {
    const context = {
      user: this.state.user,
      updateAuthenticated: this.updateAuthenticated,
      updateUser: this.updateUser,
      users: this.state.users,
      updateUsers: this.updateUsers
    }

    return(
      <div className="App">
        <AppContext.Provider value={context}>
          <Switch>
            <Route exact path="/public/:action" component={Landing}/>
            <PrivateRoute path={`/dashboard/:user_id`} render={props =>
              <AuthedSplit mainComponent={<Dashboard {...props}/>} />
            } />
            <PrivateRoute path={`/forum`} render={props =>
              <AuthedSplit mainComponent={<Forum {...props}/>} />
            } />
            <PrivateRoute path={`/create-flyer`} render={props =>
              <AuthedSplit mainComponent={<CreateFlyer {...props} />} />
            } />
          </Switch>
        </ AppContext.Provider >
      </div>
    )
  }
}

export default App;
