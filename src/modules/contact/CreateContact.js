import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateContact.css'; // Import your CSS file for styling
const Create = ({ isOpen, onClose, onFormSubmit }) => {
  const [Name, setName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Address, setAddress] = useState('');
  const [Image, setImage] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [JobTitle, setJobTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [File, setFile] = useState(null);
  const [mistakes, setMistakes] = useState([]);
  const valueChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Name') {
      setName(value);
    } else if (name === 'LastName') {
      setLastName(value);
    } else if (name === 'Email') {
      setEmail(value);
    } else if (name === 'Phone') {
      setPhone(value);
    } else if (name === 'Address') {
      setAddress(value);
    } else if (name === 'Birthday') {
      setBirthday(value);
    } else if (name === 'JobTitle') {
      setJobTitle(value);
    }
    setMistakes([]);
  }
  const checkError = (element) => {
    return mistakes.indexOf(element) !== -1;
  }
  const resetForm = () => {
    setName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setImage('');
    setBirthday('');
    setJobTitle('');
    setSelectedImage(null);
    setFile(null);
    setMistakes([]);
    // Clear the file input value
    const fileInput = document.getElementById('fileInput'); // Add an id to your file input element
    if (fileInput) {
      fileInput.value = '';
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];

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
    // Aquí debes implementar la lógica para subir la imagen a tu API
  };
  const sendData = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado...");
    console.log(Name);
    console.log(LastName);
    var mistakes = [];
    if (!Name) mistakes.push("error_Name");
    if (!LastName) mistakes.push("error_LastName");
    if (!Email) mistakes.push("error_Email");
    if (!Phone) mistakes.push("error_Phone");
    if (!Address) mistakes.push("error_Address");
    if (!Birthday) mistakes.push("error_Birthday");
    if (!JobTitle) mistakes.push("error_JobTitle");
    setMistakes(mistakes);
    if (mistakes.length > 0) return false;
    const dataSend = { Name, LastName, Email, Phone, Address,Birthday,JobTitle, Image };
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


      const formData = new FormData();
      formData.append('file', File);

      const imageResponse = await fetch(Api + '/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (imageResponse.ok) {
        // La imagen se ha subido correctamente
        // Puedes manejar la respuesta del servidor aquí si es necesario
      } else {
        // Manejar errores de la solicitud
      }
      onFormSubmit(); // Llamamos a la función onFormSubmit para indicar éxito y realizar acciones adicionales
      onClose();
      resetForm();
      // Aquí puedes realizar cualquier acción adicional, como actualizar la lista de registros.
      // Si deseas refrescar la lista de registros después de la inserción, puedes hacer otra solicitud GET.
    } catch (error) {
      console.error('Error al insertar el registro o subir la imagen:', error);
      // Puedes manejar el error de acuerdo a tus necesidades (por ejemplo, mostrar un mensaje de error).
    }
  }

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Contacts</h5>
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
                <label htmlFor="LastName" className="form-label">LastName:</label>
                <input type="text" name="LastName" value={LastName} onChange={valueChange} id="LastName" className={((checkError("error_LastName")) ? "is-invalid" : "") + " form-control"} placeholder="LastName" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback ">LastName</small>
              </div>
              <div className="form-group">
                <label htmlFor="Email" className="form-label">Email:</label>
                <input type="text" name="Email" onChange={valueChange} value={Email} id="Email" className={((checkError("error_Email")) ? "is-invalid" : "") + " form-control"} placeholder="Email" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Email</small>
              </div>
              <div className="form-group">
                <label htmlFor="Phone" className="form-label">Phone:</label>
                <input type="text" name="Phone" value={Phone} onChange={valueChange} id="Phone" className={((checkError("error_Phone")) ? "is-invalid" : "") + " form-control"} placeholder="Phone" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback ">Phone</small>
              </div>
              <div className="form-group">
                <label htmlFor="Address" className="form-label">Address:</label>
                <input type="text" name="Address" onChange={valueChange} value={Address} id="Address" className={((checkError("error_Address")) ? "is-invalid" : "") + " form-control"} placeholder="Address" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Address</small>
              </div>
              <div className="form-group">
                <label htmlFor="Birthday" className="form-label">Birthday:</label>
                <input type="text" name="Birthday" onChange={valueChange} value={Birthday} id="Birthday" className={((checkError("error_Birthday")) ? "is-invalid" : "") + " form-control"} placeholder="Birthday" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Birthday</small>
              </div>
              <div className="form-group">
                <label htmlFor="JobTitle" className="form-label">JobTitle:</label>
                <input type="text" name="JobTitle" onChange={valueChange} value={JobTitle} id="JobTitle" className={((checkError("error_JobTitle")) ? "is-invalid" : "") + " form-control"} placeholder="JobTitle" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">JobTitle</small>
              </div>
              <div className="form-group">
                <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput"/>
                {selectedImage && (
                  <img src={selectedImage} alt="Preview" style={{ maxWidth: '100px' }} />
                )}
              </div><br></br>
              <div className="btn-group" role="group" aria-label="Button group name">
                <button type="submit" className="btn btn-success">Add new Contact</button>
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
