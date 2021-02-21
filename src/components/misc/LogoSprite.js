import React, { useState, useEffect } from 'react'

import logoSprite from '../../assets/images/taskbleLogoSprite.png'

import '../../stylesheets/misc/logoSprite.css'

const LogoSprite = () => {
  const [img, setImg] = useState(null)
  const [frames, setFrames] = useState(16)
  const [frameIndex, setFrameIndex] = useState(0)
  const [ctx, setCtx] = useState(null)

  useEffect(() => {
    setCanvas()
    setImage()
    console.log(ctx)
  }) 

  useEffect(() => {
    if (frameIndex < frames) {
      const newFrameIndex = frameIndex + 1

      clearLogo()
      drawLogo(ctx)
      setTimeout(() => {setFrameIndex(newFrameIndex)}, 40)
    }
  }, [ctx])

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

  const drawLogo = (ctx) => {
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
  }

  const clearLogo = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  return <canvas id='logoCanvas'/>
}

export default LogoSprite


/*class LogoSprite extends React.Component {
  state = {
    img: null,
    frames: 16,
    frameIndex: 0,
    ctx: null
  }

  componentDidMount() {
    this.setCanvas()
    this.setImage()
  }

  componentDidUpdate() {
    if (this.state.frameIndex < this.state.frames) {
      const { frameIndex } = this.state
      const newFrameIndex = frameIndex + 1

      this.clearLogo()
      this.drawLogo()
      setTimeout(
        () => {
          this.setState({
            frameIndex: newFrameIndex
          })
        },
        40
      )
    }
  }

  setCanvas = () => {
    const canvas = document.getElementById("logoCanvas")
    canvas.width = window.innerWidth/4.2
    canvas.height = canvas.width/4.82
    const ctx = canvas.getContext("2d")

    this.setState({
      ctx: ctx
    })
  }

  setImage = () => {
    var img = new Image()
    img.src = logoSprite

    this.setState({
      img: img
    })
  }

  drawLogo() {
    const { img, frames, frameIndex, ctx } = this.state

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
  }

  clearLogo() {
    const { ctx } = this.state

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  render() {
    return (
      <canvas id='logoCanvas'/>
    )
  }
}*/