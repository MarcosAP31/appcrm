import React from 'react';
import { Link } from "react-router-dom";
import Api from "../../services/api";
import CreateUser from './CreateUser'; // Import your UserModal component
import EditUser from './EditUser'; // Import your UserModal component
import axios from 'axios'; // Import Axios

class List extends React.Component {
    state = {
        isModalOpenCreate: false,
        isModalOpenEdit: false,
        selectedUser: null,
    };
    handleFormSubmitCreate = () => {
        // Lógica que deseas ejecutar después de enviar el formulario en CreateUser
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
        // Lógica que deseas ejecutar después de enviar el formulario en CreateUser
        this.loadData(); // Actualizar tus datos o realizar otras acciones aquí
        this.closeModalEdit(); // Cerrar el modal después de enviar el formulario
    };
    openModalEdit = (user) => {
        console.log('openModalEdit called with:', user);
        this.setState({ isModalOpenEdit: true, selectedUser: user });
    }

    closeModalEdit = () => {
        this.setState({ isModalOpenEdit: false });
    };
    constructor(props) {
        super(props);
        this.state = {
            loadedData: false,
            users: []
        }
    }
    deleteRecord = (UserId) => {
        // Use Axios for the DELETE request
        axios.get(Api + '/users/' + UserId)
            .then((response) => {
                const imageName = response.data.Image;

                // Now you can delete the user
                axios.delete(Api + '/users/' + UserId)
                    .then(() => {
                        // User successfully deleted, now delete the image
                        this.deleteImage(imageName);
                        this.updateUserList(UserId);
                    })
                    .catch((error) => {
                        console.error('Error deleting registry:', error);
                        // Handle the error according to your needs (e.g., display an error message).
                    });
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error getting image name:', error);
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
                    throw new Error('Could not delete image');
                }
            })
            .catch(error => {
                console.error('Error deleting image:', error);
                // Maneja el error de eliminar la imagen según tus necesidades
            });
    };
    // Function to update the user list after deletion
    updateUserList = (deletedUserId) => {
        this.setState((prevState) => ({
            users: prevState.users.filter((user) => user.UserId !== deletedUserId),
        }));
    };
    loadData() {
        // Use Axios for the GET request
        axios.get(Api + '/users') // Replaces the Fetch API call
            .then((response) => {
                if (!response.data) {
                    throw new Error('Could not get list of records');
                }
                // Update the state with the data obtained
                this.setState({ loadedData: true, users: response.data });
            })
            .catch((error) => {
                console.error('Error getting list of records:', error);
                // Handle the error according to your needs (e.g., display an error message).
            });
    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        const { loadedData, users, isModalOpenCreate, isModalOpenEdit, selectedUser } = this.state;
        if (!loadedData) { return (<div>Loading...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        <button className="btn btn-success" onClick={this.openModalCreate}>
                            Add new user
                        </button>
                    </div>
                    <div className="card-body">
                        <h4>User List</h4>
                        <div className="table-responsive">
                            <table className="table table-primary">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>LastName</th>
                                        <th>Email</th>
                                        <th>UserName</th>
                                        <th>Password</th>
                                        <th>Role</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(
                                        (user) => (
                                            <tr key={user.UserId}>
                                                <td>{user.UserId}</td>
                                                <td>{user.Name}</td>
                                                <td>{user.LastName}</td>
                                                <td>{user.Email}</td>
                                                <td>{user.UserName}</td>
                                                <td>{user.Password}</td>
                                                <td>{user.Role}</td>
                                                <td><img width="120px" src={`${Api}/images/${user.Image}`} alt="" /></td>
                                                <td><div className="btn-group" role="group" aria-label="Button group name">
                                                    <button className="btn btn-warning" onClick={() => this.openModalEdit(user)}>
                                                        Edit
                                                    </button>

                                                    <button type="button" className="btn btn-danger" onClick={() => this.deleteRecord(user.UserId)}>Delete</button>
                                                </div></td>
                                            </tr>
                                        )
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Render the modal */}
                    <CreateUser isOpen={isModalOpenCreate} onClose={this.closeModalCreate} onFormSubmit={this.handleFormSubmitCreate} />
                    <EditUser isOpen={isModalOpenEdit} onClose={this.closeModalEdit} onFormSubmit={this.handleFormSubmitEdit} user={selectedUser} />
                    <div className="card-footer text-muted">

                    </div>
                </div>

            );
        }

    }
}
export default List;
