import React from 'react';
import { Link } from "react-router-dom";
import Api from "../../services/api";
import CreateNote from './CreateNote'; // Import your NoteModal component
import EditNote from './EditNote'; // Import your NoteModal component
import axios from 'axios'; // Import Axios

class List extends React.Component {
    state = {
        isModalOpenCreate: false,
        isModalOpenEdit: false,
        selectedNote: null,
    };
    handleFormSubmitCreate = () => {
        // Lógica que deseas ejecutar después de enviar el formulario en CreateNote
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
        // Lógica que deseas ejecutar después de enviar el formulario en CreateNote
        this.loadData(); // Actualizar tus datos o realizar otras acciones aquí
        this.closeModalEdit(); // Cerrar el modal después de enviar el formulario
    };
    openModalEdit = (note) => {
        console.log('openModalEdit called with:', note);
        this.setState({ isModalOpenEdit: true, selectedNote: note });
    }

    closeModalEdit = () => {
        this.setState({ isModalOpenEdit: false });
    };
    constructor(props) {
        super(props);
        this.state = {
            loadedData: false,
            notes: []
        }
    }
    deleteRecord = (NoteId) => {
        // Use Axios for the DELETE request
        axios.delete(Api + '/notes/' + NoteId)
            .then(() => {
                // Note successfully deleted, now delete the image
                this.updateNoteList(NoteId);
            })
            .catch((error) => {
                console.error('Error deleting registry:', error);
                // Handle the error according to your needs (e.g., display an error message).
            });
        window.location.reload();

    };

    // Function to update the note list after deletion
    updateNoteList = (deletedNoteId) => {
        this.setState((prevState) => ({
            notes: prevState.notes.filter((note) => note.NoteId !== deletedNoteId),
        }));
    };
    loadData() {
        // Use Axios for the GET request
        axios.get(Api + '/notes') // Replaces the Fetch API call
            .then((response) => {
                if (!response.data) {
                    throw new Error('Could not get list of records');
                }
                // Update the state with the data obtained
                this.setState({ loadedData: true, notes: response.data });
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
        const { loadedData, notes, isModalOpenCreate, isModalOpenEdit, selectedNote } = this.state;
        if (!loadedData) { return (<div>Loading...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        <button className="btn btn-success" onClick={this.openModalCreate}>
                            Add new note
                        </button>
                    </div>
                    <div className="card-body">
                        <h4>Note List</h4>
                        <div className="table-responsive">
                            <table className="table table-primary">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>ContactId</th>
                                        <th>AccountId</th>
                                        <th>OpportunityId</th>
                                        <th>UserId</th>
                                        <th>DateTime</th>
                                        <th>Content</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notes.map(
                                        (note) => (
                                            <tr key={note.NoteId}>
                                                <td>{note.NoteId}</td>
                                                <td>{note.ContactId}</td>
                                                <td>{note.AccountId}</td>
                                                <td>{note.OpportunityId}</td>
                                                <td>{note.UserId}</td>
                                                <td>{note.DateTime}</td>
                                                <td>{note.Content}</td>
                                                <td><img width="120px" src={`${Api}/images/${note.Image}`} alt="" /></td>
                                                <td><div className="btn-group" role="group" aria-label="Button group name">
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => this.openModalEdit(note)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button type="button" className="btn btn-danger" onClick={() => this.deleteRecord(note.NoteId)}>Delete</button>
                                                </div></td>
                                            </tr>
                                        )
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Render the modal */}
                    <CreateNote isOpen={isModalOpenCreate} onClose={this.closeModalCreate} onFormSubmit={this.handleFormSubmitCreate} />
                    <EditNote isOpen={isModalOpenEdit} onClose={this.closeModalEdit} onFormSubmit={this.handleFormSubmitEdit} note={selectedNote} />
                    <div className="card-footer text-muted">

                    </div>
                </div>

            );
        }

    }
}
export default List;
