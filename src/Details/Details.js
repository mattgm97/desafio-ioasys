import React, { Component } from 'react';
import Header from '../Header/Header'

import './Details.css';


class Details extends Component{

    state = {
        companyInfo: '' ,
        photo: ''
    }
    componentDidMount() {
        
        fetch(`http://empresas.ioasys.com.br/api/v1/enterprises/${this.props.match.params.id}`,  {
            
        headers: JSON.parse(sessionStorage.getItem('acessos'))
            
          })
        .then(res =>  res.json())
        .then(response=>{
            this.setState({companyInfo: response.enterprise.description, photo: `http://empresas.ioasys.com.br${response.enterprise.photo}`})
            
        })
    } 


    render() {

        return(
            <div>
                <Header/>
                <div className="card mb-3" id="infocard">
  <img src={this.state.photo} className="card-img-top mx-auto d-block" alt="..." id="companyPhoto"/>
  <div className="card-body">
    
    <p className="card-text" id="companyDescription">{this.state.companyInfo}</p>
    
  </div>
</div>

            </div>
        )
    }
}

export default Details