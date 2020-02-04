
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import CentralContainer from '../../CentralContainer/CentralContainer';
import config from '../../../config';
import AppContext from '../../../AppContext'
import '../Forms.css';

class SignUpForm extends Component {

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
      }
    }
    fetch(`${config.API_ENDPOINT}/api/auth/signup`, options)
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(newUser => {
        this.resetForm()
        this.context.updateAuthenticated(newUser)
        this.context.updateUsers(newUser)
        this.props.history.push(`/dashboard/${newUser.id}`)
      })
      .catch(error => {
        this.setState({ error })
      })

  }

  updateValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: { value, touched: true }
    });
  }

  resetForm = () => {
    this.setState({
      username: { value: '', touched: false },
      email: { value: '', touched: false },
      password: { value: '', touched: false },
      repeatPassword: { value: '', touched: false },
      error: null
    })
    this.props.history.push('/signin')
  }

  validateName = () => {
    const username = this.state.username.value.trim();
    return username.length === 0
      ? 'username required'
      : !(/^[a-zA-Z]{4,12}$/.test(username))
        ? 'must be between 4 and 12 characters long, letters only'
          : this.state.error && this.state.error.message === `Username ${username} is already in use.`
            ? 'username is already in use'
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

    return (
      <CentralContainer>
        <form className='SignUpForm' onSubmit={this.handleSubmit}>
          <h1>New Account</h1>
          <p>Your email will only be used for account purposes.</p>
          <fieldset className="form-group">
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={this.updateValue}
              value={this.state.username.value}
              aria-label="create a unique username"
              aria-required="true"
              aria-describedby="usernameError"
              aria-invalid={usernameError}
            />
            <ValidationError id="usernameError" message={usernameError} />
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={this.updateValue}
              value={this.state.email.value}
              aria-label="enter the email you would like associated with this account"
              aria-required="true"
              aria-describedby="emailError"
              aria-invalid={emailError}
            />
            <ValidationError id="emailError" message={emailError} />
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.updateValue}
              value={this.state.password.value}
              aria-label="create a password"
              aria-required="true"
              aria-describedby="passwordError"
              aria-invalid={passwordError}
            />
            <ValidationError id="passwordError" message={passwordError} />
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="repeat-password">Repeat Password*</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              onChange={this.updateValue}
              value={this.state.repeatPassword.value}
              aria-label="re-enter password"
              aria-required="true"
              aria-describedby="repeatPasswordError"
              aria-invalid={repeatPasswordError}
            />
            <ValidationError id="repeatPasswordError" message={repeatPasswordError}  />
          </fieldset>
          <div className="form-controls">
            <button type="submit" disabled={(this.validateName() || this.validateEmail() || this.validatePassword() || this.validateRepeatPassword())}>Sign Up</button>
            <button type="reset" onClick={this.resetForm}>Cancel</button>
            <Link to="/public/signin">back to sign in</Link>
          </div>
        </form>

      </CentralContainer>
    )
  }
}

export default SignUpForm;
