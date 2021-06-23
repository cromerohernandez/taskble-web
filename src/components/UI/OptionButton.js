import React, { useContext, useEffect, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'

import deleteTaskIcon from '../../assets/images/deleteTaskIcon.png'

import '../../stylesheets/UI/OptionButton.css'

const OptionButton = ({ option, onClick, stateForm }) => {
  const { texts } = useContext(TranslateContext)

  const [enter, setEnter] = useState(false)
  const [open, setOpen] = useState(false)
  const [on, setOn] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (!enter & open) {
      setOpen(false)
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

  const handleClick = () => {
    onClick()
    if (option === stateForm) {
      setOn(true)
     } else {
      setDisabled(true)
     }
  }

  return (
    <button
      className={'optionButton'}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleClick}
      disabled={disabled}
    >
      {((enter && open) || on) && (
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