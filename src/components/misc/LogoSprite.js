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
      this.drawLogo()

      const { frameIndex } = this.state
      const newFrameIndex = frameIndex + 1

      console.log(frameIndex)
      setInterval(
        () => {
          this.setState({
            frameIndex: newFrameIndex
          })
        },
        100
      )
    }
  }

  setCanvas = () => {
    const canvas = document.getElementById("logoCanvas")
    canvas.height = 236
    canvas.width = 1138
    const ctx = canvas.getContext("2d")

    this.setState({
      ctx: ctx
    })
  }

  setImage = () => {
    var img = new Image
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
      1138,
      236
    )
  }

  render() {
    return (
      <canvas id='logoCanvas'/>
    )
  }
}

export default LogoSprite

/*class LogoSprite extends React.Component {
  state = {
    logo: new Image(),
    src: logoSprite,
    frames: 16,
    frameIndex: 0,
    ctx: null
  }

  setCanvas = () => {
    const canvas = document.getElementById("my-canvas")
    canvas.height = window.innerHeight
    canvas.width = window.innerHeight
    const ctx = canvas.getContext("2d")

    this.setState({
      ctx: ctx
    })
  }

  setLogo = () => {
    const { logo, src } = this.state

    logo.src = src
    logo.onload = () => this.draw()
  }

  drawLogo = () => {
    this.state.ctx.drawImage(
      this.state.logo
    )
  }

  componentDidMount() {
    //this.setCanvas(),
    this.setLogo()
  }

  render() {
    const { logo } = this.state

    return(
      <canvas height='236' width='1138'/>
    )
  }
}

export default LogoSprite*/