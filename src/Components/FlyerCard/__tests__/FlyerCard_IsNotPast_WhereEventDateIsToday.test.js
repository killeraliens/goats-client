import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import FlyerCard from '../FlyerCard';

describe('FlyerCard component', () => {
  it('renders an event scheduled for today as being upcoming and not past', () => {

    const eventDate = new Date();
    const day = eventDate.getDate().toString().padStart(2, '0');
    const month = (eventDate.getMonth() + 1).toString().padStart(2, '0');
    const year = eventDate.getFullYear();

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
            event_date: `${year}-${month}-${day}T00:00:00.000Z`,
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
    expect(isPast).not.toBeInTheDocument();

  })
})