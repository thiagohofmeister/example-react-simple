import React, { Component } from 'react'
import config, { storage } from './../firebase-config'

class AdminPortfolio extends Component {
  constructor (props) {
    super(props)

    this.state = {
      saving: false
    }

    this.savePortfolio = this.savePortfolio.bind(this)
  }

  savePortfolio (e) {
    const itemPortfolio = {
      title: this.title.value,
      description: this.description.value,
      image: this.image
    }

    this.setState({ saving: true })

    const file = itemPortfolio.image.files[0]
    const { name, size, type } = file

    const ref = storage.ref(name)
    ref.put(file)
      .then(img => {
        img.ref.getDownloadURL()
          .then(downloadURL => {
            const newPortfolio = {
              title: itemPortfolio.title,
              description: itemPortfolio.description,
              image: downloadURL
            }

            config.push('portfolio', {
              data: newPortfolio
            })

            this.setState({ saving: false })
          })
      })

    e.preventDefault()
  }

  render () {
    if (this.state.saving) {
      return (
          <div className="container">
            <p><span className="glyphicon glyphicon-refresh"/> aguarde...</p>
          </div>
      )
    }
    return (
      <div style={{padding: '120px'}}>
        <h2>Portfolio - Painel Administrativo</h2>

        <form onSubmit={this.savePortfolio}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input className="form-control" id="title" placeholder="Título" ref={(ref) => this.title = ref}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea className="form-control" id="description" rows="3" ref={(ref) => this.description = ref}/>
          </div>
          <div className="form-group">
            <label htmlFor="image">Imagem</label>
            <input type="file" className="form-control-file" id="image" ref={(ref) => this.image = ref}/>
          </div>
          <button type="submit" className="btn btn-primary">Salvar</button>
        </form>
      </div>
    )
  }
}

export default AdminPortfolio
