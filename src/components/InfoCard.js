import React from 'react'
import "./InfoCard.css"

export default function InfoCard(props) {
  return (
    <div className='info-card-container'>
        <img src={props.icon} alt="icon" />
        <h3 className='card-title'>{props.cardTitle}</h3>
        <h4 className='card-data'>{props.cardData}</h4>
    </div>
  )
}
