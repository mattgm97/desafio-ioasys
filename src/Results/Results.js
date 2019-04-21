import React from 'react';
import { withRouter } from 'react-router-dom';

import './Results.css';

const Results = (props) => {


  if (!props.dados) {
    return null;
  }




  return (

    <div className="card mb-3 w-75" id="querycards" onClick={() => props.history.push(`/detalhes/${props.dados.id}`)}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={`http://empresas.ioasys.com.br${props.dados.photo}`} className="card-img" alt="..." id="foto" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title" id="titulo">{props.dados.enterprise_name}</h5>
            <h4 className="card-text" id="tipo">{props.dados.enterprise_type.enterprise_type_name}</h4>
            <p className="card-text text-muted" id="pais">{props.dados.country}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default withRouter(Results)