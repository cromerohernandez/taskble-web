import React, { useState, useEffect, useCallback } from 'react'

import logoSprite from '../../assets/images/taskbleLogoSprite.png'

import '../../stylesheets/UI/LogoSprite.css'

const LogoSprite = () => {
  const [img, setImg] = useState(null)
  const [frames] = useState(16)
  const [frameIndex, setFrameIndex] = useState(null)
  const [ctx, setCtx] = useState(null)

  const setCanvas = () => {
    const canvas = document.getElementById("logoCanvas")
    canvas.width = window.innerWidth/4.2
    canvas.height = canvas.width/4.82
    const ctx = canvas.getContext("2d")

    setCtx(ctx)
  }

  const setImage = () => {
    var img = new Image()
    img.src = logoSprite

    setImg(img)
  }

  const drawLogo = useCallback(() => {
     ctx.drawImage(
      img,
      frameIndex * img.width / frames,
      0,
      img.width / frames,
      img.height,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    )
  }, [img, frames, frameIndex, ctx])

  const clearLogo = useCallback(() => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, [ctx])

  useEffect(() => {
    setCanvas()
    setImage()
  }, []) 

  useEffect(() => {
    if (frameIndex === null) {
      setFrameIndex(0)
    } else if (frameIndex < frames) {
      clearLogo()
      drawLogo()
      setTimeout(() => {setFrameIndex(frameIndex + 1)}, 40)
    }
  }, [frames, frameIndex, clearLogo, drawLogo])

  return <canvas id='logoCanvas'/>
}

export default LogoSprite