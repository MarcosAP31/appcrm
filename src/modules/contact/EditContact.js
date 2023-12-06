import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateContact.css'; // Import your CSS file for styling
import axios from 'axios';
const Edit = ({ isOpen, onClose, onFormSubmit, contact }) => {
  const [loadedData, setLoadedData] = useState(false);
  const [contactData, setContact] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [File, setFile] = useState(null);
  const [Image, setImage] = useState('');
  const valueChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };
  const resetForm = () => {
    setSelectedImage(null);
    setFile(null);
    // Clear the file input value
    const fileInput = document.getElementById('fileInput'); // Add an id to your file input element
    if (fileInput) {
      fileInput.value = '';
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(contact)
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setFile(file);
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
    console.log(file.name)
    setImage(file.name);
  };
  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', File);

      const imageResponse = await fetch(Api + '/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (imageResponse.ok) {
        const responseData = await imageResponse.json();
        setImage(responseData.fileName);
      } else {
        console.error('Error al subir la imagen:', imageResponse.statusText);
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };
  // Función para eliminar la imagen
  const deleteImage = (imageName) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Puedes incluir otros encabezados si es necesario, como token de autenticación
      },
    };
    // Ahora puedes eliminar la imagen usando el id de file
    fetch(Api + '/images/delete/' + imageName, requestOptions)
      .then(response => {
        if (response.status === 200) {
          // Imagen eliminada con éxito

        } else {
          // Manejar errores, por ejemplo:
          throw new Error('No se pudo eliminar la imagen');
        }
      })
      .catch(error => {
        console.error('Error al eliminar la imagen:', error);
        // Maneja el error de eliminar la imagen según tus necesidades
      });
  };
  const sendData = async (e) => {
    e.preventDefault();
    const { ContactId, Name, LastName, Email, Phone, Address, Birthday, JobTitle } = contactData;
    // Primero, obtén el nombre de la imagen del contacto que estás a punto de eliminar
    try {
      // Obtén el nombre de la imagen del contacto que estás a punto de eliminar
      console.log(contact.Image)
      const imageName = contactData.Image;
      
      // Verifica si se ha seleccionado una nueva imagen
      if (File) {
        // Elimina la imagen existente solo si se ha seleccionado una nueva
        await deleteImage(imageName);

        // Subir la nueva imagen después de eliminar la anterior
        await handleImageUpload();
        // Establecer la nueva imagen en el estado
        
      }
      // Resto del código para actualizar el registro

      const dataSend = { ContactId, Name, LastName, Email, Phone, Address, Birthday, JobTitle, Image:File?(await handleImageUpload(), Image):imageName };
      console.log(Image)

      // Realizar la solicitud PUT o PATCH a la API para actualizar el registro
      const updateResponse = await fetch(Api + '/contacts/' + ContactId, {
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
    if (contact) {
      setContact(contact);
      axios.get(Api + '/contacts/' + contact.ContactId)
        .then((response) => {
          // Handle success
          setLoadedData(true);
          setContact(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error('Error fetching the record:', error);
          // You can handle the error according to your needs, such as displaying an error message.
        });
    }

    // Realizar la solicitud GET a la API al montar el componente


  }, [contact]);

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Contact</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={sendData}>

              <div className="form-group">
                <label htmlFor="" className="form-label">ID:</label>
                <input type="text" readOnly
                  className="form-control" value={contactData.ContactId} name="id" id="id" aria-describedby="helpId" placeholder="ID" />
              </div>
              <div className="form-group">
                <label htmlFor="Name" className="form-label">Name:</label>
                <input type="text" name="Name" onChange={valueChange} value={contactData.Name} id="Name" className="form-control" placeholder="" aria-describedby="helpId" />
               
              </div>
              <div className="form-group">
                <label htmlFor="LastName" className="form-label">LastName:</label>
                <input type="text" name="LastName" value={contactData.LastName} onChange={valueChange} id="LastName" className="form-control" placeholder="" aria-describedby="helpId" />
                
              </div>
              <div className="form-group">
                <label htmlFor="Email" className="form-label">Email:</label>
                <input type="text" name="Email" onChange={valueChange} value={contactData.Email} id="Email" className="form-control" placeholder="" aria-describedby="helpId" />
                
              </div>
              <div className="form-group">
                <label htmlFor="Phone" className="form-label">Phone:</label>
                <input type="text" name="Phone" value={contactData.Phone} onChange={valueChange} id="Phone" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Address" className="form-label">Address:</label>
                <input type="text" name="Address" onChange={valueChange} value={contactData.Address} id="Address" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="Birthday" className="form-label">Birthday:</label>
                <input type="text" name="Birthday" onChange={valueChange} value={contactData.Birthday} id="Birthday" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <label htmlFor="JobTitle" className="form-label">JobTitle:</label>
                <input type="text" name="JobTitle" onChange={valueChange} value={contactData.JobTitle} id="JobTitle" className="form-control" placeholder="" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput"/>
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" style={{ maxWidth: '100px' }} value={contactData.Image}/>
                ) : (
                  contactData.Image && (
                    <img src={`${Api}/images/${contactData.Image}`} alt="Contact Image" style={{ maxWidth: '100px' }} value={contactData.Image}/>
                  )
                )}

              </div>
              <br></br>
              <div className="btn-group" role="group" aria-label="Button group name">
                <button type="submit" className="btn btn-success">Update Contact</button>
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
