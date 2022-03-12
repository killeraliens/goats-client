
import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import ValidationError from '../ValidationError/ValidationError';
import CentralContainer from '../../CentralContainer/CentralContainer';
import config from '../../../config';
import AppContext from '../../../AppContext';
import Spinner from '../../Spinner/Spinner';
import '../Forms.css';

function SignUpForm({ history }) {
  const [username, setUsername] = useState({ value: '', touched: false, error: '' })
  const [email, setEmail] = useState({ value: '', touched: false, error: '' })
  const [password, setPassword] = useState({ value: '', touched: false, error: '' })
  const [repeatPassword, setRepeatPassword] = useState({ value: '', touched: false, error: '' })
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)
  const { updateAuthenticated, setToast } = useContext(AppContext)

  const resetForm = () => {
    setUsername({ value: '', touched: false, error: '' })
    setEmail({ value: '', touched: false, error: '' })
    setPassword({ value: '', touched: false, error: '' })
    setRepeatPassword({ value: '', touched: false, error: '' })
  }

  const updateValidationErrors = () => {
    setUsername(prev => ({ ...prev, error: validateUsername() }))
    setEmail(prev => ({ ...prev, error: validateEmail() }))
    setPassword(prev => ({ ...prev, error: validatePassword() }))
    setRepeatPassword(prev => ({ ...prev, error: validateRepeatPassword() }))
  }

  useEffect(() => {
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError, repeatPassword.value])

  useEffect(() => {
    const clearServerErrors = () => {
      setServerError(null)
    }
    clearServerErrors()
  }, [username.value, email.value, password.value, repeatPassword.value])

  const validateUsername = () => {
    if (username.touched) {
      const trimmedUsername = username.value.trim()
      return trimmedUsername.length === 0
        ? 'username required'
        : !(/^[a-zA-Z]{4,20}$/.test(trimmedUsername))
          ? 'must be between 4 and 20 characters long, letters only'
          : serverError && serverError.message === `Username ${trimmedUsername} is already in use.`
            ? 'username is already in use'
            : ''
    }
    return ''
  }

  const validateEmail = () => {
    if (email.touched) {
      const emailValue = email.value.trim();
      return emailValue.length === 0
        ? 'email required'
        : !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
          ? 'email has incorrect format'
          : ''
    }
    return ''
  }

  const validatePassword = () => {
  if (password.touched) {
     const passwordValue = password.value.trim();
      return passwordValue.length === 0
        ? 'password required'
        : passwordValue.length < 5 || passwordValue.length > 20
          ? 'password must be between 5 and 20 characters long'
          : !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(passwordValue))
            ? 'password must have at least one letter and one number, no special characters'
            : ''
    }
    return ''
  }

const validateRepeatPassword = () => {
    if (repeatPassword.touched) {
      const passwordValue = password.value.trim();
      const repeatPasswordValue = repeatPassword.value.trim();
      return repeatPasswordValue.length === 0
        ? 'enter password a second time'
        : repeatPasswordValue !== passwordValue
          ? "passwords don't match"
          : ''
    }
    return ''
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setFetching(true)
    const postBody = {
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value.trim()
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await fetch(`${config.API_ENDPOINT}/auth/signup`, options)
      const body = await response.json();
      if (!response.ok) {
        setServerError({ status: response.status, message: body.message })
        setFetching(false)
      } else {
        setFetching(false)
        resetForm()
        let user = body.token ? body : null
        updateAuthenticated(user)
        setToast({ message: `Hello ${user.username}.` })
        history.push(`/flyers`)
      }
    } catch (err) {
      setServerError({ message: err.message })
      setFetching(false)
    }

  }

  const required = "*"
  if (fetching) {
    return <Spinner />
  }

  return (
    <CentralContainer>
      <form className="SignUpForm" onSubmit={handleOnSubmit}>
        <h1>New Account</h1>
        <p>Your email will only be used for account purposes.</p>
        <fieldset>
          <label htmlFor="username">Username{required}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username.value || ''}
            onChange={e => setUsername({ value: e.target.value, touched: true })}
            aria-label="enter your username"
            aria-required="true"
            aria-describedby="usernameError"
            aria-invalid={!!username.error}
            onBlur={updateValidationErrors}
          />
          <ValidationError id="usernameError" message={username.error} />
        </fieldset>
        <fieldset >
          <label htmlFor="email">Email{required}</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={e => setEmail({ value: e.target.value, touched: true })}
            value={email.value || ''}
            aria-label="enter the email you would like associated with this account"
            aria-required="true"
            aria-describedby="emailError"
            aria-invalid={!!email.error || email.value === ''}
            onBlur={updateValidationErrors}
            autoComplete="new-password"
          />
          <ValidationError id="emailError" message={email.error} />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password{required}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password.value || ''}
            onChange={e => setPassword({ value: e.target.value, touched: true })}
            aria-label="enter your password"
            aria-required="true"
            aria-describedby="passwordError"
            aria-invalid={!!password.error}
            onBlur={updateValidationErrors}
          />
          <ValidationError id="passwordError" message={password.error} />
        </fieldset>
        <fieldset>
          <label htmlFor="repeat-password">Repeat Password{required}</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            onChange={e => setRepeatPassword({ value: e.target.value, touched: true })}
            value={repeatPassword.value || ''}
            aria-label="re-enter password"
            aria-required="true"
            aria-describedby="repeatPasswordError"
            aria-invalid={!!repeatPassword.error || repeatPassword.value === ''}
            onBlur={updateValidationErrors}
          />
          <ValidationError id="repeatPasswordError" message={repeatPassword.error} />
        </fieldset>
        <div className="form-controls">
          <button type="submit" disabled={
            username.error || password.error || repeatPassword.error
            || username.value ==='' || password.value ==='' || repeatPassword.value ===''
          }>Submit</button>
          <button type="reset" onClick={() => history.push('/signin')}>Cancel</button>
          <Link to="/public/signin">Sign In</Link>{' '}
          <Link to="/public/recover">Forgot password?</Link>
        </div>
      </form>
    </CentralContainer>
  );
}

SignUpForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  })
}

export default withRouter(SignUpForm);

