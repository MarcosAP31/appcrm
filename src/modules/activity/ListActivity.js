import React from 'react';
import { Link } from "react-router-dom";
import Api from "../../services/api";
import CreateActivity from './CreateActivity'; // Import your ActivityModal component
import EditActivity from './EditActivity'; // Import your ActivityModal component
import axios from 'axios'; // Import Axios

class List extends React.Component {
    state = {
        isModalOpenCreate: false,
        isModalOpenEdit: false,
        selectedActivity: null,
    };
    handleFormSubmitCreate = () => {
        // Lógica que deseas ejecutar después de enviar el formulario en CreateActivity
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
        // Lógica que deseas ejecutar después de enviar el formulario en CreateActivity
        this.loadData(); // Actualizar tus datos o realizar otras acciones aquí
        this.closeModalEdit(); // Cerrar el modal después de enviar el formulario
    };
    openModalEdit = (activity) => {
        console.log('openModalEdit called with:', activity);
        this.setState({ isModalOpenEdit: true, selectedActivity: activity });
    }

    closeModalEdit = () => {
        this.setState({ isModalOpenEdit: false });
    };
    constructor(props) {
        super(props);
        this.state = {
            loadedData: false,
            activities: []
        }
    }
    deleteRecord = (ActivityId) => {
        // Use Axios for the DELETE request
        axios.get(Api + '/activities/' + ActivityId)
            .then((response) => {
                // Now you can delete the activity
                axios.delete(Api + '/activities/' + ActivityId)
                    .then(() => {
                        // Activity successfully deleted, now delete the image
                        this.updateActivityList(ActivityId);
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

    // Function to update the activity list after deletion
    updateActivityList = (deletedActivityId) => {
        this.setState((prevState) => ({
            activities: prevState.activities.filter((activity) => activity.ActivityId !== deletedActivityId),
        }));
    };
    loadData() {
        // Use Axios for the GET request
        axios.get(Api + '/activities') // Replaces the Fetch API call
            .then((response) => {
                if (!response.data) {
                    throw new Error('Could not get list of records');
                }
                // Update the state with the data obtained
                this.setState({ loadedData: true, activities: response.data });
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
        const { loadedData, activities, isModalOpenCreate, isModalOpenEdit, selectedActivity } = this.state;
        if (!loadedData) { return (<div>Cargando...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        <button className="btn btn-success" onClick={this.openModalCreate}>
                            Add new activity
                        </button>
                    </div>
                    <div className="card-body">
                        <h4>Activity List</h4>
                        <div className="table-responsive">
                            <table className="table table-primary">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>ContactId</th>
                                        <th>AccountId</th>
                                        <th>OpportunityId</th>
                                        <th>Type</th>
                                        <th>Direction</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activities.map(
                                        (activity) => (
                                            <tr key={activity.ActivityId}>
                                                <td>{activity.ActivityId}</td>
                                                <td>{activity.ContactId}</td>
                                                <td>{activity.AccountId}</td>
                                                <td>{activity.OpportunityId}</td>
                                                <td>{activity.Type}</td>
                                                <td>{activity.DateTime}</td>
                                                <td><img width="120px" src={`${Api}/images/${activity.Image}`} alt="" /></td>
                                                <td><div className="btn-group" role="group" aria-label="Button group name">
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => this.openModalEdit(activity)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button type="button" className="btn btn-danger" onClick={() => this.deleteRecord(activity.ActivityId)}>Delete</button>
                                                </div></td>
                                            </tr>
                                        )
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Render the modal */}
                    <CreateActivity isOpen={isModalOpenCreate} onClose={this.closeModalCreate} onFormSubmit={this.handleFormSubmitCreate} />
                    <EditActivity isOpen={isModalOpenEdit} onClose={this.closeModalEdit} onFormSubmit={this.handleFormSubmitEdit} activity={selectedActivity} />
                    <div className="card-footer text-muted">

                    </div>
                </div>

            );
        }

    }
}
export default List;
