import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Map, Marker } from 'pigeon-maps';
import { Bar } from 'react-chartjs-2';  
import "./IndividualVolcano.css"


export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const volcano_id = searchParams.get("id");

    const [volcanoData, setVolcanoData] = useState([]);

    const API_URL = `http://sefdb02.qut.edu.au:3001/volcano/${volcano_id}`

    useEffect(() => {
      const getValcanoData = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setVolcanoData(data); 
      }

      (async () => await getValcanoData())();
    }, []); //https://www.youtube.com/watch?v=9vvtO0S1KlY
    
  const LATITUDE = Number(`${volcanoData.latitude}`)
  const LONGITUDE = Number(`${volcanoData.longitude}`)
  const [center, setCenter] = useState([LATITUDE, LONGITUDE])
  const [zoom, setZoom] = useState(10)


  return (
    <div className='container'>
        <h1 className='volcano-title'>{volcanoData.name}</h1>
        <h2 className='country-title'>{volcanoData.country}</h2>
        <hr />
        <h3>Volcano Information</h3>
        <p>Subregion: {volcanoData.subregion}</p>
        <p>Last Eruption: {volcanoData.last_eruption}</p>
        <p>Summit: {volcanoData.summit}m</p>
        <p>Elevation: {volcanoData.elevation}ft</p>
        <p>Latitude: {volcanoData.latitude}</p>
        <p>Longitude: {volcanoData.longitude}</p>
        <hr />

        <div className='volcano-map'>
          <h3>Map</h3>
          <Map 
            height={500}
            defaultCenter={[0, 0]} 
            center={[LATITUDE, LONGITUDE]}
            zoom={zoom}
            onBoundsChanged={({center, zoom}) => {
              setCenter(center)
              setZoom(zoom)
            }}
            >
            <Marker width={50} anchor={center} />
          </Map>
            <hr />
        </div>

        <div className='volcano-graph'>
            <h3>Population Information</h3>
            {/* <Bar>

            </Bar> */}
        </div>

        <button onClick={() => navigate("/volcanolist")}>Go Back</button>
    </div>
  )
}
