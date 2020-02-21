import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import Feed from '../Feed/Feed';
import AppContext from '../../AppContext'
import config from '../../config';

export default function Country({ countryName, regionName }) {
  const [flyers, setFlyers] = useState([])
  const [total, setTotal] = useState(0)
  const [limit] = useState(10)
  const [fetching, setFetching] = useState(false)
  const [fetchingAdditional, setFetchingAdditional] = useState(false)
  const [serverError, setServerError] = useState(null)
  const { user, setError } = useContext(AppContext)

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
      setServerError(response)
      return {
        flyers: [],
        count: 0
      }
    }
    return body
  }

  useEffect(() => {
    const getAll = async () => {
      setServerError(null)
      setFetching(true)
      const flyersData = await fetchApiData(`flyer?limit=${limit}&offset=${0}&country=${countryName}&region=${regionName}`)
      if (!!serverError) {
        setFetching(false)
      } else {
        setTotal(parseInt(flyersData.total))
        setFlyers(flyersData.flyers)
        setFetching(false)
      }
    }
    getAll()
  }, [countryName, regionName])

  const handleClickLoad = async () => {
    setServerError(null)
    setFetchingAdditional(true)
    const pageNum = Math.ceil(flyers.length / limit)
    const offset = pageNum * limit
    const flyersData = await fetchApiData(`flyer?limit=${limit}&offset=${offset}&country=${countryName}&region=${regionName}`)
    if (!!serverError) {
      setFetchingAdditional(false)
    } else {
      setTotal(parseInt(flyersData.total))
      setFlyers(prev => ([...prev, ...flyersData.flyers]))
      setFetchingAdditional(false)
    }
  }

  switch (true) {

    case !!serverError && serverError.status === 401:
      //setError(serverError)
      return (
        <NotFound
          message="Session expired"
          isFetching={fetching}
          link={<Link to='/public/signin' >Sign In</Link>}/>
      )

    case !!serverError && serverError.status === 404:
      return (
          <NotFound
            message="Location doesn't exist"
            isFetching={fetching} />
      )

    default:
      return(
        <div className="Country">
          {
            countryName && regionName
            ? (
                <h1 className="Main--header--title">
                  {countryName}<br/>
                  { regionName }
                </h1>
              )
            : <h1 className="Main--header--title">{countryName}</h1>

          }

          <div className="Main--content">
            <Feed
              flyers={flyers}
              fetching={fetching}
              fetchingAdditional={fetchingAdditional}
              total={total}
              handleClickLoad={handleClickLoad}
            />
          </div>

        </div>
      )
  }
}

Country.defaultProps = {
  countryName: '',
  regionName: ''
}
