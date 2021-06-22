import React, { useContext, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'

import deleteTaskIcon from '../../assets/images/deleteTaskIcon.png'

import '../../stylesheets/UI/OptionButton.css'

const OptionButton = ({ option, onClick }) => {
  const { texts } = useContext(TranslateContext)

  const [enter, setEnter] = useState(false)
  const [detail, setDetail] = useState(false)

  const detailOn = () => {
    setTimeout(() => {
      const updatedEnter = enter
      if (updatedEnter) {
        setDetail(true)
      }
    }, 650)
  }

  const enterOn = async () => {
    setEnter(true)
  }

  const handleOnMouseEnter = () => {
    enterOn()
      .then((value) => console.log(enter))
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