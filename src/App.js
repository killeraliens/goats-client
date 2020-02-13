import React, {Component} from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.css'
import config from './config.js'
import AppContext from './AppContext'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard/Dashboard'
import Forum from './Components/Forum/Forum'
import Landing from './Components/Landing/Landing'
import AuthedSplit from './Components/AuthedSplit/AuthedSplit';
import CreateFlyer from './Components/CreateFlyer/CreateFlyer';
import NotFound from './Components/NotFound/NotFound';
import DUMMY from './DUMMY.js';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function sanitizeUser(user) {
  return {
    id: user.id,
    username: user.username,
    admin: user.admin,
    image_url: user.image_url,
    created: user.created,
    city_name: user.city_name,
    region_name: user.region_name,
    country_name: user.country_name,
    city_id: user.city_id
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem('user')) || null,
      error: null,
      users: []
    }

  }

  fetchApiData = async (type) => {
    const response = await fetch(`${config.API_ENDPOINT}/${type}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  async componentDidMount() {
    this.fetchApiData('user')
      .then(users => {
        this.setState({ users })
      })
      .catch(err => {
        console.log('Error on fetch users', err)
      })
  }

  updateAuthenticated = (user) => {
    this.setState({
      user
    }, () => {
      localStorage.setItem("user", JSON.stringify(this.state.user))
    })
  }

  updateUser = (newProps) => {
    this.setState({
      user: {...this.state.user, ...newProps}
    }, () => {
      localStorage.setItem("user", JSON.stringify(this.state.user))
    })
  }

  destroyCurrentLoginState = () => {
    this.updateAuthenticated(null)
  }

  updateUsers = (changedUser) => {
    let foundUser = this.state.users.find(user => user.id.toString() === changedUser.id.toString())
    let updatedUser;
    if (!foundUser) {
      updatedUser = { ...changedUser }
    } else {
      updatedUser = { ...foundUser, ...changedUser }
    }
    let filteredUsers = this.state.users.filter(user => user.id.toString() !== changedUser.id.toString())
    this.setState({ users: [...filteredUsers, { ...sanitizeUser(updatedUser) }] })
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
            <Route render={() => {
              return <NotFound link={<Link to="/forum">Back to forum</Link>} />
            }} />
          </Switch>
        </ AppContext.Provider >
      </div>
    )
  }
}

export default App;
