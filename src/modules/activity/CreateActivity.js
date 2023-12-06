import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateActivity.css'; // Import your CSS file for styling
const Create = ({ isOpen, onClose, onFormSubmit }) => {
  const [ContactId, setContactId] = useState('');
  const [AccountId, setAccountId] = useState('');
  const [OpportunityId, setOpportunityId] = useState('');
  const [Type, setType] = useState('');
  const [DateTime, setDateTime] = useState('');
  const [Duration, setDuration] = useState('');
  const [Description, setDescription] = useState('');
  const [mistakes, setMistakes] = useState([]);
  const valueChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ContactId') {
      setContactId(value);
    } else if (name === 'AccountId') {
      setAccountId(value);
    } else if (name === 'OpportunityId') {
      setOpportunityId(value);
    } else if (name === 'Type') {
      setType(value);
    } else if (name === 'DateTime') {
      setDateTime(value);
    } else if (name === 'Duration') {
        setDuration(value);
    } else if (name === 'Description') {
      setDescription(value);
    }
    setMistakes([]);
  }
  const checkError = (element) => {
    return mistakes.indexOf(element) !== -1;
  }
  const resetForm = () => {
    setContactId('');
    setAccountId('');
    setOpportunityId('');
    setType('');
    setDateTime('');
    setDuration('');
    setDescription('');
    setMistakes([]);
    
  };
  
  const sendData = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado...");
    console.log(ContactId);
    console.log(AccountId);
    var mistakes = [];
    if (!ContactId) mistakes.push("error_ContactId");
    if (!AccountId) mistakes.push("error_AccountId");
    if (!OpportunityId) mistakes.push("error_OpportunityId");
    if (!Type) mistakes.push("error_Type");
    if (!DateTime) mistakes.push("error_DateTime");
    if (!Duration) mistakes.push("error_Duration");
    if (!Description) mistakes.push("error_Description");
    setMistakes(mistakes);
    if (mistakes.length > 0) return false;
    const dataSend = { ContactId, AccountId, OpportunityId, Type, DateTime, Duration, Description };
    try {
      // Realizar la solicitud POST a la API para insertar un nuevo registro
      const productResponse = await fetch(Api + '/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Puedes incluir otros encabezados si es necesario, como token de autenticación
        },
        body: JSON.stringify(dataSend),
      });

      if (!productResponse.ok) {
        throw new Error('No se pudo insertar el registro');
      }
      onFormSubmit(); // Llamamos a la función onFormSubmit para indicar éxito y realizar acciones adicionales
      onClose();
      resetForm();
      // Aquí puedes realizar cualquier acción adicional, como actualizar la lista de registros.
      // Si deseas refrescar la lista de registros después de la inserción, puedes hacer otra solicitud GET.
    } catch (error) {
      console.error('Error al insertar el registro:', error);
      // Puedes manejar el error de acuerdo a tus necesidades (por ejemplo, mostrar un mensaje de error).
    }
  }

  return (
    <div classContactId={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div classContactId="modal-dialog">
        <div classContactId="modal-overlay" onClick={onClose}></div>
        <div classContactId="modal-content">
          <div classContactId="modal-header">
            <h5 classContactId="modal-title">Activities</h5>
            <button type="button" classContactId="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div classContactId="modal-body">
            <form onSubmit={sendData}>
              <div classContactId="form-group">
                <label htmlFor="ContactId" classContactId="form-label">ContactId:</label>
                <input type="text" name="ContactId" onChange={valueChange} value={ContactId} id="ContactId" classContactId={((checkError("error_ContactId")) ? "is-invalid" : "") + " form-control"} placeholder="ContactId" aria-describedby="helpId" />
                <small id="helpId" classContactId="invalid-feedback">ContactId</small>
              </div>
              <div classContactId="form-group">
                <label htmlFor="AccountId" classContactId="form-label">AccountId:</label>
                <input type="text" name="AccountId" value={AccountId} onChange={valueChange} id="AccountId" classContactId={((checkError("error_AccountId")) ? "is-invalid" : "") + " form-control"} placeholder="AccountId" aria-describedby="helpId" />
                <small id="helpId" classContactId="invalid-feedback ">AccountId</small>
              </div>
              <div classContactId="form-group">
                <label htmlFor="OpportunityId" classContactId="form-label">OpportunityId:</label>
                <input type="text" name="OpportunityId" onChange={valueChange} value={OpportunityId} id="OpportunityId" classContactId={((checkError("error_OpportunityId")) ? "is-invalid" : "") + " form-control"} placeholder="OpportunityId" aria-describedby="helpId" />
                <small id="helpId" classContactId="invalid-feedback">OpportunityId</small>
              </div>
              <div classContactId="form-group">
                <label htmlFor="Type" classContactId="form-label">Type:</label>
                <input type="text" name="Type" value={Type} onChange={valueChange} id="Type" classContactId={((checkError("error_Type")) ? "is-invalid" : "") + " form-control"} placeholder="Type" aria-describedby="helpId" />
                <small id="helpId" classContactId="invalid-feedback ">Type</small>
              </div>
              <div classContactId="form-group">
                <label htmlFor="DateTime" classContactId="form-label">DateTime:</label>
                <input type="text" name="DateTime" onChange={valueChange} value={DateTime} id="DateTime" classContactId={((checkError("error_DateTime")) ? "is-invalid" : "") + " form-control"} placeholder="DateTime" aria-describedby="helpId" />
                <small id="helpId" classContactId="invalid-feedback">DateTime</small>
              </div>
              <div classContactId="form-group">
                <label htmlFor="DateTime" classContactId="form-label">Duration:</label>
                <input type="text" name="DateTime" onChange={valueChange} value={DateTime} id="Duration" classContactId={((checkError("error_Duration")) ? "is-invalid" : "") + " form-control"} placeholder="DateTime" aria-describedby="helpId" />
                <small id="helpId" classContactId="invalid-feedback">Duration</small>
              </div>
              <div classContactId="form-group">
                <label htmlFor="Description" classContactId="form-label">Description:</label>
                <input type="text" name="Description" onChange={valueChange} value={Description} id="Description" classContactId={((checkError("error_Description")) ? "is-invalid" : "") + " form-control"} placeholder="Description" aria-describedby="helpId" />
                <small id="helpId" classContactId="invalid-feedback">Description</small>
              </div>
              <div classContactId="btn-group" role="group" aria-label="Button group name">
                <button type="submit" classContactId="btn btn-success">Add new Activity</button>
                <button type="button" classContactId="btn btn-primary" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Create;
