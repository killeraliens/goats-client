import React, { useContext, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthedContext from '../../../AuthedContext';
import '../Forms.css';

export default function AddShowForm() {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handle submit')
  }
  return(
    <form className="AddShowForm" onSubmit={handleSubmit}>

    </form>
  )
}
