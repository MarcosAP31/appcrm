import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateNote.css'; // Import your CSS file for styling
const Create = ({ isOpen, onClose, onFormSubmit }) => {
  const [Name, setName] = useState('');
  const [Industry, setIndustry] = useState('');
  const [Website, setWebsite] = useState('');
  const [Phone, setPhone] = useState('');
  const [Address, setAddress] = useState('');
  const [mistakes, setMistakes] = useState([]);
  const valueChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Name') {
      setName(value);
    } else if (name === 'Industry') {
      setIndustry(value);
    } else if (name === 'Website') {
      setWebsite(value);
    } else if (name === 'Phone') {
      setPhone(value);
    } else if (name === 'Address') {
        setAddress(value);
    } 
    setMistakes([]);
  }
  const checkError = (element) => {
    return mistakes.indexOf(element) !== -1;
  }
  const resetForm = () => {
    setName('');
    setIndustry('');
    setWebsite('');
    setPhone('');
    setAddress('');
    setMistakes([]);
    
  };
  
  const sendData = async (e) => {
    e.preventDefault();
    console.log("Submitted form...");
    console.log(Name);
    var mistakes = [];
    if (!Name) mistakes.push("error_Name");
    if (!Industry) mistakes.push("error_Industry");
    if (!Website) mistakes.push("error_Website");
    if (!Phone) mistakes.push("error_Phone");
    if (!Address) mistakes.push("error_Address");
    setMistakes(mistakes);
    if (mistakes.length > 0) return false;
    const dataSend = { Name, Industry, Website, Phone, Address};
    try {
      // Realizar la solicitud POST a la API para insertar un nuevo registro
      const createResponse = await fetch(Api + '/notes', {
        method: 'POST',
        headers: {
          'Address-Type': 'application/json',
          // Puedes incluir otros encabezados si es necesario, como token de autenticación
        },
        body: JSON.stringify(dataSend),
      });

      if (!createResponse.ok) {
        throw new Error('Could not insert record');
      }
      onFormSubmit(); // Llamamos a la función onFormSubmit para indicar éxito y realizar acciones adicionales
      onClose();
      resetForm();
      // Aquí puedes realizar cualquier acción adicional, como actualizar la lista de registros.
      // Si deseas refrescar la lista de registros después de la inserción, puedes hacer otra solicitud GET.
    } catch (error) {
      console.error('Error inserting record:', error);
      // Puedes manejar el error de acuerdo a tus necesidades (por ejemplo, mostrar un mensaje de error).
    }
  }

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Notes</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={sendData}>
              <div className="form-group">
                <label htmlFor="Name" className="form-label">Name:</label>
                <input type="text" name="Name" onChange={valueChange} value={Name} id="Name" className={((checkError("error_Name")) ? "is-invalid" : "") + " form-control"} placeholder="Name" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Name</small>
              </div>
              <div className="form-group">
                <label htmlFor="Industry" className="form-label">Industry:</label>
                <input type="text" name="Industry" onChange={valueChange} value={Industry} id="Industry" className={((checkError("error_Industry")) ? "is-invalid" : "") + " form-control"} placeholder="Industry" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Industry</small>
              </div>
              <div className="form-group">
                <label htmlFor="Website" className="form-label">Website:</label>
                <input type="text" name="Website" value={Website} onChange={valueChange} id="Website" className={((checkError("error_Website")) ? "is-invalid" : "") + " form-control"} placeholder="Website" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback ">Website</small>
              </div>
              <div className="form-group">
                <label htmlFor="Phone" className="form-label">Phone:</label>
                <input type="text" name="Phone" onChange={valueChange} value={Phone} id="Phone" className={((checkError("error_Phone")) ? "is-invalid" : "") + " form-control"} placeholder="Phone" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Phone</small>
              </div>
              <div className="form-group">
                <label htmlFor="Address" className="form-label">Address:</label>
                <input type="text" name="Address" onChange={valueChange} value={Address} id="Address" className={((checkError("error_Address")) ? "is-invalid" : "") + " form-control"} placeholder="Address" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Address</small>
              </div>
              <div className="btn-group" role="group" aria-label="Button group name">
                <button type="submit" className="btn btn-success">Add new Note</button>
                <button type="button" className="btn btn-primary" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Create;
