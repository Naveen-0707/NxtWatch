import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import NxtWatchContext from '../../context/index'

import {ListItem, MainContainer, Logo, LogosContainer} from './styledComponents'

class SelectionMenu extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          return (
            <MainContainer darkMode={darkMode}>
              <div>
                <ul>
                  <Link to="/">
                    <ListItem darkMode={darkMode}>
                      <AiFillHome />
                      <p>Home</p>
                    </ListItem>
                  </Link>
                  <Link to="/trending">
                    <ListItem darkMode={darkMode}>
                      <AiFillFire />
                      <p>Trending</p>
                    </ListItem>
                  </Link>
                  <Link to="/gaming">
                    <ListItem darkMode={darkMode}>
                      <SiYoutubegaming />
                      <p>Gaming</p>
                    </ListItem>
                  </Link>
                  <Link to="/saved-videos">
                    <ListItem darkMode={darkMode}>
                      <BiListPlus />
                      <p>Saved videos</p>
                    </ListItem>
                  </Link>
                </ul>
              </div>

              <div>
                <p>CONTACT US</p>
                <LogosContainer>
                  <div>
                    <Logo
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                    />
                  </div>
                  <div>
                    <Logo
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                    />
                  </div>
                  <div>
                    <Logo
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linked in logo"
                    />
                  </div>
                </LogosContainer>
                <div>
                  <p>Enjoy! Now to see your channels and recommendations!</p>
                </div>
              </div>
            </MainContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default withRouter(SelectionMenu)
