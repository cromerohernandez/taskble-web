import React, { useContext, useEffect, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'

import deleteTaskIcon from '../../assets/images/deleteTaskIcon.png'

import '../../stylesheets/UI/OptionButton.css'

const OptionButton = ({ option, onClick }) => {
  const { texts } = useContext(TranslateContext)

  const [enter, setEnter] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!enter & open) {
      setOpen(false)
      console.log('reparado')
    }
  }, [enter, open])

  const handleOnMouseEnter = () => {
    setEnter(true)
    setTimeout(() => setOpen(true), 500)
  }

  const handleOnMouseLeave = () => {
    setEnter(false)
    setOpen(false)
  }

  return (
    <button className='optionButton' onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} onClick={onClick}>
      {(enter && open) && (
        <h6 className='optionButton-text'>{texts.buttons[option]}</h6>
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