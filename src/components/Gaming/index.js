import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import NxtWatchContext from '../../context/index'
import SelectionMenu from '../SelectionMenu'

const Gaming = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        console.log(darkMode)
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
export default Gaming
