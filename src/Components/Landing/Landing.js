import React from 'react';
// import { NavLink } from 'react-router-dom';
import MainNav from '../MainNav/MainNav';
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import MainHeader from '../MainHeader/MainHeader';

export default function Landing(props) {
  return(
    <div>
      <MainHeader heightClass="dbl-height">
        <p>[<em>placeholder for goat skull illustration</em>]</p>
      </MainHeader>
      <MainHeaderNav
        links={[
          <MainNavLink to="/signin">Sign In</MainNavLink>
        ]}
      />
      <MainNav
        links={[
          <MainNavLink to="/intro">Intro</MainNavLink>,
          <MainNavLink to="/about">About</MainNavLink>
        ]}
      />
      <div className="section-container">
        <section>
          <h1>Welcome to Goat's Forum</h1>
          <h2>The place to post your punk - metal - grind flyers.</h2>
        </section>
        <section>
          <h3>If you know about an upcoming show, fest, or tour share the flyer here.</h3>
          <p>
            This is a DIY bulletin board for those of us who want more event information on the harder genres.
            We give you open-ended templates that allow you to upload artwork along with additional event details.
            If you want to copy/paste from an event already on Facebook, that would be a great way contribute to our community feed.
          </p>
        </section>
        <section>
          <h3>View more artwork and events without having things filtered for you.</h3>
          <p>
            Find out about shows from an international community devoted to the genre, as they get posted.
            This is a private community forum that relies on word-of-mouth sharing to get the right people posting the best content.
            Add more flyers. Tell others.
          </p>
        </section>
        <section>
          <h2>How it works.</h2>
          <div className="InstructionStep">
            <p>[<em>placeholder for Home community feed screenshot</em>]</p>
            <h3>
              Create an account to view & contribute to the community forum.
            </h3>
          </div>
          <div className="InstructionStep">
            <p>[<em>placeholder for Dashboard screenshot</em>]</p>
            <h3>
              Manage your profile appearance, account settings, past contributions
              from the dashboard
            </h3>
          </div>
          <div className="InstructionStep">
            <p>[<em>placeholder for Add Flyer screenshot</em>]</p>
            <h3>
              Post a flyer. Select from 'Single Show', 'Fest', or 'Tour' templates. Complete the form to make the flyer more searchable.
            </h3>
          </div>
        </section>
      </div>
    </div>
  )
}
