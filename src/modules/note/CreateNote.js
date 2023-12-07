import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateNote.css'; // Import your CSS file for styling
const Create = ({ isOpen, onClose, onFormSubmit }) => {
  const [ContactId, setContactId] = useState('');
  const [AccountId, setAccountId] = useState('');
  const [OpportunityId, setOpportunityId] = useState('');
  const [UserId, setUserId] = useState('');
  const [DateTime, setDateTime] = useState('');
  const [Content, setContent] = useState('');
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
    } else if (name === 'UserId') {
      setUserId(value);
    } else if (name === 'DateTime') {
      setDateTime(value);
    } else if (name === 'Content') {
        setContent(value);
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
    setUserId('');
    setDateTime('');
    setContent('');
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
    if (!UserId) mistakes.push("error_UserId");
    if (!DateTime) mistakes.push("error_DateTime");
    if (!Content) mistakes.push("error_Content");
    if (!Description) mistakes.push("error_Description");
    setMistakes(mistakes);
    if (mistakes.length > 0) return false;
    const dataSend = { ContactId, AccountId, OpportunityId, UserId, DateTime, Content, Description };
    try {
      // Realizar la solicitud POST a la API para insertar un nuevo registro
      const noteResponse = await fetch(Api + '/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Puedes incluir otros encabezados si es necesario, como token de autenticación
        },
        body: JSON.stringify(dataSend),
      });

      if (!noteResponse.ok) {
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
                <label htmlFor="ContactId" className="form-label">ContactId:</label>
                <input type="text" name="ContactId" onChange={valueChange} value={ContactId} id="ContactId" className={((checkError("error_ContactId")) ? "is-invalid" : "") + " form-control"} placeholder="ContactId" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">ContactId</small>
              </div>
              <div className="form-group">
                <label htmlFor="AccountId" className="form-label">AccountId:</label>
                <input type="text" name="AccountId" value={AccountId} onChange={valueChange} id="AccountId" className={((checkError("error_AccountId")) ? "is-invalid" : "") + " form-control"} placeholder="AccountId" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback ">AccountId</small>
              </div>
              <div className="form-group">
                <label htmlFor="OpportunityId" className="form-label">OpportunityId:</label>
                <input type="text" name="OpportunityId" onChange={valueChange} value={OpportunityId} id="OpportunityId" className={((checkError("error_OpportunityId")) ? "is-invalid" : "") + " form-control"} placeholder="OpportunityId" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">OpportunityId</small>
              </div>
              <div className="form-group">
                <label htmlFor="UserId" className="form-label">UserId:</label>
                <input type="text" name="UserId" value={UserId} onChange={valueChange} id="UserId" className={((checkError("error_UserId")) ? "is-invalid" : "") + " form-control"} placeholder="UserId" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback ">UserId</small>
              </div>
              <div className="form-group">
                <label htmlFor="DateTime" className="form-label">DateTime:</label>
                <input type="text" name="DateTime" onChange={valueChange} value={DateTime} id="DateTime" className={((checkError("error_DateTime")) ? "is-invalid" : "") + " form-control"} placeholder="DateTime" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">DateTime</small>
              </div>
              <div className="form-group">
                <label htmlFor="Content" className="form-label">Content:</label>
                <input type="text" name="Content" onChange={valueChange} value={Content} id="Content" className={((checkError("error_Content")) ? "is-invalid" : "") + " form-control"} placeholder="Content" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Content</small>
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
