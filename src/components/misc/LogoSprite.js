import React from 'react'

import logoSprite from '../../assets/images/taskbleLogoSprite.png'

class LogoSprite extends React.Component {
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
      this.state
    )
  }

  render() {
    const { logo } = this.state

    //<img alt='logoSprite' src={logo} height='100'/>

    return(
      <canvas height='236' width='1138'/>
    )
  }
}

export default LogoSprite