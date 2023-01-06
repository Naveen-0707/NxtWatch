import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import NxtWatchContext from '../../context/index'
import SelectionMenu from '../SelectionMenu'

const Trending = () => {
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
            <div>
              <SelectionMenu />
            </div>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default Trending
