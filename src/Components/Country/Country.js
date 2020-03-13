import React, { useState, useEffect, useContext } from 'react';
import NotFound from '../NotFound/NotFound'
import Feed from '../Feed/Feed';
import AppContext from '../../AppContext'
import BackLink from '../BackLink/BackLink';
import config from '../../config';
import { Link } from 'react-router-dom'

export default function Country({ countryName, regionName }) {
  const [flyers, setFlyers] = useState([])
  const [total, setTotal] = useState(0)
  const [limit] = useState(10)
  const [fetching, setFetching] = useState(false)
  const [fetchingAdditional, setFetchingAdditional] = useState(false)
  const [serverError, setServerError] = useState(null)
  const { user } = useContext(AppContext)

  const fetchApiData = async (query, abortController) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      signal: abortController.signal
    }
    const response = await fetch(`${config.API_ENDPOINT}/${query}`, options);
    const body = await response.json();
    if (!response.ok) {
      setServerError({ status: response.status, message: body.message })
      return {
        flyers: [],
        count: 0
      }
    }
    return body
  }

  useEffect(() => {
    const abortController = new AbortController();

    const getAll = async () => {
      setServerError(null)
      setFetching(true)

      try {
        const flyersData = await fetchApiData(`flyer?limit=${limit}&offset=${0}&country=${countryName}&region=${regionName}`, abortController)
        if (!!serverError) {
          setFetching(false)
        } else {
          setTotal(parseInt(flyersData.total))
          setFlyers(flyersData.flyers)
          setFetching(false)
        }
      } catch (e) {
        if (!abortController.signal.aborted) {
          console.log('fetch aborted', e)
          setFetching(false)
        }
      }
    }

    getAll()
    return () => {
      abortController.abort();
    }
  }, [countryName, regionName])

  const handleClickLoad = async () => {
    const abortController = new AbortController();

    setServerError(null)
    setFetchingAdditional(true)
    const pageNum = Math.ceil(flyers.length / limit)
    const offset = pageNum * limit

    try {
      const flyersData = await fetchApiData(`flyer?limit=${limit}&offset=${offset}&country=${countryName}&region=${regionName}`, abortController)
      if (!!serverError) {
        setFetchingAdditional(false)
      } else {
        setTotal(parseInt(flyersData.total))
        setFlyers(prev => ([...prev, ...flyersData.flyers]))
        setFetchingAdditional(false)
      }
    } catch (e) {
      if (!abortController.signal.aborted) {
        console.log('fetch aborted', e)
        setFetchingAdditional(false)
      }
    }
    return () => {
      abortController.abort();
    }
  }

  switch (true) {

    case !!serverError && serverError.status === 401:
      // setError(serverError)
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
            <BackLink hasArrow={true} backText={true} />
          </div>

        </div>
      )
  }
}

Country.defaultProps = {
  countryName: '',
  regionName: ''
}
