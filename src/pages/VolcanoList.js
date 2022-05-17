import React, {useState, useEffect} from 'react';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { useNavigate } from 'react-router-dom';
import "./VolcanoList.css";




function VolcanoList() {

  //hook likely required
  const COUNTRY = "Australia";
  //const [countryState, setCountry] = useState("");


  const columns = [
    {headername: "Name", field: "name"},
    {headername: "Country", field: "country"},
    {headername: "Region", field: "region"},
    {headername: "Subregion", field: "subregion"}
  ]

  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

   useEffect(() => {
    fetch(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${COUNTRY}`)
    .then((res) => res.json())
    .then((volcanoes) => 
    volcanoes.map((volcanoes) =>{
      return{
        name: volcanoes.name,
        country: volcanoes.country,
        region: volcanoes.region,
        subregion: volcanoes.subregion 
      };
    })
    )
    .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div className='container'>
      <br />
      <div className='search-container'>
        <label className='country-label'>
          Country: 
          <select>
            <option value="Australia">Australia</option>
            <option value="Japan">Japan</option>
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
        paginationPageSize={11}>

        </AgGridReact>
      </div>
    </div>
  )
}

export default VolcanoList