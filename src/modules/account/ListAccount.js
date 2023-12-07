import React from 'react';
import { Link } from "react-router-dom";
import Api from "../../services/api";
import CreateAccount from './CreateAccount'; // Import your AccountModal component
import EditAccount from './EditAccount'; // Import your AccountModal component
import axios from 'axios'; // Import Axios

class List extends React.Component {
    state = {
        isModalOpenCreate: false,
        isModalOpenEdit: false,
        selectedAccount: null,
    };
    handleFormSubmitCreate = () => {
        // Lógica que deseas ejecutar después de enviar el formulario en CreateAccount
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
        // Lógica que deseas ejecutar después de enviar el formulario en CreateAccount
        this.loadData(); // Actualizar tus datos o realizar otras acciones aquí
        this.closeModalEdit(); // Cerrar el modal después de enviar el formulario
    };
    openModalEdit = (account) => {
        console.log('openModalEdit called with:', account);
        this.setState({ isModalOpenEdit: true, selectedAccount: account });
    }

    closeModalEdit = () => {
        this.setState({ isModalOpenEdit: false });
    };
    constructor(props) {
        super(props);
        this.state = {
            loadedData: false,
            accounts: []
        }
    }
    deleteRecord = (AccountId) => {
        // Use Axios for the DELETE request
        axios.delete(Api + '/accounts/' + AccountId)
            .then(() => {
                // Account successfully deleted, now delete the image
                this.updateAccountList(AccountId);
            })
            .catch((error) => {
                console.error('Error deleting registry:', error);
                // Handle the error according to your needs (e.g., display an error message).
            });
        window.location.reload();

    };

    // Function to update the account list after deletion
    updateAccountList = (deletedAccountId) => {
        this.setState((prevState) => ({
            accounts: prevState.accounts.filter((account) => account.AccountId !== deletedAccountId),
        }));
    };
    loadData() {
        // Use Axios for the GET request
        axios.get(Api + '/accounts') // Replaces the Fetch API call
            .then((response) => {
                if (!response.data) {
                    throw new Error('Could not get list of records');
                }
                // Update the state with the data obtained
                this.setState({ loadedData: true, accounts: response.data });
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
        const { loadedData, accounts, isModalOpenCreate, isModalOpenEdit, selectedAccount } = this.state;
        if (!loadedData) { return (<div>Loading...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        <button className="btn btn-success" onClick={this.openModalCreate}>
                            Add new account
                        </button>
                    </div>
                    <div className="card-body">
                        <h4>Account List</h4>
                        <div className="table-responsive">
                            <table className="table table-primary">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>AccountId</th>
                                        <th>Website</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Content</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.map(
                                        (account) => (
                                            <tr key={account.AccountId}>
                                                <td>{account.AccountId}</td>
                                                <td>{account.Name}</td>
                                                <td>{account.Industry}</td>
                                                <td>{account.Website}</td>
                                                <td>{account.Phone}</td>
                                                <td>{account.Address}</td>
                                                <td><div className="btn-group" role="group" aria-label="Button group name">
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => this.openModalEdit(account)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button type="button" className="btn btn-danger" onClick={() => this.deleteRecord(account.AccountId)}>Delete</button>
                                                </div></td>
                                            </tr>
                                        )
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Render the modal */}
                    <CreateAccount isOpen={isModalOpenCreate} onClose={this.closeModalCreate} onFormSubmit={this.handleFormSubmitCreate} />
                    <EditAccount isOpen={isModalOpenEdit} onClose={this.closeModalEdit} onFormSubmit={this.handleFormSubmitEdit} account={selectedAccount} />
                    <div className="card-footer text-muted">

                    </div>
                </div>

            );
        }

    }
}
export default List;
