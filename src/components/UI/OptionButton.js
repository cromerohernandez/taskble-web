import React, { useContext, useState} from 'react'

import TranslateContext from '../../contexts/TranslateContext'

import deleteTaskIcon from '../../assets/images/deleteTaskIcon.png'

import '../../stylesheets/UI/OptionButton.css'


const OptionButton = ({ option, onClick }) => {
  const { texts } = useContext(TranslateContext)
  const [detail, setDetail] = useState(false)

  const handleOnMouseOver = () => {
    setTimeout(() => setDetail(true), 600)
  }

  const handleOnMouseLeave = () => {
    setDetail(false)
  }

  return (
    <button className='optionButton' onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave} onClick={onClick}>
      {detail && (
        `${texts.buttons[option]} | `
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