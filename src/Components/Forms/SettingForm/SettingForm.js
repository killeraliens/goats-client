import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import './SettingForm.css'
import config from '../../../config'
import ValidationError from '../ValidationError/ValidationError'
import AppContext from '../../../AppContext';
import { capitalize } from '../../../helpers/textHelpers'

export default function SettingForm({ name, type }) {
  const { user, updateAuthenticated, setToast } = useContext(AppContext)
  const [value, setValue] = useState({ value: user[name] || '', touched: false, error: ''})
  const [repeatPassword, setRepeatPassword] = useState({ value: '', touched: false, error: '' })
  const [serverError, setServerError] = useState('')
  const [fetching, setFetching] = useState(false)
  const [collapsed, setCollapsed] = useState('collapsed')

  const resetForm = () => {
    setValue({ value: user[name] || '', touched: false, error: '' })
  }

  const validateUsername = () => {
    if (value.touched) {
      const trimmedUsername = value.value.trim()
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
    if (value.touched) {
      const emailValue = value.value.trim();
      return emailValue.length === 0
        ? 'email required'
        : !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
          ? 'email has incorrect format'
          : ''
    }
    return ''
  }

  const validatePassword = () => {
    if (value.touched) {
      const passwordValue = value.value.trim();
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
      const trimmedRepeatPassword = repeatPassword.value.trim()
      return trimmedRepeatPassword.length === 0
        ? 'enter password a second time'
        : trimmedRepeatPassword !== value.value
          ? "passwords don't match"
          : ''
    }
    return ''
  }

  useEffect(() => {
    const updateValidationErrors = () => {
      if (name === 'username') {
        setValue(prev => ({ ...prev, error: validateUsername() }))
      }
      if (name === 'email') {
        setValue(prev => ({ ...prev, error: validateEmail() }))
      }
      if (name === 'password') {
        setValue(prev => ({ ...prev, error: validatePassword() }))
      }
    }
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError, value.value])

  useEffect(() => {
    const updateRepeatPasswordValidationErrors = () => {
      if (name === 'password') {
        setRepeatPassword(prev => ({ ...prev, error: validateRepeatPassword() }))
      }
    }
    updateRepeatPasswordValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError, repeatPassword.value])

  const handleChange = (e) => {
    setValue({ value: e.target.value, touched: true, error: ''})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const patchBody = {
      [name]: value.value
    }
    const options = {
      method: 'PATCH',
      body: JSON.stringify(patchBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    }
    try {
      const response = await fetch(`${config.API_ENDPOINT}/user/${user.id}`, options)
      if (!response.ok) {
        const body = await response.json();
        setServerError(body.message)
        setFetching(false)
      } else {
        setServerError('')
        setFetching(false)
        const patchedUser = {
          ...user,
          ...patchBody
        }
        updateAuthenticated(patchedUser)
        setToast({ message: `${capitalize(name)} successfully updated.` })
        resetForm() //collapse with new value
      }
    } catch (error) {
      setServerError(error.message)
      setFetching(false)
    }
  }

  const collapsedValue = () => {
    if(type === 'password') {
      return(
        <span className="collapsed-value">
         -
        </span>
      )
    }
    if (name === 'username') {
      return (
        <span className="collapsed-value username">
          {value.value}
        </span>
      )
    }
    return(
      <span className="collapsed-value">
        {value.value}
      </span>
    )
  }

  const repeatPasswordFieldset = () => {
    if (type === 'password') {
      return(
        <fieldset>
          <label htmlFor="repeat-password">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            onChange={e => setRepeatPassword({ value: e.target.value, touched: true, error: '' })}
            value={repeatPassword.value || ''}
            aria-label="re-enter password"
            aria-required="true"
            aria-describedby="repeatPasswordError"
            aria-invalid={!!repeatPassword.error}
            // onBlur={updateRepeatPasswordValidationErrors}
          />
          <ValidationError id="repeatPasswordError" message={repeatPassword.error} />
        </fieldset>
      )
    }
  }

  if(collapsed) {
    return <form className="SettingForm collapsed dark-mode" onSubmit={handleSubmit}>
      <span className="collapsed-label">{capitalize(name)}</span>
        { collapsedValue() }
        <button onClick={() => {
          setCollapsed(false)
        }}>edit</button>
    </form>
  }

  return (
    <form className="SettingForm dark-mode" onSubmit={handleSubmit}>
      <div className={`formgroup ${type==='password' ? 'double' : ''}`}>

        <fieldset>
          <label
            htmlFor={`${name}`}
          >
            {capitalize(name)}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            value={value.value}
            aria-label={name}
            aria-required="false"
            aria-invalid={value.value === user[name] || !!value.error }
            aria-describedby={`${name}Error`}
            onChange={handleChange}
            placeholder={type === 'password' ? 'New password' : ''}
          />
          <ValidationError
            id={`${name}Error`}
            message={!!serverError ? serverError : !!value.error ? value.error : ''}
          />
        </fieldset>
        { repeatPasswordFieldset() }
      </div>
      <div className="form-controls">
        <button type="submit" disabled={
          value.value === user[name]
          || !value.touched
          || !!value.error
          || (type === 'password' && !!repeatPassword.error) || (type === 'password' && !repeatPassword.touched)
          }>Submit</button>
        <button type="reset" onClick={() => {
          resetForm()
          setCollapsed(true)
        }}>Cancel</button>
      </div>
    </form>
  )
}

SettingForm.defaultProps = {
  name: '',
  type: 'text'
}

SettingForm.propTypes = {
  name: PropTypes.oneOf([
    'username', 'email', 'password'
  ]),
  type: PropTypes.oneOf([
    'text', 'email', 'password'
  ])
}
