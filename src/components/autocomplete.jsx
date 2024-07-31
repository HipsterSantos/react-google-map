import { useJsApiLoader } from '@react-google-maps/api'
import React,{useEffect,useRef, useState} from 'react'


const libraries = ['places']

export default function Autocomplete({onPlaceSelected, ...rest}){
    const {isLoaded,loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        libraries
    })
    const [location,setLocation] = useState({lat: null, lng: null})
    const [country,setCountry] = useState('AO')

    const inputRef = useRef(null)
    const autocomplete = useRef(null)

    useEffect(()=>{

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                async (position)=>{
                    
                    console.log('\n\nPosition-data-coords ', position)
    
                    const { latitude, longitude } = position.coords;
                    setLocation({lat: latitude,lng: longitude})
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`
                      );
                    
                      const data = await response.json();
                      if(data.results.length>0){
                        const addressComponents = data.results[0].address_components;
                        const countryComponent = addressComponents.find(component =>
                          component.types.includes('country')
                        );
                        setCountry(countryComponent.short_name);
                      }
                    
                      console.log('\n\ndata-feched-current-location ', data)
                },
                (error)=>console.log(error))
        }
    },[])


    useEffect(()=>{
        if(isLoaded && inputRef.current){
            autocomplete.current = new window.google.maps.places.Autocomplete(inputRef.current,{
                types: ['geocode'],
                componentRestrictions:{country},
                strictBounds: false,
                // bounds: new window.google.maps.LatLngBounds(
                //     new window.google.maps.LatLng(location.lat -0.1, location.lng - 0.1),
                //     new window.google.maps.LatLng(location.lat - 0.1,location.lng - 0.1) )
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