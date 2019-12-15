import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let currState = { ...this.state }
    let newState = {username: '', password: ''}
    console.log('logging in with', currState);

    this.setState(newState)
  }

  updateState = (e) => {
    const {name, value} = e.target
    let newState = { ...this.state, [name]: value}
    this.setState(newState)
    //return this.setState(newState)
    //whats the difference if i add 'return'?
  }

  render() {
    return(
      <form className="Login" onSubmit={this.handleSubmit} >
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
