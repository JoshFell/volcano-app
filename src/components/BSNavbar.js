import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap';
import logo from '../images/volcano.png';
import './BSNavbar.css';

function BSNavbar() {
  return (
    <>
        <Navbar className='navbar' variant="light">
            <Navbar.Brand href="/">
                <img 
                src= {logo} 
                height="70"
                width="70"
                alt='logo' 
                /> 
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/volcanolist">Volcano List</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Log in</Nav.Link>
            </Nav>
        </Navbar>
    </>

  )
}

export default BSNavbar