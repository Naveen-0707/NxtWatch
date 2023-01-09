import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {RiMoonFill, RiSunLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import NxtWatchContext from '../../context/index'
import {
  HeaderContainer,
  PopContainer,
  Para,
  ProfileImg,
  MenuContainer,
} from './styledComponents'

class Header extends Component {
  render() {
    const onClickLogout = () => {
      Cookies.remove('jwt_token')
      const {history} = this.props
      history.replace('/login')
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          const onChangeMode = () => value.changeMode()
          return (
            <nav className="nav-header">
              <HeaderContainer darkMode={darkMode}>
                <Link to="/">
                  {darkMode ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                      alt="website logo"
                    />
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="website logo"
                    />
                  )}
                </Link>
                <MenuContainer>
                  <div>
                    <button
                      data-testid="theme"
                      type="button"
                      onClick={onChangeMode}
                    >
                      {darkMode ? <RiSunLine /> : <RiMoonFill />}
                    </button>
                  </div>
                  <div>
                    <ProfileImg
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                    />
                  </div>
                  <div>
                    <Popup
                      trigger={
                        <button type="button" className="logout-desktop-btn">
                          Logout
                        </button>
                      }
                      modal
                      position="top left"
                    >
                      {close => (
                        <PopContainer darkMode={darkMode}>
                          <Para>Are you sure,you want to logout?</Para>
                          <button
                            type="button"
                            className="close"
                            onClick={close}
                          >
                            Cancel &times;
                          </button>
                          <button
                            type="button"
                            className="logout-desktop-btn"
                            onClick={onClickLogout}
                          >
                            Confirm
                          </button>
                        </PopContainer>
                      )}
                    </Popup>
                  </div>
                </MenuContainer>
              </HeaderContainer>
            </nav>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default withRouter(Header)
