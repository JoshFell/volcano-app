import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

function Register() {
  const API_URL = `http://sefdb02.qut.edu.au:3001/user/register`
  //mayhaps hook------
  const EMAIL = "";
  const PASSWORD = "";
  //------------------

  function Register(){
    return fetch(API_URL, {
      method: "POST",
      headers: {accept: "application/json", "Content-Type" : "application/json"},
      body: JSON.stringify({email: EMAIL, password: PASSWORD}) 
    })
  }

  return (
    <div className='container'>
      <br />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="danger" type="submit">
          Register
        </Button>
    </Form>
    </div>
  )
}

export default Register