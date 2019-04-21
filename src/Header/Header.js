import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../recursos/logo-nav.png'
import lupa from '../recursos/ic-search-copy.png'
import close from '../recursos/ic-close.png'
import './Header.css';


const Header = (props) => {


    let busca = (<><Link to="/" className="navbar-brand" className="center-block" href="#">
        <img src={logo} alt="" />
    </Link><img src={lupa} alt="lupa" onClick={props.showField} /></>)
    
    if (props.mostrar) {
        busca = (
        <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className=""><img src={lupa} alt="lupa"  /></span>
        </div>
        <input type="text" placeholder="Pesquisar" id="search" className="form-control" onChange={(event) => props.executarPesquisa(event)}/>
        <div className="input-group-append">
          <span className=""><img src={close} alt="lupa" onClick={props.showField} /></span>
        </div>
      </div>
      )
    }

    return (

        <nav className="navbar navbar-light bg-light ">


            {busca}
        </nav>
    )
}

export default Header;