import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import config from '../../../config'
import Spinner from '../../Spinner/Spinner'
import defaultFlyer from '../../../assets/blood-texture.jpg'
import '../Forms.css'

export default function FlyerUpload(props) {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [imgUrl, setImgUrl] = useState(props.flyer.image_url || '')
  useEffect(() => {
    props.updateImgUrl(imgUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl])

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files)
    setUploading(true)
    const formData = new FormData()
    files.forEach((file, i) => {
      formData.append(i, file)
    })

    fetch(`${config.API_ENDPOINT}/api/image-upload`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(images => {
        setUploading(false)
        setImages(images)
        setImgUrl(images[0].secure_url)
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
      // case uploading && images.length > 0:
      //   return (
      //     <Avatar
      //       className="Main--avatar"
      //       imageUrl={imgUrl}
      //       username={props.user.username}
      //     >
      //       <span><Spinner /></span>
      //     </Avatar>
      //   )
      case images.length > 0:
        return (
          <div className="FlyerPreview">
            <img
              src={Boolean(imgUrl) ? imgUrl : defaultFlyer}
              alt={`flyer image loading`}
            />

          </div>
        )
      default:
        return (
          // <div
          //   className="FlyerPreview"
          //   style={{ backgroundImage: 'url(' + imgUrl + ')' }}
          //   alt={`flyer image`}
          // >
          //   <span>+IMAGE</span>
          // </div>
          <div className="FlyerPreview">
            <img
              src={Boolean(imgUrl) ? imgUrl : defaultFlyer}
              // className="FlyerPreview"
              alt={`flyer image loading`}
            />
            <span>+FLYER IMAGE</span>
          </div>


        )
    }
  }

  return (
    <fieldset>
      {/* <div className="flex-center-between"> */}
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
          />
      {/* </div> */}
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
  updateImgUrl: PropTypes.func
}
