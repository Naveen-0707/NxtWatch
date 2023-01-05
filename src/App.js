import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'

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
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}
export default App

/* <ProtectedRoute exact path="/products" component={Products} />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" /> 
      import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
*/
