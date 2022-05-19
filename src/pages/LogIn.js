import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

function Login() {
  const API_URL = `http://sefdb02.qut.edu.au:3001`
  //mayhaps hook------
  const EMAIL = "";
  const PASSWORD = "";
  //------------------

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function GetEmail(foundEmail){
    setEmail(foundEmail);
  }

  function GetPassword(foundPassword){
    setPassword(foundPassword);
  }

  function UserLogin(){
      const url = `${API_URL}/user/login`;

      return fetch(url, {
      method: "POST",
      headers: {accept: "application/json", "Content-Type" : "application/json"},
      // body: JSON.stringify({email: `${email}`, password: `${password}`}) 
      body: JSON.stringify({email: "mike@gmail.com", password: "passwordd"})
    })
    .then(res => res.json())
    .then(res => {res.message ? alert(res.message) : console.log("No message")}) //console.log(res)
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
          <Form.Control 
            value={email} 
            type="email" 
            placeholder="Enter email" 
            // onChange={GetEmail(email)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            value={password} 
            type="password" 
            placeholder="Password" 
            // onChange={GetPassword(password)} 
          />
        </Form.Group>
        <Button variant="danger" onClick={UserLogin}>
          Login
        </Button>
    </Form>
    </div>
  )
}

export default Login