import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from './../firebase-config'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      authenticated: false,
      authenticating: false,
      error: false
    }

    this.email = null
    this.password = null

    this.authenticate = this.authenticate.bind(this)
  }

  authenticate () {
    this.setState({
      authenticating: true,
      error: false
    })
    auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(user => {
        this.setState({
          authenticated: true
        })
      })
      .catch(err => {
        this.setState({
          error: true,
          authenticated: false,
          authenticating: false
        })
      })
  }

  render () {
    if (this.state.authenticated) {
      return <Redirect to='/admin'/>
    }

    return (
        <div style={{padding: '120px'}}>
          <h1>Login</h1>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input type="email" ref={ref => this.email = ref} className="form-control" id="exampleInputEmail1" placeholder="name@email.com"/>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" ref={ref => this.password = ref} className="form-control" id="exampleInputPassword1"/>
            {this.state.error && <small id="emailHelp" className="form-text text-muted">E-mail e/ou Senha inválidos.</small>}
          </div>

          <button type="button" disabled={this.state.authenticating} className="btn btn-primary" onClick={this.authenticate}>Sign in</button>
        </div>
    )
  }
}

export default Login
