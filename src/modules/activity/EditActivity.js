import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateActivity.css'; // Import your CSS file for styling
import axios from 'axios';
const Edit = ({ isOpen, onClose, onFormSubmit, activity }) => {
  const [loadedData, setLoadedData] = useState(false);
  const [activityData, setActivity] = useState({});
  const valueChange = (e) => {
    const { name, value } = e.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { ActivityId, ContactId, AccountId, OpportunityId, Type, DateTime, Duration, Description } = activityData;
    // Primero, obtén el nombre de la imagen del activityo que estás a punto de eliminar
    try {

      const dataSend = { ActivityId, ContactId, AccountId, OpportunityId, Type, DateTime, Duration, Description, Image:File?(await handleImageUpload(), Image):imageContactId };
      console.log(Image)

      // Realizar la solicitud PUT o PATCH a la API para actualizar el registro
      const updateResponse = await fetch(Api + '/activities/' + ActivityId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSend),
      });

      if (!updateResponse.ok) {
        throw new Error('No se pudo actualizar el registro');
      }
      
      onFormSubmit(); // Llamamos a la función onFormSubmit para indicar éxito y realizar acciones adicionales
      onClose();
      resetForm();
      // Aquí puedes realizar cualquier acción adicional, como redirigir al usuario o mostrar un mensaje de éxito.
    } catch (error) {
      console.error('Error en la actualización:', error);
      // Puedes manejar el error de acuerdo a tus necesidades, como mostrar un mensaje de error.
    }
  }

  useEffect(() => {
    if (activity) {
      setActivity(activity);
      axios.get(Api + '/activities/' + activity.ActivityId)
        .then((response) => {
          // Handle success
          setLoadedData(true);
          setActivity(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error('Error fetching the record:', error);
          // You can handle the error according to your needs, such as displaying an error message.
        });
    }

    // Realizar la solicitud GET a la API al montar el componente


  }, [activity]);

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Activity</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={sendData}>

              <div className="form-group">
                <label htmlFor="" className="form-label">ID:</label>
                <input type="text" readOnly
                  className="form-control" value={activityData.ActivityId} name="id" id="id" aria-describedby="helpId" placeholder="ID" />
              </div>
              <div className="form-group">
                <label htmlFor="ContactId" className="form-label">ContactId:</label>
                <input type="text" name="ContactId" onChange={valueChange} value={activityData.ContactId} id="ContactId" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="AccountId" className="form-label">AccountId:</label>
                <input type="text" name="AccountId" value={activityData.AccountId} onChange={valueChange} id="AccountId" className="form-control" placeholder="" aria-describedby="helpId" />
                
              </div>
              <div className="form-group">
                <label htmlFor="OpportunityId" className="form-label">OpportunityId:</label>
                <input type="text" name="OpportunityId" onChange={valueChange} value={activityData.OpportunityId} id="OpportunityId" className="form-control" placeholder="" aria-describedby="helpId" />
                
              </div>
              <div className="form-group">
                <label htmlFor="Type" className="form-label">Type:</label>
                <input type="text" name="Type" value={activityData.Type} onChange={valueChange} id="Type" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="DateTime" className="form-label">DateTime:</label>
                <input type="text" name="DateTime" onChange={valueChange} value={activityData.DateTime} id="DateTime" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Duration" className="form-label">Duration:</label>
                <input type="text" name="Duration" onChange={valueChange} value={activityData.Duration} id="Duration" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Description" className="form-label">Description:</label>
                <input type="text" name="Description" onChange={valueChange} value={activityData.Description} id="Description" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="btn-group" role="group" aria-label="Button group name">
                <button type="submit" className="btn btn-success">Update Activity</button>
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
