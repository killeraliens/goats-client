import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import './InlineForm.css'
import config from '../../../config'
import ValidationError from '../ValidationError/ValidationError'
import AppContext from '../../../AppContext';
import { capitalize } from '../../../helpers/textHelpers'

export default function InlineForm({ name, type, nameDB }) {
  const { user, updateAuthenticated, setToast } = useContext(AppContext)
  const [value, setValue] = useState({ value: user[name], touched: false, error: ''})
  const [serverError, setServerError] = useState('')
  const [fetching, setFetching] = useState(false)

  const resetForm = () => {
    setValue({ value: user[name], touched: false, error: '' })
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

  useEffect(() => {
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError, value.value])


  const handleChange = (e) => {
    if(type === 'text') {
      setValue({ value: e.target.value, touched: true, error: ''})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const patchBody = {
      [nameDB]: value.value
    }
    console.log(patchBody)
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
  return (
    <form className="InlineForm dark-mode" onSubmit={handleSubmit}>
      <fieldset>
        <label
          htmlFor={`${name}`}
          className="sr-only"
        >
          {name}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value.value}
          aria-label={name}
          aria-required="false"
          aria-invalid={value.value === user[name]}
          aria-describedby={`${name}Error`}
          onChange={handleChange}
        />
        <ValidationError
          id={`${name}Error`}
          message={!!serverError ? serverError : !!value.error ? value.error : ''}
        />
      </fieldset>
      <div className="form-controls">
        <button type="submit" disabled={value.value === user[name]}>Submit</button>
        {/* <Link to="/public/signup">New Account</Link>{' '}
        <Link to="/public/recover">Forgot password?</Link> */}
      </div>
    </form>
  )
}

InlineForm.defaultProps = {
  name: '',
  type: 'text'
}

InlineForm.propTypes = {
  name: PropTypes.oneOf([
    'username', 'email', 'password'
  ]),
  type: PropTypes.oneOf([
    'text'
  ]),
  nameDB: PropTypes.string.isRequired
}
