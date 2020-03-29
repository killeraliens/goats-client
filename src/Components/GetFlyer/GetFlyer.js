import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import AppContext from '../../AppContext';
import MainHeader from '../MainHeader/MainHeader';
import FlyerForm from '../Forms/FlyerForms/FlyerForm';
import config from '../../config'
import Spinner from '../Spinner/Spinner';
import FlyerCard from '../FlyerCard/FlyerCard'
import BackLink from '../BackLink/BackLink'

function GetFlyer({ match, isEdit }) {
  const { user, setError } = useContext(AppContext)
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [ flyer, setFlyer ] = useState({})

 //on mount call api for flyer
  useEffect(() => {
    const myAbortController = new AbortController();
    const getFlyer = async () => {
      setFetching(true)
      const options = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        signal: myAbortController.signal
      }
      try {
        const response = await fetch(`${config.API_ENDPOINT}/flyer/${match.params.flyer_id}`, options);
        const body = await response.json()
        if (!response.ok) {
          setServerError({ status: response.status, message: body.message })
          setFetching(false)
        } else {
          setServerError(null)
          setFlyer(body)
          setFetching(false)
        }
      } catch (e) {
        if (!myAbortController.signal.aborted) {
          //setServerError({ status: e.status, message: e.message })
          setFetching(false)
        }
      }
    }
    getFlyer()

    return () => {
      // console.log('cleaned up')
      myAbortController.abort();
    }
  }, [match])


  const isAuthed = ((user && user.id) && (user.id === flyer.creator_id)) || (user && user.admin)

  switch (true) {
    case fetching:
      return <Spinner />

    case !!serverError && serverError.status === 401:
      setError(serverError)

    case flyer.id && !isEdit :
      return (
        <div className="GetFlyer ViewFlyer">
          <MainHeader >
            <BackLink className='header-link'>
              {flyer.headline}
            </BackLink>
          </MainHeader>
          <div className="Main--content">
            <FlyerCard flyer={flyer} isEdit={false} />
            <BackLink backText={true} hasArrow={true} />
          </div>
        </div>
      )

    case flyer.id && isEdit && !isAuthed:
      return <Redirect to='/fliers' />

    case flyer.id && isEdit && isAuthed:
      return (
        <div className="GetFlyer EditFlyer">
          <MainHeader >
            <BackLink className='header-link'>
              Edit{' '}{flyer.headline}
            </BackLink>
          </MainHeader>
          <div className="Main--content">
            <FlyerForm flyer={flyer} />
            <BackLink backText={true} hasArrow={true}/>
          </div>
        </div>
      )

    default:
      return null
  }
}

export default withRouter(GetFlyer)

GetFlyer.defaultProps = {
  isEdit: false
}

GetFlyer.propTypes = {
  match: PropTypes.object,
  isEdit: PropTypes.bool
}
