import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Autocomplete from './components/autocomplete'

function App() {
  const [count, setCount] = useState(0)
  const handlePlaceSelected = (place) => {
    
    console.log('\nplaces selected was ',place)
    
    if (place.geometry) {
      
      console.log('Place details:', place);
      console.log('Formatted address:', place.formatted_address);
      
      const address = place.formatted_address;
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      const placeId = place.place_id;

      console.log('Place details:', place);
      console.log('Formatted address:', address);
      console.log('Coordinates:', { latitude, longitude });
      console.log('Place ID:', placeId);
    } else {
      console.log('No details available for input:', place.name);
    }
  };

  return (
    <>
      <div>
          <h2 className="read-the-docs">
            Testing google map 
          </h2>
          <Autocomplete onPlaceSelected={handlePlaceSelected}/>
      </div>
    </>
  )
}

export default App
