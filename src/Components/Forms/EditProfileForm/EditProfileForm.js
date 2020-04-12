import React, { useContext, useState } from 'react'
import config from '../../../config'
import PropTypes from 'prop-types'
import AppContext from '../../../AppContext'
import AvatarImageUpload from '../ImageUpload/AvatarImageUpload'
import './EditProfileForm.css'
import '../Forms.css'
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup'
import Spinner from '../../Spinner/Spinner'
import Location from '../../FlyerCard/Location'
import './EditProfileForm.css'

export default function EditProfileForm({ history }) {
  const { user, updateUser, setToast } = useContext(AppContext)

  const [formBody, setFormBody] = useState({
    imgUrl: { value: user.image_url || '' },
    cityName: { error: "", touched: false, value: user.city_name || "" },
    countryName: { code: "", value: user.country_name || "" },
    regionName: { array: [], value: user.region_name || "" }
  })
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)

  const resetForm = () => {
    setFormBody({
      imgUrl: { value: user.image_url || '' },
      cityName: { error: "", touched: false, value: user.city_name || "" },
      countryName: { code: "", value: user.country_name || "" },
      regionName: { array: [], value: user.region_name || "" }
    })
  }

  const updateCountryRegionCity = (fields) => {
    setFormBody(prev => ({ ...prev, ...fields }))
  }

  const updateImgUrl = (url) => {
    setFormBody(prev => ({ ...prev, imgUrl: {value: url }}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFetching(true)

    const patchBody = {
      image_url: formBody.imgUrl.value,
      country_name: formBody.countryName.value,
      region_name: formBody.regionName.value,
      city_name: formBody.cityName.value
    }
    const options = {
      method: 'PATCH',
      body: JSON.stringify(patchBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    }
    const response = await fetch(`${config.API_ENDPOINT}/user/${user.id}`, options)

    if (!response.ok) {
      const body = await response.json();
      setServerError({ status: response.status, message: body.message })
      setFetching(false)
    } else {
      setServerError('')
      setFetching(false)
      resetForm()
      const patchedUser = {
        ...user,
        ...patchBody
      }
      updateUser(patchedUser)
      setToast({ message: `Profile successfully updated.` })
      history.push(`/dashboard/${patchedUser.id}`)
    }
  }

  if (fetching) {
    return <Spinner />
  }
  return(
    <div className="Main--content no-margin">
      <form className="EditProfileForm header-form" onSubmit={handleSubmit}>
          <AvatarImageUpload user={user} updateImgUrl={updateImgUrl} />
          <Location
            eventLocation={{
              city_name: user.city_name,
              region_name: user.region_name,
              country_name: user.country_name
            }}
            allCountryFields={true}
          />
          <CountryRegionCityFormGroup
            updateCountryRegionCity={updateCountryRegionCity}
            formCountryRegionCity={{ countryName: formBody.countryName, regionName: formBody.regionName, cityName: formBody.cityName }}
          />
          <div className="form-controls">
            <button type="submit" disabled={formBody.cityName.error}>Submit</button>
            <button type="reset" onClick={() => {
              resetForm()
            return history.push(`/dashboard/${user.id}`)
            }}>
              Cancel
            </button>
          </div>
          { serverError ? <p>{serverError.message}</p> : null }
      </form>
    </div>
  )
}

EditProfileForm.defaultProps = {
  history: { push: () => {}}
}

 EditProfileForm.propTypes = {
   history: PropTypes.object
 }

