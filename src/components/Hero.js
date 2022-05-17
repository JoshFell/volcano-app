import React from 'react'
import HeroImage from '../images/volcano-hero.jpg';
import {Button} from 'react-bootstrap';
import './Hero.css';

function Hero() {
  return (
        <div className='hero-container'> 
            <h1>Volcanoes of the World</h1>
            <img src={HeroImage} alt="Hero Image" />
            <Button variant="dark" size='lg'>Log In</Button>{' '}
            <Button variant="outline-dark" size='lg'>Register</Button>{' '}
        </div>
  )
}

export default Hero