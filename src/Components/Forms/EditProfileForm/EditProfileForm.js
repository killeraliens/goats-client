import React, { useContext, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppContext from '../../../AppContext';
import AvatarImageUpload from '../ImageUpload/AvatarImageUpload';
import './EditProfileForm.css';
import '../Forms.css';
// import config from '../../../config'
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup'


function EditProfileForm() {
  const context = useContext(AppContext)
  const [user] = useState(context.user)
  const [formBody, setFormBody] = useState({
    imgUrl: { value: user.image_url || '' },
    countryName: { value: user.country_name || '' },
    regionName: { value: user.region_name || '' },
    cityName: { value: user.city_name || '', error: '' }
  })

  useEffect(() => {
    const setFormFromContext = () => {
      console.log('app context user', user)
    }
    setFormFromContext()
  }, [])

  const updateCountryRegionCity = (fields) => {
    setFormBody(prev => ({ ...prev, ...fields }))
  }

  const updateImgUrl = (url) => {
    setFormBody(prev => ({ ...prev, imgUrl: {value: url }}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedUserProps = {
      imgUrl: formBody.imgUrl.value,
      countryName: formBody.countryName.value,
      regionName: formBody.regionName.value,
      cityName: formBody.cityName.value
    }
    console.log(updatedUserProps)
  }

  return(
    <div className="Main--content no-margin">
      <form className="EditProfileForm header-form" onSubmit={handleSubmit}>
        <AvatarImageUpload user={user} updateImgUrl={updateImgUrl}/>
        <CountryRegionCityFormGroup updateCountryRegionCity={updateCountryRegionCity}/>
        <div className="form-controls">
          <button type="submit" disabled={formBody.cityName.error}>Submit</button>
          <Link to={`/dashboard/${user.id}`}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default withRouter(EditProfileForm)
