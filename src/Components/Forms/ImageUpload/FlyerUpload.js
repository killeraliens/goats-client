import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import config from '../../../config'
import Spinner from '../../Spinner/Spinner'
import defaultFlyer from '../../../assets/blood-texture.jpg'
import ValidationError from '../ValidationError/ValidationError'
import '../Forms.css'

export default function FlyerUpload(props) {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [imgUrl, setImgUrl] = useState(props.flyer.image_url || '')
  const [imgUrlError, setImgUrlError] = useState({touched: false, error: ''})
  const reset = () => {
    setUploading(false)
    setImages([])
    setImgUrl(props.flyer.image_url || '')
    setImgUrlError({ touched: false, error: '' })
  }
  useEffect(() => {
    if (!Boolean(validateImgUrl())) {
      props.updateImgUrl(imgUrl)
    } else {
      props.updateImgError(imgUrlError.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [imgUrl, imgUrlError.error])



  const validateImgUrl = () => {
    if (imgUrlError.touched) {
      return imgUrl.length === 0
        ? 'Flyer image required'
        : Boolean(imgUrlError.error)
        ? imgUrlError.error
        : ''
    }
    return ''
  }


  const handleImgChange = (e) => {
    const files = Array.from(e.target.files)
      setImgUrlError({ error: '', touched: true })
      setUploading(true)
      const formData = new FormData()
      files.forEach((file, i) => {
        if (file.size < 3000000) {
          formData.append(i, file)
          console.log('fetching image upload', imgUrlError)
          fetch(`${config.API_ENDPOINT}/api/image-upload`, {
            method: 'POST',
            body: formData
          })
            .then(res => res.json())
            .then(images => {
              setUploading(false)
              if (images.length > 0) {
                setImages(images)
                setImgUrl(images[0].secure_url)
                setImgUrlError({ touched: true, error: '' })
              }
            })
            .catch(err => alert('error in image upload'))

        } else {
          console.log('image error')
          setUploading(false)
          setImgUrlError({ error: 'File must be under 3MB', touched: true })
        }
      })

  }

  const labelContent = () => {
    switch (true) {
      case uploading && images.length === 0:
        return (
        <div className="FlyerPreview">
          <img
            src={Boolean(imgUrl) ? imgUrl : defaultFlyer}
            alt={`flyer image loading`}
          />
          <span><Spinner /></span>
        </div>
        )
      case uploading && images.length > 0:
        return (
          <div className="FlyerPreview">
            <img
              src={imgUrl}
              alt={`flyer image loading`}
            />
            <span><Spinner /></span>
          </div>
        )
      case images.length > 0:
        return (
          <div className="FlyerPreview">
            <img
              src={Boolean(imgUrl) ? imgUrl : defaultFlyer}
              alt={`flyer image loaded`}
            />

          </div>
        )
      default:
        return (
          <div className="FlyerPreview">
            <img
              src={Boolean(imgUrl) ? imgUrl : defaultFlyer}
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
        aria-invalid={imgUrlError.error}
      />
      <ValidationError id="imgUrlError" message={imgUrlError.error} />
    </fieldset>
  )
}

FlyerUpload.defaultProps = {
  flyer: { image_url: '' },
  updateImgUrl: () => { console.log('updateImgUrl default function') }
}

FlyerUpload.propTypes = {
  flyer: PropTypes.shape({
    imgUrl: PropTypes.string
  }),
  updateImgUrl: PropTypes.func,
  updateImgError: PropTypes.func
}
