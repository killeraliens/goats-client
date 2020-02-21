import React, { useState, useEffect, useContext } from 'react';
import config from '../../config';
import PropTypes from 'prop-types';
import AuthedContext from '../../AuthedContext';
import AppContext from '../../AppContext';
import Menu from '../Menu/Menu';
import Main from '../Main/Main';
import './AuthedSplit.css';
import NotFound from '../NotFound/NotFound'
import { Link } from 'react-router-dom';
//import Spinner from '../Spinner/Spinner'

export default function AuthedSplit({ mainComponent }) {
  const [flyers, setFlyers] = useState([])
  const [total, setTotal] = useState(0)
  const [limit] = useState(2)
  const [fetching, setFetching] = useState(false)
  const [fetchingAdditional, setFetchingAdditional] = useState(false)
  const [serverError, setServerError] = useState(null)
  const { user, setError, error } = useContext(AppContext)

  const addFlyer = (flyer) => {
    setFlyers(prev => ([...prev, { ...flyer }].sort((a, b) => (a.modified > b.modified) ? -1 : 1)))
    setTotal(prev => prev + 1)
  }

  const deleteFlyer = (flyerId) => {
    setFlyers(prev => ([...prev.filter(flyer => flyer.id !== flyerId)]))
    setTotal(prev => prev - 1)
  }

  const fetchApiData = async (type) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    }
    const response = await fetch(`${config.API_ENDPOINT}/${type}`, options);
    const body = await response.json();
    if (!response.ok) {
      setServerError(body)
      return {
        flyers: [],
        count: 0
      }
    }
    setServerError(null)
    return body
  }

  const handleClickLoad = async () => {
    setServerError(null)
    setFetchingAdditional(true)
    const pageNum = Math.ceil(flyers.length / limit)
    const offset = pageNum * limit
    const flyersData = await fetchApiData(`flyer?limit=${limit}&offset=${offset}`)
    if (!!serverError) {
      setFetchingAdditional(false)
    } else {
      setTotal(parseInt(flyersData.total))
      setFlyers(prev => ([...prev, ...flyersData.flyers]))
      setFetchingAdditional(false)
    }
  }

  useEffect(() => {
    const getAll = async () => {
      setServerError(null)
      setError(null)
      setFetching(true)
      const flyersData = await fetchApiData(`flyer?limit=${limit}&offset=${0}`)
      if (!!serverError) {
        setFetching(false)
      } else {
        setTotal(parseInt(flyersData.total))
        setFlyers(flyersData.flyers)
        setFetching(false)
      }
    }
    getAll()
  }, [user, error])

  const contextValue = {
    flyers: flyers,
    addFlyer: addFlyer,
    deleteFlyer: deleteFlyer,
    fetching: fetching,
    fetchingAdditional: fetchingAdditional,
    total: total,
    handleClickLoad: handleClickLoad,
    serverError: serverError
  }

  switch (true) {
    case !!serverError && serverError.status === 401://(/(authorized|Unauthorized)/.test(serverError)):
      setError(serverError)

    default:
      return (
        <div className="AuthedSplit">
          <Menu />
          <AuthedContext.Provider value={contextValue}>
            <Main component={React.cloneElement(mainComponent)} >
            </Main>
          </AuthedContext.Provider>
        </div>
      )
  }
}

AuthedSplit.propTypes = {
  mainComponent: PropTypes.objectOf(function (propValue, key, componentName, location, propFullName) {
    if (!["Dashboard", "Forum", "CreateFlyer"].includes(propValue.type.name)) {
      return new Error(`Bad component prop: ${propValue.type.name}. Pass one of the following: "Dashboard", "Forum", "CreateFlyer"`)
    }
  })
}
