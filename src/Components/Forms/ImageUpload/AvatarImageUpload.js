import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import config from '../../../config'
import Avatar from '../../Avatar/Avatar';
import Spinner from '../../Spinner/Spinner'
import '../Forms.css'

export default function AvatarImageUpload(props) {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [imgUrl, setImgUrl] = useState(props.user.image_url)
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

    fetch(`${config.API_ENDPOINT}/image-upload`, {
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
          <Avatar
            className="Main--avatar"
            imageUrl={imgUrl}
            username={props.user.username}
          >
            <span><Spinner /></span>
          </Avatar>
        )
      case uploading && images.length > 0:
        return (
          <Avatar
            className="Main--avatar"
            imageUrl={imgUrl}
            username={props.user.username}
          >
            <span><Spinner /></span>
          </Avatar>
        )
      case images.length > 0:
        return (
          <Avatar
            className="Main--avatar"
            imageUrl={imgUrl}
            username={props.user.username}
          >
            {/* <span onClick={() => setImages([])}>-REMOVE</span> */}
          </Avatar>
        )
      default:
        return (
          <Avatar
            className="Main--avatar"
            imageUrl={imgUrl}
            username={props.user.username}
          >
            <span>+IMAGE</span>
          </Avatar>
        )
    }
  }

  return(
    <fieldset>
      <div className="flex-center-between">
        <div className="AvatarPreview">
          <label htmlFor="imgUrl">
            { labelContent() }
          </label>
          <input
            type="file"
            id="imgUrl"
            name="imgUrl"
            className="sr-only"
            aria-label="select image"
            onChange={handleImgChange}
          />
        </div>
        <h1 className="Main--header--title username">{props.user.username}</h1>
      </div>
    </fieldset>
  )
}

AvatarImageUpload.defaultProps = {
  user: { username: '', imgUrl: ''},
  updateImgUrl: () => { }
}

AvatarImageUpload.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    imgUrl: PropTypes.string
  }),
  updateImgUrl: PropTypes.func
}
