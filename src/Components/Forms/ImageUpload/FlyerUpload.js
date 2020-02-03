import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types';
import config from '../../../config'
import AppContext from '../../../AppContext'
import Spinner from '../../Spinner/Spinner'
import defaultFlyer from '../../../assets/blood-texture.jpg'
import ValidationError from '../ValidationError/ValidationError'
import '../Forms.css'


export default function FlyerUpload({ formImgUrl, updateImgUrl, updateImgError }) {
  const [uploading, setUploading] = useState(false)
  const context = useContext(AppContext)
  useEffect(() => {
    if (!window.FileReader) {
      updateImgError("The file API isn't supported on this browser yet.User another broweser.")
    }
  }, [])

  // helper //https://stackoverflow.com/questions/46946380/fetch-api-request-timeout
  const fetchWithTimeout = (url, options, timeout = 7000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), timeout)
      )
    ]);
  }

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files)
      updateImgError('')
      const formData = new FormData()
      files.forEach((file, i) => {
        setUploading(true)
        if (file.size < 3000000) {
          formData.append(i, file)
          fetchWithTimeout(`${config.API_ENDPOINT}/api/image-upload`, {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${context.user.token}`
            }
          }, 15000)
            .then(res => {
              return res.json()
            })
            .then(images => {
              setUploading(false)
              if (images.length > 0) {
                updateImgUrl(images[0].secure_url)
                updateImgError('')
              }
            })
            .catch(err => {
              setUploading(false)
              updateImgError('Error in upload, check connection')
            })
        } else {
          setUploading(false)
          updateImgError('File must be under 3MB')
        }
      })
  }

  const labelContent = () => {
    switch (true) {

      case uploading:
        return (
          <div className="FlyerPreview">
            <img
              src={Boolean(formImgUrl.value) ? formImgUrl.value : defaultFlyer}
              alt={`flyer image loading`}
            />
            <span><Spinner /></span>
          </div>
        )

      case !uploading && formImgUrl.value.length > 0:
        return (
          <div className="FlyerPreview">
            <img
              src={Boolean(formImgUrl.value) ? formImgUrl.value : defaultFlyer}
              alt={`flyer image loaded`}
            />
          </div>
        )

      default:
        return (
          <div className="FlyerPreview">
            <img
              src={Boolean(formImgUrl.value) ? formImgUrl.value : defaultFlyer}
              alt={`add flyer image`}
            />
            <span>+FLYER IMAGE*</span>
          </div>
        )
    }
  }

  return (
    <fieldset>
      <label htmlFor="imgUrl">
        {labelContent()}
      </label>
      <input
        type="file"
        id="imgUrl"
        name="imgUrl"
        className="sr-only"
        aria-label="select image"
        onChange={handleImgChange}
        aria-label="flyer image"
        aria-required="true"
        aria-describedby="imageUrlError"
        aria-invalid={formImgUrl.error}
      />
      <ValidationError id="imgUrlError" message={formImgUrl.error} />
    </fieldset>
  )
}

FlyerUpload.defaultProps = {
  formImgUrl: { value: '', error: '' },
  updateImgUrl: () => { }
}

FlyerUpload.propTypes = {
  formImgUrl: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  updateImgUrl: PropTypes.func,
  updateImgError: PropTypes.func
}
