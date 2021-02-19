import React from 'react'

import logoSprite from '../../assets/images/taskbleLogoSprite.png'

import '../../stylesheets/misc/logoSprite.css'

class LogoSprite extends React.Component {
  state = {
    logoSprite: logoSprite,
    frames: 16,
    leftFrame: 5000
  }

  render() {
    const { logoSprite, leftFrame } = this.state

    return (
      <img src={logoSprite} alt="taskbleLogoSprite" left={leftFrame} id="sprite"/>
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