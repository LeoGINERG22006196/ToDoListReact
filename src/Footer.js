import React from "react";
import './App.css';
import {Box, Button, Modal, Typography} from "@mui/material";

class Footer extends React.Component {
    popUpStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        maxWidth: 400, // Utilisation de maxWidth pour assurer que la largeur ne dépasse pas 400px
        backgroundColor: '#212121', // Couleur de fond
        color: '#ffffff', // Couleur du texte
        border: '2px solid #000000',
        borderRadius: 12, // Bordure arrondie
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Ombre légère
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };
    render() {
        return (
            <footer>
                <input className="searchBar"
                       placeholder="Search a task..."
                       value={this.props.searchTerm}
                       onChange={this.props.handleSearchChange}
                />
                <Button onClick={this.props.openModal}>Add a task</Button>
                <Modal
                    open={this.props.open}
                    onClose={this.props.closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={this.popUpStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add a task
                        </Typography>
                        <input className="inputAddTask" onChange={this.props.handleInputChange}></input>
                        <button className="buttonAddTask" onClick={this.props.addTask}>Add</button>
                    </Box>
                </Modal>
            </footer>
        );
    }
}

export default Footer;