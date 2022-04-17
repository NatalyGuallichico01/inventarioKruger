import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import krugerLogo from '../images/krugerLogo.jpg';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

const baseUrl = "http://localhost:3001/usuarios";
const cookies = new Cookies();

class Home extends Component {

  state = {
    data: [],
    modalEdit: false,
    form: {
      id: '',
      apellido_paterno: '',
      nombre: '',
      email: '',
      password: '',
      fecha_nacimiento: '',
      direccion: '',
      telefono: '',
      vacunado: '',
      tipo_vacuna: '',
      numero_dosis: '',
      fecha_vacunacion: '',
    }
  }

  peticionGet = () => {
    axios.get(baseUrl).then(response => {
      console.log(response.data)
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPost = async () => {
    delete this.state.form.id;
    await axios.post(baseUrl, this.state.form).then(response => {
      this.peticionGet();
      //this.modalEdit();
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPut=()=>{
    axios.put(baseUrl+this.state.form.id, this.state.form).then(response=>{
      this.modalEdit();
      //this.peticionGet();
    })
  }

  modalEdit = () => {
    this.setState({ modalEdit: !this.state.modalEdit });
  }

  seleccionarUsuario=(usuario) => {
    this.setState({
      form:{
      id:usuario.id,
      nombre:usuario.nombre,
      apellido_paterno:usuario.apellido_paterno,
      cedula:usuario.cedula,
      direccion:usuario.direccion,
      telefono:usuario.telefono,
      vacunado:usuario.vacunado,
      tipo_vacuna:usuario.tipo_vacuna,
      numero_dosis:usuario.numero_dosis,
    }
    });console.log(usuario);
  }

  //captura de datos
  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,//hereda los atributos que existen en el form y no se borren cuando el usuario escriba 
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

  componentDidMount() {//ciclo de vida
    this.peticionGet();
  }


  cerrarSesion = () => {
    cookies.remove('id', { path: "/" });
    cookies.remove('apellido_paterno', { path: "/" });
    window.location.href = './';
  }
  render() {
    console.log('id: ' + cookies.get('id'));
    console.log('apellido_paterno: ' + cookies.get('apellido_paterno'));
    console.log('apellido_materno: ' + cookies.get('apellido_materno'));

    const { form } = this.state;

    return (

      <div>
        <div className="header">
          <ul className="nav justify-content-end">
            <img src={krugerLogo} alt="Logo" />
            <br />
            <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
          </ul>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-6">
              <label>Id:</label>
              <input type="text" name="id" readOnly onChange={this.handleChange} value={this.state.data.length + 1} />
              <br />
              <label>Cédula:</label>
              <input type="ci" name="cedula" onChange={this.handleChange} value={form.cedula} />
              <br />
              <br />
              <label>Nombres:</label>
              <input type="text" name="nombre" onChange={this.handleChange} value={form.nombre} />
              <br />
              <br />
              <label>Apellidos:</label>
              <input type="text" name="apellido_paterno" onChange={this.handleChange} value={form.apellido_paterno} />
              <br />
              <br />
              <label>Correo electrónico:</label>
              <input type="email" name="email" onChange={this.handleChange} value={form.email} />
              <br />
              <br />
              <label>Estado de vacunación: </label>
              <select name="vacunado" onChange={this.handleChange} value={form.vacunado}>
                <option value="vacunado" selected>Vacunado</option>
                <option value="noVacunado"  >No Vacunado</option>
              </select>
              <br />
              <br />
              <br />
              <br />
              <label>Tipo de vacuna: </label>
              <br />
              <label>
                <input type="radio" name="tipo_vacuna" value="sputnik" onChange={this.handleChange} />
                Sputnik
              </label>
              <br />
              <label>
                <input type="radio" name="tipo_vacuna" value="astrazeneca" onChange={this.handleChange} />
                AstraZeneca
              </label>
              <br />
              <label>
                <input type="radio" name="tipo_vacuna" value="pfizer" onChange={this.handleChange} />
                Pfizer
              </label>
              <br />
              <label>
                <input type="radio" name="tipo_vacuna" value="sinovac" onChange={this.handleChange} />
                Sinovac
              </label>
              <br />
              <label>
                <input type="radio" name="tipo_vacuna" value="jhonson" onChange={this.handleChange} />
                Jhonson&Jhonson
              </label>
              <br />
            </div>
            <div className="col-6">
              <label>Fecha de nacimiento:</label>
              <input type="date" name="fecha_nacimiento" onChange={this.handleChange} value={form.fecha_nacimiento} />
              <br />
              <br />
              <label>Dirección de domicilio:</label>
              <input type="text" name="direccion" onChange={this.handleChange} value={form.direccion} />
              <br />
              <br />
              <label>Teléfono móvil:</label>
              <input type="text" name="telefono" onChange={this.handleChange} value={form.telefono} />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <label>Fecha de vacunación:</label>
              <input type="date" name="fecha_vacunacion" onChange={this.handleChange} value={form.fecha_vacunacion} />
              <br />
              <br />
              <label>Número de dosis:</label>
              <input type="text" name="numero_dosis" onChange={this.handleChange} value={form.numero_dosis} />
              <br />
              <br />
              <button className="btn btn-primary" onClick={() => {this.peticionPost()}}>Guardar</button>
            </div>
          </div>

        </div>

        <div className="infoUser">
          <h1>Datos del Empleado</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cédula</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Estado de vacunación</th>
                <th>Tipo de vacuna</th>
                <th>Número de dosis</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(usuario => {
                return (
                  <tr>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido_paterno }</td>
                    <td>{usuario.cedula}</td>
                    <td>{usuario.direccion}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.vacunado}</td>
                    <td>{usuario.tipo_vacuna}</td>
                    <td>{usuario.numero_dosis}</td>
                    
                    <td>
                      <button className="btn btn-primary" onClick={()=>{ this.modalEdit(); this.seleccionarUsuario(usuario)}}><FontAwesomeIcon icon={faEdit} /></button>
                      {"    "}
                      <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                  </tr>

                )
              })}

            </tbody>
          </table>
        </div>

        <div className="modal">
          <Modal isOpen={this.state.modalEdit}>
            <ModalHeader style={{ display: 'block' }}>
              <span style={{ float: 'right' }}>x</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={this.state.data.length+1}/>
                <br />
                <label htmlFor="nombre">Nombre</label>
                <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form.nombre}/>
                <br />
                <label htmlFor="nombre">Apellido</label>
                <input className="form-control" type="text" name="apellido_paterno" id="apellido_paterno" onChange={this.handleChange} value={form.apellido_paterno}/>
                <br />
                <label htmlFor="nombre">Dirección</label>
                <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form.direccion}/>
                <br />
                <label htmlFor="nombre">Telefóno</label>
                <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form.telefono}/>
                <br />
                <label htmlFor="nombre">Estado de vacunación</label>
                <input className="form-control" type="text" name="vacunado" id="" onChange={this.handleChange} value={form.vacunado}/>
                <br />
                <label htmlFor="nombre">Tipo de vacuna</label>
                <input className="form-control" type="text" name="tipo_vacuna" id="vaccineType" onChange={this.handleChange} value={form.tipo_vacuna}/>
                <br />
                <label htmlFor="nombre">Número de dosis</label>
                <input className="form-control" type="text" name="numero_dosis" id="dosesNumber" onChange={this.handleChange} value={form.numero_dosis}/>
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-success" onClick={()=> this.peticionPut}>Actualizar</button>
              <button className="btn btn-danger" onClick={() =>this.modalEdit()}>Cancelar</button>
            </ModalFooter>
          </Modal>
        </div>
        
      </div>
    );
  }
}

export default Home
