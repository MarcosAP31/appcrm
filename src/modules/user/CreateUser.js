import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/api";
import './css/CreateUser.css'; // Import your CSS file for styling
const Create = ({ isOpen, onClose, onFormSubmit }) => {
  const [Name, setName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  const [Image, setImage] = useState('');
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
    } else if (name === 'UserName') {
      setUserName(value);
    } else if (name === 'Password') {
      setPassword(value);
    } else if (name === 'Role') {
      setRole(value);
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
    setUserName('');
    setPassword('');
    setRole('');
    setImage('');
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

  const sendData = async (e) => {
    e.preventDefault();
    console.log("Submitted form...");
    console.log(Name);
    console.log(LastName);
    var mistakes = [];
    if (!Name) mistakes.push("error_Name");
    if (!LastName) mistakes.push("error_LastName");
    if (!Email) mistakes.push("error_Email");
    if (!UserName) mistakes.push("error_UserName");
    if (!Password) mistakes.push("error_Password");
    if (!Role) mistakes.push("error_Role");
    setMistakes(mistakes);
    if (mistakes.length > 0) return false;
    const dataSend = { Name, LastName, Email, UserName, Password, Role, Image };
    try {
      // Realizar la solicitud POST a la API para insertar un nuevo registro
      const createResponse = await fetch(Api + '/users', {
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
      console.error('Error inserting record or uploading image:', error);
      // Puedes manejar el error de acuerdo a tus necesidades (por ejemplo, mostrar un mensaje de error).
    }
  }

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Users</h5>
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
                <label htmlFor="UserName" className="form-label">UserName:</label>
                <input type="text" name="UserName" value={UserName} onChange={valueChange} id="UserName" className={((checkError("error_UserName")) ? "is-invalid" : "") + " form-control"} placeholder="UserName" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback ">UserName</small>
              </div>
              <div className="form-group">
                <label htmlFor="Password" className="form-label">Password:</label>
                <input type="text" name="Password" onChange={valueChange} value={Password} id="Password" className={((checkError("error_Password")) ? "is-invalid" : "") + " form-control"} placeholder="Password" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Password</small>
              </div>
              <div className="form-group">
                <label htmlFor="Role" className="form-label">Role:</label>
                <input type="text" name="Role" onChange={valueChange} value={Role} id="Role" className={((checkError("error_Role")) ? "is-invalid" : "") + " form-control"} placeholder="Role" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Role</small>
              </div>
              <div className="form-group">
                <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput"/>
                {selectedImage && (
                  <img src={selectedImage} alt="Preview" style={{ maxWidth: '100px' }} />
                )}
              </div><br></br>
              <div className="btn-group" role="group" aria-label="Button group name">
                <button type="submit" className="btn btn-success">Add new User</button>
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
