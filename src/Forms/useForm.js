import { useState, useEffect, useCallback } from 'react';
import AppContext from '../AppContext'
import { useContext } from 'react';

function useForm( stateSchema, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema)
  const [disable, setDisable] = useState(true)
  const [isDirty, setIsDirty] = useState(false)
  const context = useContext(AppContext)
  //const [user, setUser] = useState(context.user)

  //on component did mount
  useEffect(() => {
    setDisable(true)
  }, [])

  //on state inputs change checks to see if disabled can be set to false
  useEffect(() => {
    if(isDirty) { //true on change handler
      setDisable(validatedStateHasError())
    }
  }, [state, isDirty]) //watches for changes to state (and isDirty) //initializes validation checks

  //on context change inputs get reset to initialvals
  useEffect(() => {
    //console.log('SUPPOSED TO CLEAR', stateSchema)
    //console.log('MY INPUTS', state)
    setState({...stateSchema})
    //console.log('AFTER THE SETTING', state)
  }, [context])

  //if error in any state values, will set disabled to true, final validation
  const validatedStateHasError = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some(key => {
      const isInputFieldRequired = validationSchema[key].required
      const stateValue = state[key].value
      const stateError = state[key].error
      return (isInputFieldRequired && !stateValue) || stateError
    })
    return hasErrorInState //true or false
  })

  //watches for changes value and error state of fields, sets the state fields from validationSchema for final validation
  const handleOnChange = useCallback(event => {
    setIsDirty(true) //validation checks are open to disable the disable
    const { name, value } = event.target
    let error = ''

    if (validationSchema[name].required) {
      if(!value) {
        error = 'This is required field.'
      }
    }

    if (validationSchema[name].validator !== null && typeof validationSchema[name].validator === 'Object') {
      if(value && !validationSchema[name].validator.regEx.test(value)) {
        error = validationSchema[name].validator.error
      }
    }

    setState(prevState => ({
      ...prevState,
      [name]: { value, error }
    }))

  }, [validationSchema]) //watches for changes to validationSchema ie validator template

  const handleOnSubmit = useCallback(event => {
    event.preventDefault()
    if(!validatedStateHasError()) {
      callback(state)
    }
  }, [state]) //watch for state changes


  return { state, disable, handleOnChange, handleOnSubmit, context }
}

export default useForm;
