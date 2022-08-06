import React from 'react'
import '../Styles/spotlight.css'

function Spotlight() {

    const party: Array<string> = ['party', 'celebration', 'feast', 'festivity', 'fun', 'dance' ]

  return (
    <>
        <div className='spotlight spotlight1'></div>
        <div className='spotlight spotlight2'></div>
        <div className='disco disco1'></div>
        <div className='disco disco2'></div>
        <div className='disco disco3'></div>
        <div className='disco disco4'></div>
        <div className='disco disco5'></div>
        {party.map((word, index) => {
            return (<div className={`abs abs${index}`} key={index}>{word}</div>)
        })}
       
    </>
  )
}

export default Spotlight