import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

import NxtWatchContext from './context'
import videoItemDetails from './components/VideoItemDetails'

class App extends Component {
  state = {darkMode: false, savedVideos: [], saved: false}

  changeMode = () => {
    this.setState(prevstate => ({
      darkMode: !prevstate.darkMode,
    }))
  }

  onSave = videoData => {
    const {savedVideos} = this.state
    const list = savedVideos.filter(each => each.id === videoData.id)
    console.log(list)
    if (list.length === 0) {
      this.setState(prevstate => ({
        savedVideos: [...prevstate.savedVideos, videoData],
        saved: true,
      }))
    } else {
      const newList = savedVideos.filter(each => each.id !== videoData.id)
      this.setState({savedVideos: newList, saved: false})
    }
  }

  render() {
    const {darkMode, savedVideos, saved} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          darkMode,
          savedVideos,
          changeMode: this.changeMode,
          onSave: this.onSave,
          saved,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={videoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
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
