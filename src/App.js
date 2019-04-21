import React, { Component } from 'react';
import logo from './recursos/logo-home.png'
import Header from './Header/Header'
import Results from './Results/Results'

import './App.css';

class App extends Component {
  state = {
    loading: false,
    logged: false,
    access: {},
    showInput: false,
    companieShow: false,
    errodeLogin: false,
    company: {}
  }

  handleLogin = (event) => {
    event.preventDefault();
    const email = (this.refs.email).value;
    const senha = (this.refs.senha).value;

    fetch('http://empresas.ioasys.com.br/api/v1/users/auth/sign_in', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: senha
      })
    })
      .then(res => {

        let values = []
        for (let entry of res.headers.entries()) {

          values.push(entry[1]);
        }

        //console.log(values)
        this.setState({
          access: {
            "access-token": values[0],
            client: values[2],
            uid: values[6]
          }
        });
        sessionStorage.setItem('acessos', JSON.stringify({
          "access-token": values[0],
          client: values[2],
          uid: values[6]
        }));
        //console.log(this.state.access)
        return res.json()
      })
      .then(response => {
        //console.log(response)
        this.setState({ logged: true })
      })
      .catch(err => {
        this.setState({ errodeLogin: true })
        console.log("Erro de autentificação ou problema na rede, por favor tentar novamente mais tarde")
      }
      )

  }


  showField = () => {
    let newstate = !this.state.showInput;
    this.setState({ showInput: newstate, companieShow: false, company: {} });
  }


  showCompanies = (event) => {
    let searchText = event.target.value;
    // console.log(
    //   this.state.access
    //   )
    fetch(`http://empresas.ioasys.com.br/api/v1/enterprises?name=${searchText}`,
      {
        headers: this.state.access

      })
      .then(res => res.json())
      .then(result => {
        // console.log(result)
        this.setState({
          companieShow: true,
          company: result
        });
      }
      )

  }

  render() {


    if (this.state.errodeLogin) {
      return <h1>Erro de autentificação ou problema na rede, por favor tentar novamente mais tarde.</h1>
    }

    if (!this.state.logged) {
      return (
        <div className="App">
          <div className="login-screen">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-sm-4 align-self-center offset-sm-4">
                  <img src={logo} alt="logo" />
                  <h2 className="welcome">BEM-VINDO AO EMPRESAS</h2>
                  <p className="lorem-ipsum">Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.</p>
                  <form onSubmit={(event) => this.handleLogin(event)}>
                    <div className="form-group">

                      <input type="email" className="" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail" ref="email" />

                    </div>
                    <div className="form-group">

                      <input type="password" className="" id="exampleInputPassword1" placeholder="Senha" ref="senha" />
                    </div>

                    <button type="submit" id="login-buttom" className="btn btn-primary" >Entrar</button>
                  </form>
                  {this.state.loading ? <h3>Carregando...</h3> : null}

                </div>
              </div>
            </div>
          </div>
        </div>

      )
    }


    let Empresas = null;
    if (this.state.companieShow) {
      //console.log(this.state.company.enterprises)
      Empresas = (
        <div>
          {this.state.company.enterprises.map((enterprise, index) => {
            return <Results dados={enterprise} key={index} />
          })}
        </div>

        // 
      )

    }

    return (
      <div className="App">
        <Header showField={this.showField} mostrar={this.state.showInput} executarPesquisa={this.showCompanies} />
        {!this.state.showInput ? <h2 className="text-center" id="pesquisa">Clique na busca para iniciar.</h2> : null}
        {Empresas}
      </div>


    );
  }
}

export default App;
