import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

import './App.css'
import NxtWatchContext from './context'

class App extends Component {
  state = {darkMode: false}

  changeMode = () => {
    this.setState(prevstate => ({
      darkMode: !prevstate.darkMode,
    }))
  }

  render() {
    const {darkMode} = this.state
    return (
      <NxtWatchContext.Provider value={{darkMode, changeMode: this.changeMode}}>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/videos/trending" component={Trending} />
          <ProtectedRoute exact path="/videos/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/saved_videos"
            component={SavedVideos}
          />
          <Route component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}
export default App

/* <ProtectedRoute exact path="/products" component={Products} />
      <ProtectedRoute exact path="/cart" component={Cart} />
      
      import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
*/
