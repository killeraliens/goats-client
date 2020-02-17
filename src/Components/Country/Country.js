import React, { useState, useEffect, useContext } from 'react';
import Feed from '../Feed/Feed';
import AppContext from '../../AppContext'
import config from '../../config';
export default function Country({ countryName, regionName}) {
  const [flyers, setFlyers] = useState([])
  const [total, setTotal] = useState(0)
  const [limit] = useState(10)
  const [fetching, setFetching] = useState(false)
  const [fetchingAdditional, setFetchingAdditional] = useState(false)
  const [serverError, setServerError] = useState('')
  const { user } = useContext(AppContext)

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

  useEffect(() => {
    const getAll = async () => {
      setServerError('')
      setFetching(true)
      const flyersData = await fetchApiData(`flyer?limit=${limit}&offset=${0}&country=${countryName}&region=${regionName}`)
      setTotal(parseInt(flyersData.total))
      setFlyers(flyersData.flyers)
      setFetching(false)
    }
    getAll()
  }, [countryName, regionName])

  const handleClickLoad = async () => {
    setServerError('')
    setFetchingAdditional(true)
    const pageNum = Math.ceil(flyers.length / limit)
    const offset = pageNum * limit
    const flyersData = await fetchApiData(`flyer?limit=${limit}&offset=${offset}&country=${countryName}&region=${regionName}`)
    setFlyers(prev => ([...prev, ...flyersData.flyers]))
    setFetchingAdditional(false)
  }

  if (Boolean(serverError)) {
    return <p>Server error in country</p>
  }

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
        <Feed flyers={flyers} fetching={fetching} />
      </div>

    </div>
  )
}

Country.defaultProps = {
  countryName: '',
  regionName: ''
}
