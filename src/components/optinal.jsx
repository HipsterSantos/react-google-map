import React, { useEffect, useRef } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

const GoogleAutocomplete = ({ onPlaceSelected }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.GOOGLE_MAP_API_KEY, // Replace with your API key
    libraries,
  });

  const inputRef = useRef(null);
  const autocomplete = useRef(null);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      autocomplete.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)'], // Change this to fit your needs
      });

      autocomplete.current.addListener('place_changed', () => {
        const place = autocomplete.current.getPlace();
        onPlaceSelected(place);
      });
    }
  }, [isLoaded]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Enter a location"
      style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    />
  );
};

export default GoogleAutocomplete;
