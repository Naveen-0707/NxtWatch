import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import NxtWatchContext from '../../context/index'
import SelectionMenu from '../SelectionMenu'
import {MainContainer, NotFoundImg} from './styledComponent'

const NotFound = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        return (
          <>
            <Header />
            <MainContainer darkMode={darkMode}>
              <SelectionMenu />
              <div>
                <div>
                  {darkMode ? (
                    <NotFoundImg
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                      alt="not found"
                    />
                  ) : (
                    <NotFoundImg
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                      alt="not found"
                    />
                  )}
                </div>

                <h1>Page Not Found</h1>
                <p>We are sorry, the page you requested could not be found.</p>
              </div>
            </MainContainer>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default NotFound
