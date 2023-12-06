import React from 'react';
import { Link } from "react-router-dom";
import Api from "../../services/api";
import CreateContact from './CreateContact'; // Import your ContactModal component
import EditContact from './EditContact'; // Import your ContactModal component
import axios from 'axios'; // Import Axios

class List extends React.Component {
    state = {
        isModalOpenCreate: false,
        isModalOpenEdit: false,
        selectedContact: null,
    };
    handleFormSubmitCreate = () => {
        // Lógica que deseas ejecutar después de enviar el formulario en CreateContact
        this.loadData(); // Actualizar tus datos o realizar otras acciones aquí
        this.closeModalCreate(); // Cerrar el modal después de enviar el formulario
    };
    openModalCreate = () => {
        this.setState({ isModalOpenCreate: true });
    };

    closeModalCreate = () => {
        this.setState({ isModalOpenCreate: false });
    };
    handleFormSubmitEdit = () => {
        // Lógica que deseas ejecutar después de enviar el formulario en CreateContact
        this.loadData(); // Actualizar tus datos o realizar otras acciones aquí
        this.closeModalEdit(); // Cerrar el modal después de enviar el formulario
    };
    openModalEdit = (contact) => {
        console.log('openModalEdit called with:', contact);
        this.setState({ isModalOpenEdit: true, selectedContact: contact });
    }

    closeModalEdit = () => {
        this.setState({ isModalOpenEdit: false });
    };
    constructor(props) {
        super(props);
        this.state = {
            loadedData: false,
            contacts: []
        }
    }
    deleteRecord = (ContactId) => {
        // Use Axios for the DELETE request
        axios.get(Api + '/contacts/' + ContactId)
            .then((response) => {
                const imageName = response.data.Image;

                // Now you can delete the contact
                axios.delete(Api + '/contacts/' + ContactId)
                    .then(() => {
                        // Contact successfully deleted, now delete the image
                        this.deleteImage(imageName);
                        this.updateContactList(ContactId);
                    })
                    .catch((error) => {
                        console.error('Error al eliminar el registro:', error);
                        // Handle the error according to your needs (e.g., display an error message).
                    });
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error al obtener el nombre de la imagen:', error);
                // Handle the error of obtaining the image name according to your needs.
            });
    };
    // Función para eliminar la imagen
    deleteImage = (imageName) => {
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
    // Function to update the contact list after deletion
    updateContactList = (deletedContactId) => {
        this.setState((prevState) => ({
            contacts: prevState.contacts.filter((contact) => contact.ContactId !== deletedContactId),
        }));
    };
    loadData() {
        // Use Axios for the GET request
        axios.get(Api + '/contacts') // Replaces the Fetch API call
            .then((response) => {
                if (!response.data) {
                    throw new Error('No se pudo obtener la lista de registros');
                }
                // Update the state with the data obtained
                this.setState({ loadedData: true, contacts: response.data });
            })
            .catch((error) => {
                console.error('Error al obtener la lista de registros:', error);
                // Handle the error according to your needs (e.g., display an error message).
            });
    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        const { loadedData, contacts, isModalOpenCreate, isModalOpenEdit, selectedContact } = this.state;
        if (!loadedData) { return (<div>Cargando...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        <button className="btn btn-success" onClick={this.openModalCreate}>
                            Add new contact
                        </button>
                    </div>
                    <div className="card-body">
                        <h4>Contact List</h4>
                        <div className="table-responsive">
                            <table className="table table-primary">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>LastName</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Direction</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map(
                                        (contact) => (
                                            <tr key={contact.ContactId}>
                                                <td>{contact.ContactId}</td>
                                                <td>{contact.Name}</td>
                                                <td>{contact.LastName}</td>
                                                <td>{contact.Email}</td>
                                                <td>{contact.Phone}</td>
                                                <td>{contact.Address}</td>
                                                <td><img width="120px" src={`${Api}/images/${contact.Image}`} alt="" /></td>
                                                <td><div className="btn-group" role="group" aria-label="Button group name">
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => this.openModalEdit(contact)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button type="button" className="btn btn-danger" onClick={() => this.deleteRecord(contact.ContactId)}>Delete</button>
                                                </div></td>
                                            </tr>
                                        )
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Render the modal */}
                    <CreateContact isOpen={isModalOpenCreate} onClose={this.closeModalCreate} onFormSubmit={this.handleFormSubmitCreate} />
                    <EditContact isOpen={isModalOpenEdit} onClose={this.closeModalEdit} onFormSubmit={this.handleFormSubmitEdit} contact={selectedContact} />
                    <div className="card-footer text-muted">

                    </div>
                </div>

            );
        }

    }
}
export default List;
