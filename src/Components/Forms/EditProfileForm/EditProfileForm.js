import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../../../AppContext';
import AvatarImageUpload from '../ImageUpload/AvatarImageUpload';
import './EditProfileForm.css';
import '../Forms.css';
import config from '../../../config'
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup'


export default function EditProfileForm({ history }) {
  const context = useContext(AppContext)
  const [user] = useState(context.user)
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

    // const updatedUserProps = {
    //   image_url: formBody.imgUrl.value,
    //   country_name: formBody.countryName.value,
    //   region_name: formBody.regionName.value,
    //   city_name: formBody.cityName.value
    // }
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
      setServerError(body.message)
      setFetching(false)
    } else {
      setFetching(false)
      resetForm()
      const patchedUser = {
        ...user,
        ...patchBody
      }
      context.updateUser(patchedUser)
      context.updateUsers(patchedUser)
      history.push(`/dashboard/${patchedUser.id}`)
    }
  }

  return(
    <div className="Main--content no-margin">
      <form className="EditProfileForm header-form" onSubmit={handleSubmit}>
        <AvatarImageUpload user={user} updateImgUrl={updateImgUrl}/>
        <CountryRegionCityFormGroup
          updateCountryRegionCity={updateCountryRegionCity}
          formCountryRegionCity={{ countryName: formBody.countryName, regionName: formBody.regionName, cityName: formBody.cityName }}
        />
        <div className="form-controls">
          <button type="submit" disabled={formBody.cityName.error}>Submit</button>
          <Link to={`/dashboard/${user.id}`}>Cancel</Link>
        </div>
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

