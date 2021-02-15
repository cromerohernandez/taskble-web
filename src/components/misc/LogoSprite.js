import React from 'react'

import logoSprite from '../../assets/images/taskbleLogoSprite.png'

class LogoSprite extends React.Component {
  state = {
    frame: 0,
    logo: logoSprite
  }



  render() {
    const { logo } = this.state

    return(
      //<canvas height='236' width='1138'>
      <div>
        <img alt='logoSprite' src={logo} height='100'/>
      </div>
      //</canvas>
    )
  }
}

export default LogoSprite