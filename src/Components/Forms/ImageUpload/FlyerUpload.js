import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import config from '../../../config'
import Spinner from '../../Spinner/Spinner'
import defaultFlyer from '../../../assets/blood-texture.jpg'
import ValidationError from '../ValidationError/ValidationError'
import '../Forms.css'

export default function FlyerUpload({ formImgUrl, updateImgUrl, updateImgError }) {
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!window.FileReader) {
      updateImgError("The file API isn't supported on this browser yet.User another broweser.")
    }
  }, [])

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files)
      updateImgError('')
      setUploading(true)
      const formData = new FormData()
      files.forEach((file, i) => {
        if (file.size < 3000000) {
          formData.append(i, file)
          fetch(`${config.API_ENDPOINT}/api/image-upload`, {
            method: 'POST',
            body: formData
          })
            .then(res => res.json())
            .then(images => {
              setUploading(false)
              if (images.length > 0) {
                updateImgUrl(images[0].secure_url)
                updateImgError('')
              }
            })
            .catch(err => updateImgError('Error in upload, check connection'))
        } else {
          setUploading(false)
          updateImgError('File must be under 3MB')
        }
      })

  }

  const labelContent = () => {
    switch (true) {
      case uploading && formImgUrl.value.length === 0:
        return (
        <div className="FlyerPreview">
          <img
            src={defaultFlyer}
            alt={`flyer image loading`}
          />
          <span><Spinner /></span>
        </div>
        )
      case uploading && formImgUrl.value.length > 0:
        return (
          <div className="FlyerPreview">
            <img
              src={formImgUrl.value}
              alt={`flyer image loading`}
            />
            <span><Spinner /></span>
          </div>
        )
      case !uploading && formImgUrl.value.length > 0:
        return(
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
