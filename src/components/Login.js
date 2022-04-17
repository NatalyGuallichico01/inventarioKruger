import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.less';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl="http://localhost:3001/usuarios";
const cookies=new Cookies();

export default class Login extends Component {
    state={
        form: {
            email:'',
            password:''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params: {users: this.state.form.email, password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var responseUser=response[0];
                cookies.set('id', responseUser.id, {path: "/"});
                cookies.set('apellido_paterno', responseUser.apellido_paterno, {path: "/"});
                cookies.set('apellido_materno', responseUser.apellido_materno, {path: "/"});
                //cookies.set('nombre', responseUser.nombre, {path: "/"});
                //cookies.set('email', responseUser.nombre, {path: "/"});
                
                //alert(`Bienvenido ${responseUser.nombre} ${responseUser.apellido_paterno}`);
                alert(`Bienvenido ${responseUser.nombre} ${responseUser.apellido_paterno}`);
                window.location.href="./home";
            }
            else{
                alert("Usuario o contraseña incorrectas")
            }
        })
        .catch(error=>{
            console.log(error);
        })
        /*let url=baseUrl + "auth";
        axios.post(url,this.state.form)
        .then(response=>{
            console.log(response);
        })*/
    }

  render() {
    return (
        <div className="containerPrimary">
            <div className="containerSecundary">
                <div className="form-group">
                    <label>Email:</label>
                    <br/>
                    <input type="text" className="form-control" name="email" onChange={this.handleChange}/>
                    <br/>
                    <label>Contraseña:</label>
                    <br/>
                    <input type="password" className="form-control" name="password" onChange={this.handleChange}/> 
                    <br/>
                    <button className="btn btn-primary" onClick={()=>this.iniciarSesion()}>Iniciar Sesión</button>
                </div>
            </div>
             
        </div>
      /*<div>
  <div className="mb-3 required form-group">
    <label for="exampleInputEmail1" className="form-label" >Email: </label>
    <br/>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={this.handleChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 form-group">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={this.handleChange}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={()=>this.iniciarSesion()}>Iniciar Sesión</button>
</div>*/
    )
    
  }
}




