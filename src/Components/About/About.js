import React from 'react';
import CentralContainer from '../CentralContainer/CentralContainer'
import Mailto from 'react-protected-mailto'

export default function About() {
  return (
    <CentralContainer>
      <section>
        <h1>About</h1>
        <p>
          This is a community forum where you can post flyer artwork
          and other relevant information for live tours and concerts.
        </p>
        <p>
          Your personal account information will never be shared,
          but the things you post on here will be visible to other members.
        </p>
        <p>
          This project is in testing and development mode. It needs people like you to sign up and post content.
          Email
          {' '}
          <Mailto
            email='goatsforum@gmail.com'
            // headers={
            //   { subject: 'General' },
            //   { cc: 'friend@coston.cool' }
            // }
          />
          {' '}
          with errors, questions, or general improvements.
          {/* If you come across any bugs, issues, or general improvements while using this site email goatsforum@gmail.com. */}
          {/* If you come across any bugs, issues, or general improvements while using this site email ali@goatsguide.com.
          If you are a developer and would like to contribute, email me. */}
        </p>
      </section>
    </CentralContainer>
  )
}
