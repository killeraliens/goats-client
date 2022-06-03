import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import FlyerCard from '../FlyerCard';

describe('FlyerCard component', () => {
  it('renders an tour where some dates are past and some are future as not past', () => {

    const eventOne = new Date(new Date().getTime() - 7*86400000);
    const dayOne = eventOne.getDate().toString().padStart(2, '0');
    const monthOne = (eventOne.getMonth() + 1).toString().padStart(2, '0');
    const yearOne = eventOne.getFullYear();

    const eventTwo = new Date(new Date().getTime() - 3*86400000);
    const dayTwo = eventTwo.getDate().toString().padStart(2, '0');
    const monthTwo = (eventTwo.getMonth() + 1).toString().padStart(2, '0');
    const yearTwo = eventTwo.getFullYear();

    render(
      <BrowserRouter>
      <FlyerCard isEdit={false} flyer={{
        id: '',
        creator_id: '',
        flyer_type: 'Tour',
        image_url: '',
        headline: '',
        bands: '',
        details: '',
        publish_comment: '',
        listing_state: 'Public',
        created: '',
        modified: '',
        creator_username: '',
        creator_image_url: '',
        events: [
          {
            id: '',
            flyer_id: '',
            event_date: `${yearOne}-${monthOne}-${dayOne}T00:00:00.000Z`,
            venue_name: '',
            city_name: '',
            region_name: '',
            country_name: '',
            city_id: null,
            cancelled: false
          },
          {
            id: '',
            flyer_id: '',
            event_date: `${yearTwo}-${monthTwo}-${dayTwo}T00:00:00.000Z`,
            venue_name: '',
            city_name: '',
            region_name: '',
            country_name: '',
            city_id: null,
            cancelled: false
          }
        ]
      }}/>
      </BrowserRouter>
    );

    const isPast = screen.queryByText(/Past/i);
    expect(isPast).toBeInTheDocument();

  })
})