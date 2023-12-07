import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateProbability.css'; // Import your CSS file for styling
const Create = ({ isOpen, onClose, onFormSubmit }) => {
  const [AccountId, setAccountId] = useState('');
  const [ContactId, setContactId] = useState('');
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Status, setStatus] = useState('');
  const [CloseDate, setCloseDate] = useState('');
  const [Amount, setAmount] = useState('');
  const [Probability, setProbability] = useState('');
  const [mistakes, setMistakes] = useState([]);
  const valueChange = (e) => {
    const { name, value } = e.target;
    if (name === 'AccountId') {
      setAccountId(value);
    } else if (name === 'ContactId') {
      setContactId(value);
    } else if (name === 'Name') {
      setName(value);
    } else if (name === 'Description') {
      setDescription(value);
    } else if (name === 'Status') {
        setStatus(value);
    } else if (name === 'CloseDate') {
        setCloseDate(value);
    } else if (name === 'Amount') {
        setAmount(value);
    } else if (name === 'Probability') {
        setProbability(value);
    }
    setMistakes([]);
  }
  const checkError = (element) => {
    return mistakes.indexOf(element) !== -1;
  }
  const resetForm = () => {
    setAccountId('');
    setContactId('');
    setName('');
    setDescription('');
    setStatus('');
    setCloseDate('');
    setAmount('');
    setProbability('');
    setMistakes([]);
    
  };
  
  const sendData = async (e) => {
    e.preventDefault();
    console.log("Submitted form...");
    console.log(AccountId);
    var mistakes = [];
    if (!AccountId) mistakes.push("error_AccountId");
    if (!ContactId) mistakes.push("error_ContactId");
    if (!Name) mistakes.push("error_Name");
    if (!Description) mistakes.push("error_Description");
    if (!Status) mistakes.push("error_Status");
    if (!CloseDate) mistakes.push("error_CloseDate");
    if (!Amount) mistakes.push("error_Amount");
    if (!Probability) mistakes.push("error_Probability");
    setMistakes(mistakes);
    if (mistakes.length > 0) return false;
    const dataSend = { AccountId, ContactId, Name, Description, Status, CloseDate, Amount, Probability};
    try {
      // Realizar la solicitud POST a la API para insertar un nuevo registro
      const createResponse = await fetch(Api + '/opportunitiess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
            <h5 className="modal-title">Opportunities</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={sendData}>
              <div className="form-group">
                <label htmlFor="AccountId" className="form-label">AccountId:</label>
                <input type="text" name="AccountId" onChange={valueChange} value={AccountId} id="AccountId" className={((checkError("error_AccountId")) ? "is-invalid" : "") + " form-control"} placeholder="AccountId" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">AccountId</small>
              </div>
              <div className="form-group">
                <label htmlFor="ContactId" className="form-label">ContactId:</label>
                <input type="text" name="ContactId" onChange={valueChange} value={ContactId} id="ContactId" className={((checkError("error_ContactId")) ? "is-invalid" : "") + " form-control"} placeholder="ContactId" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">ContactId</small>
              </div>
              <div className="form-group">
                <label htmlFor="Name" className="form-label">Name:</label>
                <input type="text" name="Name" value={Name} onChange={valueChange} id="Name" className={((checkError("error_Name")) ? "is-invalid" : "") + " form-control"} placeholder="Name" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback ">Name</small>
              </div>
              <div className="form-group">
                <label htmlFor="Description" className="form-label">Description:</label>
                <input type="text" name="Description" onChange={valueChange} value={Description} id="Description" className={((checkError("error_Description")) ? "is-invalid" : "") + " form-control"} placeholder="Description" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Description</small>
              </div>
              <div className="form-group">
                <label htmlFor="Status" className="form-label">Status:</label>
                <input type="text" name="Status" onChange={valueChange} value={Status} id="Status" className={((checkError("error_Status")) ? "is-invalid" : "") + " form-control"} placeholder="Status" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Status</small>
              </div>
              <div className="form-group">
                <label htmlFor="CloseDate" className="form-label">CloseDate:</label>
                <input type="text" name="Status" onChange={valueChange} value={CloseDate} id="CloseDate" className={((checkError("error_CloseDate")) ? "is-invalid" : "") + " form-control"} placeholder="CloseDate" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">CloseDate</small>
              </div>
              <div className="form-group">
                <label htmlFor="Amount" className="form-label">Amount:</label>
                <input type="text" name="Amount" onChange={valueChange} value={Amount} id="Amount" className={((checkError("error_Amount")) ? "is-invalid" : "") + " form-control"} placeholder="Amount" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Amount</small>
              </div>
              <div className="form-group">
                <label htmlFor="Probability" className="form-label">Probability:</label>
                <input type="text" name="Probability" onChange={valueChange} value={Probability} id="Probability" className={((checkError("error_Probability")) ? "is-invalid" : "") + " form-control"} placeholder="Probability" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Probability</small>
              </div>
              <div className="btn-group" role="group" aria-label="Button group name">
                <button type="submit" className="btn btn-success">Add new Probability</button>
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
