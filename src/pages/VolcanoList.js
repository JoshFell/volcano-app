import React, {useState, useEffect} from 'react';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { useNavigate } from 'react-router-dom';
import "./VolcanoList.css";




function VolcanoList() {

  //hook likely required
  const COUNTRY = "Australia";
  const [countryState, setCountry] = useState("Australia");
  const [cntryData, setCntryData] = useState([]);

  const countries_url = "http://sefdb02.qut.edu.au:3001/countries";



  const columns = [
    {headerName: "ID", field: "id", hide: true},
    {headerName: "Name", field: "name", filter: true},
    {headerName: "Country", field: "country"},
    {headerName: "Region", field: "region"},
    {headerName: "Subregion", field: "subregion"}
  ]

  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  // function UpdateTable(){
  //   useEffect(() => {
  //     fetch(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${countryState}`)
  //     .then((res) => res.json())
  //     .then((volcanoes) => 
  //     volcanoes.map((volcanoes) =>{
  //       return{
  //         name: volcanoes.name,
  //         country: volcanoes.country,
  //         region: volcanoes.region,
  //         subregion: volcanoes.subregion 
  //       };
  //     })
  //     )
  //     .then((rowData) => setRowData(rowData));
  //   }, []);
  // }

   useEffect(() => {
    // fetch(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${countryState}`)
    fetch(`http://sefdb02.qut.edu.au:3001/volcanoes?country=Japan`)
    .then((res) => res.json())
    .then((volcanoes) => 
    volcanoes.map((volcanoes) =>{
      return{
        id: volcanoes.id,
        name: volcanoes.name,
        country: volcanoes.country,
        region: volcanoes.region,
        subregion: volcanoes.subregion
      };
    })
    )
    .then((rowData) => setRowData(rowData));
  }, []);

  // function GetCountries(){
  //     const getCountryData = async () => {
  //       const res = await fetch(countries_url);
  //       const countryData = await res.json();
  //       setCntryData(countryData);
  //     }

  //     (async () => await getCountryData())();

  // }

  return (
    <div className='container'>
      <br />
      <div className='search-container'>
        <label className='country-label'>
          Country: 
          <select>
            <option value="">...</option>
          </select>
        </label>
      </div>

      
      <div className='ag-theme-balham'
      style={{
        height: "400px",
        width: "800px"
      }}>
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={11}
          onCellClicked={(row) => navigate(`/individualvolcano?
            &name=${row.data.name}
            &id=${row.data.id}
            &country=${row.data.country}`)

          }

        >

        </AgGridReact>
      </div>
      <p className='tip'>Click on a cell to see more information</p>
    </div>
  )
}

export default VolcanoList