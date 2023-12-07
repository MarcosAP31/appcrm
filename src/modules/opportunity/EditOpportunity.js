import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateOpportunity.css'; // Import your CSS file for styling
import axios from 'axios';
const Edit = ({ isOpen, onClose, onFormSubmit, opportunity }) => {
  const [loadedData, setLoadedData] = useState(false);
  const [opportunityData, setOpportunity] = useState({});
  const valueChange = (e) => {
    const { name, value } = e.target;
    setOpportunity((prevOpportunity) => ({
      ...prevOpportunity,
      [name]: value,
    }));
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { OpportunityId, AccountId, ContactId, Name, Description, Status, CloseDate, Amount, Probability} = opportunityData;
    // Primero, obtén el nombre de la imagen del opportunityo que estás a punto de eliminar
    try {

      const dataSend = { OpportunityId, AccountId, ContactId, Name, Description, Status, CloseDate, Amount, Probability};

      // Realizar la solicitud PUT o PATCH a la API para actualizar el registro
      const updateResponse = await fetch(Api + '/opportunities/' + OpportunityId, {
        method: 'PUT',
        headers: {
          'Status-Type': 'application/json',
        },
        body: JSON.stringify(dataSend),
      });

      if (!updateResponse.ok) {
        throw new Error('Could not update the registry');
      }
      
      onFormSubmit(); // Llamamos a la función onFormSubmit para indicar éxito y realizar acciones adicionales
      onClose();
      resetForm();
      // Aquí puedes realizar cualquier acción adicional, como redirigir al usuario o mostrar un mensaje de éxito.
    } catch (error) {
      console.error('Update error:', error);
      // Puedes manejar el error de acuerdo a tus necesidades, como mostrar un mensaje de error.
    }
  }

  useEffect(() => {
    if (opportunity) {
      setOpportunity(opportunity);
      axios.get(Api + '/opportunities/' + opportunity.OpportunityId)
        .then((response) => {
          // Handle success
          setLoadedData(true);
          setOpportunity(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error('Error fetching the record:', error);
          // You can handle the error according to your needs, such as displaying an error message.
        });
    }

    // Realizar la solicitud GET a la API al montar el componente


  }, [opportunity]);

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Opportunity</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={sendData}>

              <div className="form-group">
                <label htmlFor="" className="form-label">ID:</label>
                <input type="text" readOnly
                  className="form-control" value={opportunityData.OpportunityId} name="id" id="id" aria-describedby="helpId" placeholder="ID" />
              </div>
              <div className="form-group">
                <label htmlFor="AccountId" className="form-label">AccountId:</label>
                <input type="text" name="AccountId" value={opportunityData.AccountId} onChange={valueChange} id="AccountId" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="ContactId" className="form-label">ContactId:</label>
                <input type="text" name="ContactId" onChange={valueChange} value={opportunityData.ContactId} id="ContactId" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Name" className="form-label">Name:</label>
                <input type="text" name="Name" onChange={valueChange} value={opportunityData.Name} id="Name" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Description" className="form-label">Description:</label>
                <input type="text" name="Description" value={opportunityData.Description} onChange={valueChange} id="Description" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Status" className="form-label">Status:</label>
                <input type="text" name="Status" onChange={valueChange} value={opportunityData.Status} id="Status" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="CloseDate" className="form-label">CloseDate:</label>
                <input type="text" name="CloseDate" onChange={valueChange} value={opportunityData.CloseDate} id="CloseDate" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Amount" className="form-label">Amount:</label>
                <input type="text" name="Amount" onChange={valueChange} value={opportunityData.Amount} id="Amount" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Probability" className="form-label">Probability:</label>
                <input type="text" name="Probability" onChange={valueChange} value={opportunityData.Probability} id="Probability" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="btn-group" role="group" aria-label="Button group name">
                <button type="submit" className="btn btn-success">Update Opportunity</button>
                <button type="button" className="btn btn-primary" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
