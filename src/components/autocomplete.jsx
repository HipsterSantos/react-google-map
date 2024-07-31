import { useJsApiLoader } from '@react-google-maps/api'
import React,{useEffect,useRef, useState} from 'react'


const libraries = ['places']

export default function Autocomplete({onPlaceSelected, ...rest}){
    const {isLoaded,loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.GOOGLE_MAP_API_KEY,
        libraries
    })
    const [location,setLocation] = useState({lat: null, lon: null})
    const [country,setCountry] = useState(null)

    const inputRef = useRef(null)
    const autocomplete = useRef(null)

    useEffect(()=>{
        if(isLoaded && inputRef.current){
            autocomplete.current = new window.google.maps.places.Autocomplete(inputRef.current,{
                types: ['locality']
            })
            autocomplete.current.addListener('place_changed',()=>{
                const place = autocomplete.current.getPlace();
                onPlaceSelected(place)
            })
        }

    },[isLoaded]) 

    if (loadError) {
        return <div>Error loading Google Maps</div>;
      }

    return (
        <input
      ref={inputRef}
      type="text"
      placeholder="Enter a location"
      style={{
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
      />
    )
}