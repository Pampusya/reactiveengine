import React from 'react'
import Rentelement from './Rentelement/Rentelement'


const Carline = (cars) => {
  return (
    <div className="carline">
        {cars.cars.map((car, index) => <Rentelement key = {index} car = {car}/>)}
    </div>
  )
}

export default Carline