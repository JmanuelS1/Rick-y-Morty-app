import React from 'react'
import './styles/LocationInfo.css'


const LocationInfo = ({location}) => {
  console.log(location)
  return (
    <section className='location'>
      <h2 className='location__name'>{location?.name}</h2>
      <ul className='location__list'>
        <li><span className='location__item'>Type : </span> <span className='ultimo__span'>{location?.type} </span></li>
        <li><span className='location__item'>Dimension : </span> <span className='ultimo__span'>{location?.dimension} </span></li>
        <li><span className='location__item'>Population :</span> <span className='ultimo__span'>{location?.residents.length} </span></li>
      </ul>
    </section>
  )
}
export default LocationInfo
