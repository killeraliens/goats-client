
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import CentralContainer from '../../CentralContainer/CentralContainer';
import config from '../../../config';
import AppContext from '../../../AppContext';
import Spinner from '../../Spinner/Spinner';
import '../Forms.css';

class SignUpForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: { value: '', touched: false, error: '' },
      email: { value: '', touched: false, error: '' },
      password: { value: '', touched: false, error: '' },
      repeatPassword: { value: '', touched: false, error: '' },
      fetching: false
    }
  }

  static context = AppContext

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({fetching: true})
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
    fetch(`${config.API_ENDPOINT}/auth/signup`, options)
      .then(res => {
        if (!res.ok) {
          this.setState({fetching: false})
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(newUser => {
        this.setState({ fetching: false })
        this.resetForm()
        this.context.updateAuthenticated(newUser)
        this.context.setToast({ message: `'Account creation success. You were just sent an email greeting for username reference.`, timeout: 3000 })
        this.props.history.push(`/dashboard/${newUser.id}`)
      })
      .catch(error => {
        this.setState({ fetching: false })
        this.setState({ error })
        this.updateValidationErrors()
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
      username: { value: '', touched: false, error: '' },
      email: { value: '', touched: false, error: '' },
      password: { value: '', touched: false, error: '' },
      repeatPassword: { value: '', touched: false, error: '' },
      error: null
    })
    this.props.history.push('/public/signin')
  }

  validateName = () => {
    if (this.state.username.touched) {
      const username = this.state.username.value.trim();
      return username.length === 0
        ? 'username required'
        : !(/^[a-zA-Z]{4,12}$/.test(username))
          ? 'must be between 4 and 12 characters long, letters only'
            : this.state.error && this.state.error.message === `Username ${username} is already in use.`
              ? 'username is already in use'
              : ''
    }
    return ''
  }

  validateEmail = () => {
    if (this.state.email.touched) {
      const email = this.state.email.value.trim();
      return email.length === 0
        ? 'email required'
        : !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
          ? 'email has incorrect format'
          : ''
    }
    return ''
  }

  validatePassword = () => {
    if (this.state.password.touched) {
      const password = this.state.password.value.trim();
      return password.length === 0
        ? 'password required'
        : password.length < 5 || password.length > 12
          ? 'password must be between 5 and 12 characters long'
           : !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password))
            ? 'password must have at least one letter and one number, no special characters'
            : ''
    }
    return ''
  }

  validateRepeatPassword = () => {
    if (this.state.repeatPassword.touched) {
      const password = this.state.password.value.trim();
      const repeatPassword = this.state.repeatPassword.value.trim();
      return repeatPassword.length === 0
        ? 'enter password a second time'
        : repeatPassword !== password
          ? "passwords don't match"
          : ''
    }
  }

  updateValidationErrors = () => {
    this.setState(prev => ({
      username: { ...prev.username, error: this.validateName() },
      email: { ...prev.email, error: this.validateEmail() },
      password: { ...prev.password, error: this.validatePassword() },
      repeatPassword: { ...prev.repeatPassword, error: this.validateRepeatPassword() }
    }))
  }

  render() {
    if (this.state.fetching) {
      return <Spinner />
    }
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
              aria-invalid={!!this.state.username.error}
              onBlur={() => { this.updateValidationErrors()}}
              autoComplete="new-password"
            />
            <ValidationError id="usernameError" message={this.state.username.error} />
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
              aria-invalid={!!this.state.email.error}
              onBlur={() => { this.updateValidationErrors() }}
              autoComplete="new-password"
            />
            <ValidationError id="emailError" message={this.state.email.error} />
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
              aria-invalid={!!this.state.password.error}
              onBlur={() => { this.updateValidationErrors() }}
            />
            <ValidationError id="passwordError" message={this.state.password.error} />
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
              aria-invalid={!!this.state.repeatPassword.error}
              onBlur={() => { this.updateValidationErrors() }}
            />
            <ValidationError id="repeatPasswordError" message={this.state.repeatPassword.error}  />
          </fieldset>
          <div className="form-controls">
            <button type="submit" disabled={(
              !!this.state.username.error
              || !!this.state.email.error
              || !!this.state.password.error
              || !!this.state.repeatPassword.error
              )}>Sign Up</button>
            <button type="reset" onClick={this.resetForm}>Cancel</button>
            <Link to="/public/signin">back to sign in</Link>
          </div>
        </form>

      </CentralContainer>
    )
  }
}

export default SignUpForm;
