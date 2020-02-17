import React, { useState, useEffect, useContext } from 'react';
import config from '../../config';
import PropTypes from 'prop-types';
import AuthedContext from '../../AuthedContext';
import AppContext from '../../AppContext';
import Menu from '../Menu/Menu';
import Main from '../Main/Main';
import './AuthedSplit.css';
import NotFound from '../NotFound/NotFound'
//import Spinner from '../Spinner/Spinner'


function sanitizeUser(user) {
  return {
    id: user.id,
    username: user.username,
    admin: user.admin,
    image_url: user.image_url,
    created: user.created,
    city_name: user.city_name,
    region_name: user.region_name,
    country_name: user.country_name,
    city_id: user.city_id
  }
}

export default function AuthedSplit({ mainComponent }) {
  const [flyers, setFlyers] = useState([])
  const [total, setTotal] = useState(0)
  const [limit] = useState(2)
  const [fetching, setFetching] = useState(false)
  const [fetchingAdditional, setFetchingAdditional] = useState(false)
  const [serverError, setServerError] = useState('')
  const { user} = useContext(AppContext)

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
      setServerError(body.message)
      return {
        flyers: flyers,
        count: total
      }
    }
    return body
  }

  const handleClickLoad = async () => {
    setServerError('')
    setFetchingAdditional(true)
    const pageNum = Math.ceil(flyers.length / limit)
    const offset = pageNum * limit
    const flyersData = await fetchApiData(`flyer?limit=${limit}&offset=${offset}`)
    setFlyers(prev => ([...prev, ...flyersData.flyers]))
    setFetchingAdditional(false)
  }

  useEffect(() => {
    const getAll = async () => {
      setServerError('')
      setFetching(true)
      const flyersData = await fetchApiData(`flyer?limit=${limit}&offset=${0}`)
      setTotal(parseInt(flyersData.total))
      setFlyers(flyersData.flyers)
      setFetching(false)
    }
    getAll()
  }, [user])

  const contextValue = {
    flyers: flyers,
    addFlyer: addFlyer,
    deleteFlyer: deleteFlyer,
    fetching: fetching,
    fetchingAdditional: fetchingAdditional,
    total: total,
    handleClickLoad: handleClickLoad
  }

  if (Boolean(serverError)) {
    //console.log('SEREVER ERRROR ', serverError)
    //return <p>{serverError}</p>
    //Router.browserHistory.push('/public/signin');
    return <NotFound message={`${serverError}, log back in.`}/>
  }
  return(
    <div className="AuthedSplit">
      <Menu />
      <AuthedContext.Provider value={contextValue}>
        <Main component={React.cloneElement(mainComponent)} >
        </Main>
      </AuthedContext.Provider>
    </div>
  )
}

AuthedSplit.propTypes = {
  mainComponent: PropTypes.objectOf(function (propValue, key, componentName, location, propFullName) {
    if (!["Dashboard", "Forum", "CreateFlyer"].includes(propValue.type.name)) {
      return new Error(`Bad component prop: ${propValue.type.name}. Pass one of the following: "Dashboard", "Forum", "CreateFlyer"`)
    }
  })
}
