import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {RiMoonFill, RiSunLine} from 'react-icons/ri'
import Cookies from 'js-cookie'
import NxtWatchContext from '../../context/index'

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
              <div className="nav-content">
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
                <div>
                  <button type="button" onClick={onChangeMode}>
                    {darkMode ? <RiSunLine /> : <RiMoonFill />}
                  </button>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                  <button
                    type="button"
                    className="logout-desktop-btn"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="nav-menu-mobile">
                <ul className="nav-menu-list-mobile">
                  <Link to="/">
                    <li className="nav-menu-item-mobile">
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
                    </li>
                  </Link>
                </ul>
              </div>
            </nav>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default withRouter(Header)
