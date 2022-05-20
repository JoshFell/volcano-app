import React, {useState} from 'react'
import { Form, Button, Alert } from 'react-bootstrap'

function Register() {
  const API_URL = `http://sefdb02.qut.edu.au:3001`
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function RegisterUser(){
    const url = `${API_URL}/user/register`;
    
    return fetch(url, {
    method: "POST",
    headers: {accept: "application/json", "Content-Type" : "application/json"},
    body: JSON.stringify({email: `${email}`, password: `${password}`})
  })
  .then(res => res.json())
  .then(res =>alert(res.message))
}

  return (
    <div className='container'>
      <br />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="danger" onClick={RegisterUser}>
          Register
        </Button>
    </Form>
    </div>
  )
}

export default Register