import logo from './logo.svg';
import './App.css';
import BSNavbar from './components/BSNavbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home"
import VolcanoList from "./pages/VolcanoList";
import IndividualVolcano from "./pages/IndividualVolcano"
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <BSNavbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/volcanolist' exact element={<VolcanoList />} /> 
          <Route path='/individualvolcano' element={<IndividualVolcano />} />
          <Route path='/register' element={<Register />} /> 
          <Route path='/login' element={<LogIn />} />  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
