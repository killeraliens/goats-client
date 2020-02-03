import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../../AppContext';
import AuthedContext from '../../../AuthedContext';
import AvatarImageUpload from '../ImageUpload/AvatarImageUpload';
import './EditProfileForm.css';
import '../Forms.css';
// import config from '../../../config'
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup'


function EditProfileForm({ history }) {
  const context = useContext(AppContext)
  const [user] = useState(context.user)
  const [formBody, setFormBody] = useState({
    imgUrl: { value: user.image_url || '' },
    cityName: { error: "", touched: false, value: user.city_name || "" },
    countryName: { code: "", value: user.country_name || "" },
    regionName: { array: [], value: user.region_name || "" }
  })

  const updateCountryRegionCity = (fields) => {
    setFormBody(prev => ({ ...prev, ...fields }))
  }

  const updateImgUrl = (url) => {
    setFormBody(prev => ({ ...prev, imgUrl: {value: url }}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedUserProps = {
      id: user.id.toString(),
      image_url: formBody.imgUrl.value,
      country_name: formBody.countryName.value,
      region_name: formBody.regionName.value,
      city_name: formBody.cityName.value
    }
    context.updateUser(updatedUserProps)
    context.updateUsers(updatedUserProps)
    history.push(`/dashboard/${user.id}`)
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

export default EditProfileForm
