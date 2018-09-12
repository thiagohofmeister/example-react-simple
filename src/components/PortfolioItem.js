import React from 'react'

const PortfolioItem = props => {
  return (
      <div className='col-sm-4'>
        <div className='thumbnail'>
          <img src={props.conteudo.image} alt='Paris' width='150' height='150'/>
          <p><strong>{props.conteudo.title}</strong></p>
          <p>{props.conteudo.description}</p>
        </div>
      </div>
  )
}

export default PortfolioItem
