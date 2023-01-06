import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {ListItem, MainContainer, Logo, LogosContainer} from './styledComponents'

class SelectionMenu extends Component {
  render() {
    return (
      <MainContainer>
        <div>
          <ul>
            <Link to="/">
              <ListItem>
                <AiFillHome />
                <p>Home</p>
              </ListItem>
            </Link>
            <Link to="/videos/trending">
              <ListItem>
                <AiFillHome />
                <p>Trending</p>
              </ListItem>
            </Link>
            <Link to="/videos/gaming">
              <ListItem>
                <AiFillHome />
                <p>Gaming</p>
              </ListItem>
            </Link>
            <Link to="/videos/saved_videos">
              <ListItem>
                <AiFillHome />
                <p>Saved videos</p>
              </ListItem>
            </Link>
          </ul>
        </div>

        <div>
          <h4>CONTACT US</h4>
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
            <p>Enjoy Now to see your channels and recommendations!</p>
          </div>
        </div>
      </MainContainer>
    )
  }
}

export default withRouter(SelectionMenu)
