import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateNote.css'; // Import your CSS file for styling
import axios from 'axios';
const Edit = ({ isOpen, onClose, onFormSubmit, note }) => {
  const [loadedData, setLoadedData] = useState(false);
  const [noteData, setNote] = useState({});
  const valueChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { NoteId, ContactId, AccountId, OpportunityId, UserId, DateTime, Content} = noteData;
    // Primero, obtén el nombre de la imagen del noteo que estás a punto de eliminar
    try {

      const dataSend = { NoteId, ContactId, AccountId, OpportunityId, UserId, DateTime, Content};
      console.log(Image)

      // Realizar la solicitud PUT o PATCH a la API para actualizar el registro
      const updateResponse = await fetch(Api + '/notes/' + NoteId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
    if (note) {
      setNote(note);
      axios.get(Api + '/notes/' + note.NoteId)
        .then((response) => {
          // Handle success
          setLoadedData(true);
          setNote(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error('Error fetching the record:', error);
          // You can handle the error according to your needs, such as displaying an error message.
        });
    }

    // Realizar la solicitud GET a la API al montar el componente


  }, [note]);

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Note</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={sendData}>

              <div className="form-group">
                <label htmlFor="" className="form-label">ID:</label>
                <input type="text" readOnly
                  className="form-control" value={noteData.NoteId} name="id" id="id" aria-describedby="helpId" placeholder="ID" />
              </div>
              <div className="form-group">
                <label htmlFor="ContactId" className="form-label">ContactId:</label>
                <input type="text" name="ContactId" onChange={valueChange} value={noteData.ContactId} id="ContactId" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="AccountId" className="form-label">AccountId:</label>
                <input type="text" name="AccountId" value={noteData.AccountId} onChange={valueChange} id="AccountId" className="form-control" placeholder="" aria-describedby="helpId" />
                
              </div>
              <div className="form-group">
                <label htmlFor="OpportunityId" className="form-label">OpportunityId:</label>
                <input type="text" name="OpportunityId" onChange={valueChange} value={noteData.OpportunityId} id="OpportunityId" className="form-control" placeholder="" aria-describedby="helpId" />
                
              </div>
              <div className="form-group">
                <label htmlFor="UserId" className="form-label">UserId:</label>
                <input type="text" name="UserId" value={noteData.UserId} onChange={valueChange} id="UserId" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="DateTime" className="form-label">DateTime:</label>
                <input type="text" name="DateTime" onChange={valueChange} value={noteData.DateTime} id="DateTime" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Content" className="form-label">Content:</label>
                <input type="text" name="Content" onChange={valueChange} value={noteData.Content} id="Content" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="btn-group" role="group" aria-label="Button group name">
                <button type="submit" className="btn btn-success">Update Note</button>
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
