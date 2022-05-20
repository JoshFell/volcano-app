import React from 'react'
import HeroImage from '../images/volcano-hero.jpg';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();

  return (
        <div className='hero-container'> 
            <h1>Volcanoes of the World</h1>
            <img className='hero-image' src={HeroImage} alt="Hero Image" />

            <h2 className='discover'>Discover More</h2>
            <Button className='hero-login' variant="danger" size='lg' onClick={()=>navigate("/login")}>Log In</Button>{' '}
            <Button className='hero-register' variant="outline-danger" size='lg' onClick={()=>navigate("/register")}>Register</Button>{' '}
        </div>
  )
}

export default Hero