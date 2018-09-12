import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AdminMenu from './AdminMenu'
import AdminPortfolio from './AdminPortfolio'
import { auth } from './../firebase-config'

class Admin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      authenticated: false,
      authenticating: true,
      user: null
    }
  }

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      this.setState({
        authenticating: false,
        authenticated: !!user,
        user
      })
    })
  }

  render () {
    if (this.state.authenticating) {
      return (
          <div className="container">
            <p>Aguarde...</p>
          </div>
      )
    }
    if (!this.state.authenticated) {
      return <Redirect to='/login'/>
    }
    return (
        <div className='container'>
          <h2>Painel Administrativo</h2>

          <Route path={`/`} component={AdminMenu}/>
          <Route path={`${this.props.match.url}/portfolio`} component={AdminPortfolio}/>
        </div>
    )
  }
}

export default Admin
