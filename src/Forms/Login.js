import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from './config';
import AppContext from './AppContext'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  static contextType = AppContext

  handleSubmit = (e) => {
    e.preventDefault();

    let newState = { username: '', password: '' }
    this.setState(newState)

    const postBody = {
      ...this.state
    }

    let options = {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      }
    }

    fetch(`${config.API_ENDPOINT}/api/auth/signin`, options)
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(user => {
        console.log('SIGNED IN', user)
        localStorage.setItem("user", user)

        this.context.updateAuthenticated(true, user)
        //this.setState({ error: null})
        // this.props.history.push(`/${user.id}`)
      })
      .catch(error => {
        this.setState({ error })
      })

  }

  updateState = (e) => {
    const {name, value} = e.target
    let newState = { ...this.state, [name]: value}
    this.setState(newState)
    //return this.setState(newState)
    //whats the difference if i add 'return'?
  }

  render() {
  const error = this.state.error && this.state.error.message
  ? <div className="error-message">{this.state.error.message}</div>
  : null
    return(
      <form className="Login" onSubmit={this.handleSubmit} >
        {error}
        <legend><h2>Login</h2></legend>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" value={this.state.username} onChange={this.updateState}/>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="text" value={this.state.password} onChange={this.updateState}/>
        <button type="submit">Submit</button>
        <Link to="/register">Register</Link>
      </form>
    )
  }
}

export default Login;
