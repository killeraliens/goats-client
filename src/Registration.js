import React, { Component } from 'react';
import ValidationError from './ValidationError';
import config from './config';
import AppContext from './AppContext'

class Registration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: { value: '', touched: false },
      email: { value: '', touched: false },
      password: { value: '', touched: false },
      repeatPassword: { value: '', touched: false }
    }
  }

  static contextType = AppContext

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state
    const postBody = {
      username: username.value,
      email: email.value,
      password: password.value
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${config.API_KEY}`
      }
    }
    fetch(`${config.API_ENDPOINT}/api/auth/signup`, options)
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(newUser => {
        this.setState({
            username: { value: '', touched: false },
            email: { value: '', touched: false },
            password: { value: '', touched: false },
            repeatPassword: { value: '', touched: false },
            error: null
        })
        this.context.updateAuthenticated(true, newUser)
        this.props.history.push(`/`)
        //this.props.history.push(`/profile/${newUser.id}`)
      })
      .catch(error => {
        console.log('registration form error', error)
        this.setState({ error })
      })
   // if you want it validated at the end
   // this.validateName()
   // this.validateEmail()
   // this.validatePassword()
   // this.validateRepeatPassword()
  }

  updateValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: {value, touched: true}
    });
  }

  validateName = () => {
    const username = this.state.username.value.trim();
    return username.length === 0
      ? 'username required'
      : username.length < 4 || username.length > 12
      ? 'username must be between 4 and 12 characters long'
      : this.state.error && this.state.error.message === "username already exists"
      ? 'username already exists'
      : null
  }

  validateEmail = () => {
    const email = this.state.email.value.trim();
    return email.length === 0
      ? 'email required'
      : !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
      ? 'email has incorrect format'
      : null
  }

  validatePassword = () => {
    const password = this.state.password.value.trim();
    return password.length === 0
      ? 'password required'
      : password.length < 5 || password.length > 12
      ? 'password must be between 5 and 12 characters long'
      : !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password))
      ? 'password must have at least one letter and one number'
      : null
  }

  validateRepeatPassword = () => {
    const password = this.state.password.value.trim();
    const repeatPassword = this.state.repeatPassword.value.trim();
    return repeatPassword.length === 0
      ? 'enter password a second time'
      : repeatPassword !== password
      ? "passwords don't match"
      : null
  }

  render() {
    const usernameError = this.state.username.touched && this.validateName();
    const emailError = this.state.email.touched && this.validateEmail();
    const passwordError = this.state.password.touched && this.validatePassword();
    const repeatPasswordError = this.state.repeatPassword.touched && this.validateRepeatPassword();

    return(
      <form className='Registration' onSubmit={this.handleSubmit}>
        <h2>Registration</h2>
        <div className="form-group">
          <label htmlFor="username">Name*</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={this.updateValue}
            aria-label="create a unique username"
            aria-required="true"
            aria-describedby="usernameError"
            aria-invalid={usernameError}
          />
          <ValidationError id="usernameError" message={this.validateName()} visible={usernameError}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={this.updateValue}
            aria-label="enter the email you would like associated with this account"
            aria-required="true"
            aria-describedby="emailError"
            aria-invalid={emailError}
          />
          <ValidationError id="emailError" message={this.validateEmail()} visible={emailError}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={this.updateValue}
            aria-label="create a password"
            aria-required="true"
            aria-describedby="passwordError"
            aria-invalid={passwordError}
          />
          <ValidationError id="passwordError" message={this.validatePassword()} visible={passwordError}/>
        </div>
        <div className="form-group">
          <label htmlFor="repeat-password">Repeat Password*</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            onChange={this.updateValue}
            aria-label="re-enter password"
            aria-required="true"
            aria-describedby="repeatPasswordError"
            aria-invalid={repeatPasswordError}
          />
          <ValidationError id="repeatPasswordError" message={this.validateRepeatPassword()} visible={repeatPasswordError}/>
        </div>
        <button type="reset" onClick={() => this.props.history.push('/')}>Cancel</button>
        <button type="submit" disabled={( this.validateName() || this.validateEmail() || this.validatePassword() || this.validateRepeatPassword())}>Ok Done</button>
      </form>
    )
  }
}

export default Registration;
