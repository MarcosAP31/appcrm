import React from 'react';
import { Link } from "react-router-dom";
import Api from "../../services/api";
import CreateOpportunity from './CreateOpportunity'; // Import your OpportunityModal component
import EditOpportunity from './EditOpportunity'; // Import your OpportunityModal component
import axios from 'axios'; // Import Axios

class List extends React.Component {
    state = {
        isModalOpenCreate: false,
        isModalOpenEdit: false,
        selectedOpportunity: null,
    };
    handleFormSubmitCreate = () => {
        // Lógica que deseas ejecutar después de enviar el formulario en CreateOpportunity
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
        // Lógica que deseas ejecutar después de enviar el formulario en CreateOpportunity
        this.loadData(); // Actualizar tus datos o realizar otras acciones aquí
        this.closeModalEdit(); // Cerrar el modal después de enviar el formulario
    };
    openModalEdit = (opportunity) => {
        console.log('openModalEdit called with:', opportunity);
        this.setState({ isModalOpenEdit: true, selectedOpportunity: opportunity });
    }

    closeModalEdit = () => {
        this.setState({ isModalOpenEdit: false });
    };
    constructor(props) {
        super(props);
        this.state = {
            loadedData: false,
            opportunities: []
        }
    }
    deleteRecord = (OpportunityId) => {
        // Use Axios for the DELETE request
        axios.delete(Api + '/opportunities/' + OpportunityId)
            .then(() => {
                // Opportunity successfully deleted, now delete the image
                this.updateOpportunityList(OpportunityId);
            })
            .catch((error) => {
                console.error('Error deleting registry:', error);
                // Handle the error according to your needs (e.g., display an error message).
            });
        window.location.reload();

    };

    // Function to update the opportunity list after deletion
    updateOpportunityList = (deletedOpportunityId) => {
        this.setState((prevState) => ({
            opportunities: prevState.opportunities.filter((opportunity) => opportunity.OpportunityId !== deletedOpportunityId),
        }));
    };
    loadData() {
        // Use Axios for the GET request
        axios.get(Api + '/opportunities') // Replaces the Fetch API call
            .then((response) => {
                if (!response.data) {
                    throw new Error('Could not get list of records');
                }
                // Update the state with the data obtained
                this.setState({ loadedData: true, opportunities: response.data });
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
        const { loadedData, opportunities, isModalOpenCreate, isModalOpenEdit, selectedOpportunity } = this.state;
        if (!loadedData) { return (<div>Loading...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        <button className="btn btn-success" onClick={this.openModalCreate}>
                            Add new opportunity
                        </button>
                    </div>
                    <div className="card-body">
                        <h4>Opportunity List</h4>
                        <div className="table-responsive">
                            <table className="table table-primary">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>AccountId</th>
                                        <th>ContactId</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>CloseDate</th>
                                        <th>Amount</th>
                                        <th>Proabability</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {opportunities.map(
                                        (opportunity) => (
                                            <tr key={opportunity.OpportunityId}>
                                                <td>{opportunity.OpportunityId}</td>
                                                <td>{opportunity.AccountId}</td>
                                                <td>{opportunity.ContactId}</td>
                                                <td>{opportunity.Name}</td>
                                                <td>{opportunity.Description}</td>
                                                <td>{opportunity.Status}</td>
                                                <td>{opportunity.CloseDate}</td>
                                                <td>{opportunity.Amount}</td>
                                                <td>{opportunity.Probability}</td>
                                                <td><div className="btn-group" role="group" aria-label="Button group name">
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => this.openModalEdit(opportunity)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button type="button" className="btn btn-danger" onClick={() => this.deleteRecord(opportunity.OpportunityId)}>Delete</button>
                                                </div></td>
                                            </tr>
                                        )
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Render the modal */}
                    <CreateOpportunity isOpen={isModalOpenCreate} onClose={this.closeModalCreate} onFormSubmit={this.handleFormSubmitCreate} />
                    <EditOpportunity isOpen={isModalOpenEdit} onClose={this.closeModalEdit} onFormSubmit={this.handleFormSubmitEdit} opportunity={selectedOpportunity} />
                    <div className="card-footer text-muted">

                    </div>
                </div>

            );
        }

    }
}
export default List;
