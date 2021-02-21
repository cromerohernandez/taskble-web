import React from 'react'

import logoSprite from '../../assets/images/taskbleLogoSprite.png'

import '../../stylesheets/misc/logoSprite.css'

class LogoSprite extends React.Component {
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
}

export default LogoSprite