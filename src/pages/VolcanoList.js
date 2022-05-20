import React, {useState, useEffect} from 'react';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { useNavigate } from 'react-router-dom';
import "./VolcanoList.css";
import { Accordion, Badge, Button, Form } from 'react-bootstrap';




function VolcanoList() {

  const token = localStorage.getItem("token");
  const COUNTRY = "Australia";
  const [countryState, setCountry] = useState("Japan");
  const [cntryData, setCntryData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  const countries_url = "http://sefdb02.qut.edu.au:3001/countries";

  const columns = [
    {headerName: "ID", field: "id", hide: true},
    {headerName: "Name", field: "name", filter: true},
    {headerName: "Country", field: "country"},
    {headerName: "Region", field: "region", filter: true},
    {headerName: "Subregion", field: "subregion", filter: true}
  ]


  //-------------------------------------------------------------------------------------------

   useEffect(() => {
    fetch(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${countryState}`)
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
  }, [countryState]);

  //-------------------------------------------------------------------------------------------

  useEffect(() => {
    fetch(`http://sefdb02.qut.edu.au:3001/countries`)
    .then(response => response.json())
    .then(response => setCntryData(response))
    // .then(() => console.log(cntryData[5]))
  }, []);

  function CheckCountry(){
    for (let i = 0; i < cntryData.length; i++){
      try{
        if (userInput == cntryData[i]){
          setCountry(userInput)
          console.log("Country Found")
          setUserInput("")
        }
    }
    catch{
      alert("Country not found")
    }
      // console.log(cntryData[i])
    }
  }

  return (
    <div className='container'>
      <br />
      <div className='search-container'>
        <Form>
          <Form.Group>
              <Form.Control placeholder='Search Country...' type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
              {/* <Button variant="danger" onClick={CheckCountry}>Search</Button> */}
          </Form.Group>
        </Form>
        <Button className='search-btn' variant="danger" onClick={CheckCountry}>Search</Button>
      </div>

      <div className='ag-theme-balham'
      style={{
        height: "400px",
        width: "800px"
      }}>
        <AgGridReact
          animateRows={true}
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
      
      <p className='tip'>Click on a cell to see more information</p>

      <div className='accordian-container'>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header><Badge className='country-badge' bg="danger">{cntryData.length}</Badge>Available Countries</Accordion.Header>
            <Accordion.Body>
              <div>
                {cntryData.map((data) => <p>{data}</p>)}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* <Button variant="danger" onClick={() => setCountry("Australia")}>Change to Australia</Button>
      <br />
      <br />
      <Button variant="danger" onClick={() => setCountry("Japan")}>Change to Japan</Button> */}

      </div>
    </div>
  )
}

export default VolcanoList