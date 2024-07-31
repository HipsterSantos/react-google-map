import { useJsApiLoader } from '@react-google-maps/api'
import React ,{useState,useEffect,useRef} from 'react'

export default function CustomAutoComplete({onSelected}){
    const {isLoaded,loadError} = useJsApiLoader({
        googleMapsApiKey: '',
        libraries:['places']
    })
    const inputRef = useRef(null);
    const autocomplete = useRef(null)
    
    return (
        <input
        />
    )
}