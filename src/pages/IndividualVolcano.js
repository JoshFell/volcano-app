import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Map, Marker } from 'pigeon-maps';
import { Bar } from 'react-chartjs-2'; 
import { Button } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import "./IndividualVolcano.css"
import InfoCard from "../components/InfoCard"
import EruptionIcon from "../images/eruption.png"
import SummitIcon from "../images/summit.png"
import ElevationIcon from "../images/elevation.png"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "Population Density",
      fontSize: 20
    },
  },
};

const labels = ['5km', '10km', '30km', '100km'];



export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const volcano_id = searchParams.get("id");
    const [volcanoData, setVolcanoData] = useState([]);
    const API_URL = `http://sefdb02.qut.edu.au:3001/volcano/${volcano_id}`
    const LATITUDE = Number(`${volcanoData.latitude}`)
    const LONGITUDE = Number(`${volcanoData.longitude}`)
    const [center, setCenter] = useState([LATITUDE, LONGITUDE])
    const [zoom, setZoom] = useState(10)
    const token = localStorage.getItem("token");
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }

    useEffect(() => {
      fetch(API_URL, {headers})
      .then((res) => res.json())
      .then((res) => setVolcanoData(res));
    }, [])

    const data ={
      labels,
      datasets: [
        {
          label: 'Population',
          // data: labels.map(() => volcanoData.population_5km),
          data: [volcanoData.population_5km, volcanoData.population_10km, volcanoData.population_30km, volcanoData.population_100km],
          backgroundColor: 'rgba(211, 47, 47, 0.7)'
        }
        // {
        //   label: 'Populated within 10km',
        //   data: labels.map(() => volcanoData.population_10km),
        //   backgroundColor: 'rgba(53, 162, 235, 0.5)'
        // },
        // {
        //   label: 'Populated within 30km',
        //   data: labels.map(() => volcanoData.population_30km),
        //   backgroundColor: 'rgba(255, 99, 132, 0.5)'
        // },
        // {
        //   label: 'Populated within 100km',
        //   data: labels.map(() => volcanoData.population_100km),
        //   backgroundColor: 'rgba(255, 99, 132, 0.5)'
        // }
      ]
    }

  return (
    <div className='container'>
        <h1 className='volcano-title'>{volcanoData.name}</h1>
        <h2 className='country-title'>{volcanoData.subregion}, {volcanoData.country}</h2>

        <hr />

        <h3>Volcano Information</h3>
        <div className='cards-container'>
          <InfoCard cardTitle="Last Eruption" icon={EruptionIcon} cardData={`${volcanoData.last_eruption}`} />
          <InfoCard cardTitle="Summit" icon={SummitIcon} cardData={`${volcanoData.summit}m`} />
          <InfoCard cardTitle="Elevation" icon={ElevationIcon} cardData={`${volcanoData.elevation}ft`} />
        </div>

        <hr />

        <div className='volcano-map'>
          <h3>Location</h3>
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
            <p>population 5km: {volcanoData.population_5km}</p>
            <p>population 10km: {volcanoData.population_10km}</p>
            <p>population 30km: {volcanoData.population_30km}</p>
            <p>population 100km: {volcanoData.population_100km}</p>
            <Bar
              data={data}
              height={400}
              width={600}
              options={options}
              />

        </div>

        <Button variant="danger" onClick={() => navigate("/volcanolist")}>Go Back</Button>
    </div>
  )
}
