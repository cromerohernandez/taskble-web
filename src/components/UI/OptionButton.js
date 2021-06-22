import React, { useContext, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'

import deleteTaskIcon from '../../assets/images/deleteTaskIcon.png'

import '../../stylesheets/UI/OptionButton.css'

const OptionButton = ({ option, onClick }) => {
  const { texts } = useContext(TranslateContext)

  const [enter, setEnter] = useState(false)
  const [detail, setDetail] = useState(false)

  const handleOnMouseEnter = () => {
    setEnter(true)
    setTimeout(() => setDetail(true), 650)
  }

  const handleOnMouseLeave = () => {
    setEnter(false)
    setDetail(false)
    setTimeout(() => setDetail(false), 650)
  }

  return (
    <button className='optionButton' onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} onClick={onClick}>
      {(enter && detail) && (
        <h6>{texts.buttons[option] + ' | '}</h6>
      )}
      
      <img 
        src={deleteTaskIcon}
        alt={`${option}Icon`}
        className="optionButton-img"
      />
    </button>
  )
}

export default OptionButton