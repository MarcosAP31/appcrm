import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateAccount.css'; // Import your CSS file for styling
import axios from 'axios';
const Edit = ({ isOpen, onClose, onFormSubmit, account }) => {
  const [loadedData, setLoadedData] = useState(false);
  const [accountData, setAccount] = useState({});
  const valueChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { AccountId, Name, Industry, Website, Phone, Address} = accountData;
    // Primero, obtén el nombre de la imagen del accounto que estás a punto de eliminar
    try {

      const dataSend = { AccountId, Name, Industry, Website, Phone, Address};
      console.log(Image)

      // Realizar la solicitud PUT o PATCH a la API para actualizar el registro
      const updateResponse = await fetch(Api + '/accounts/' + AccountId, {
        method: 'PUT',
        headers: {
          'Address-Type': 'application/json',
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
    if (account) {
      setAccount(account);
      axios.get(Api + '/accounts/' + account.AccountId)
        .then((response) => {
          // Handle success
          setLoadedData(true);
          setAccount(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error('Error fetching the record:', error);
          // You can handle the error according to your needs, such as displaying an error message.
        });
    }

    // Realizar la solicitud GET a la API al montar el componente


  }, [account]);

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Account</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={sendData}>

              <div className="form-group">
                <label htmlFor="" className="form-label">ID:</label>
                <input type="text" readOnly
                  className="form-control" value={accountData.AccountId} name="id" id="id" aria-describedby="helpId" placeholder="ID" />
              </div>
              <div className="form-group">
                <label htmlFor="Name" className="form-label">Name:</label>
                <input type="text" name="Name" onChange={valueChange} value={accountData.Name} id="Name" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Industry" className="form-label">Industry:</label>
                <input type="text" name="Industry" value={accountData.Industry} onChange={valueChange} id="Industry" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Website" className="form-label">Website:</label>
                <input type="text" name="Website" value={accountData.Website} onChange={valueChange} id="Website" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Phone" className="form-label">Phone:</label>
                <input type="text" name="Phone" onChange={valueChange} value={accountData.Phone} id="Phone" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Address" className="form-label">Address:</label>
                <input type="text" name="Address" onChange={valueChange} value={accountData.Address} id="Address" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="btn-group" role="group" aria-label="Button group name">
                <button type="submit" className="btn btn-success">Update Account</button>
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
