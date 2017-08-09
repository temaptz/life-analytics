import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddGraphForm from './AddGraphForm';

class AddGraphModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { showModal, onClose, onSave } = this.props;

        return (
            <div>
                <Modal show={showModal} onHide={onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавление графика</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <AddGraphForm/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={onClose}>
                            Закрыть
                        </Button>
                        <Button onClick={onSave}
                                bsStyle="primary">
                            Сохранить
                        </Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    }

}

export default AddGraphModal;