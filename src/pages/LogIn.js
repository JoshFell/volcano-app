import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

function Login() {
  const API_URL = `http://sefdb02.qut.edu.au:3001`
  //mayhaps hook------
  const EMAIL = "";
  const PASSWORD = "";
  //------------------

  function UserLogin(){
      const url = `${API_URL}/user/login`;

      return fetch(url, {
      method: "POST",
      headers: {accept: "application/json", "Content-Type" : "application/json"},
      body: JSON.stringify({email: "mike@gmail.com", password: "password"}) 
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(res => {
      localStorage.setItem("token", res.token);
    });
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
        <Button variant="danger" onClick={UserLogin}>
          Login
        </Button>
    </Form>
    </div>
  )
}

export default Login