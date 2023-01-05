import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'
import NxtWatchContext from '../../context/index'

const Home = () => {
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
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default Home

/* <div>
              <div>
                <h1>Clothes That Get YOU Noticed</h1>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                  alt="dresses to be noticed"
                />
                <p>
                  Fashion is part of the daily air and it does not quite help
                  that it changes all the time. Clothes have always been a
                  marker of the era and we are in a revolution. Your fashion
                  makes you been seen and heard that way you are. So, celebrate
                  the seasons new and exciting fashion in your own way.
                </p>
                <Link to="/products">
                  <button type="button">Shop Now</button>
                </Link>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                alt="dresses to be noticed"
              />
            </div> */
