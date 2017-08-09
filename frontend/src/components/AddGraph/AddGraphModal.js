import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class AddGraphModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            unit : '0'
        };
    }

    render() {

        const { showModal, onClose, unitList } = this.props;

        return (
            <div>
                <Modal show={showModal} onHide={onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавление графика</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>

                            <div className="form-group">
                                <label htmlFor="addGraphFormName">
                                    Название
                                </label>
                                <input type="text"
                                       className="form-control"
                                       id="addGraphFormName"
                                       placeholder="Название нового графика"
                                       value={this.state.name}
                                       onChange={this.onChangeName.bind(this)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="addGraphFormUnit">
                                    Единицы
                                </label>
                                <select type="text"
                                        className="form-control"
                                        id="addGraphFormUnit"
                                        value={this.state.unit}
                                        onChange={this.onChangeUnit.bind(this)}>
                                    {unitList.map((unit, index) =>
                                        <option value={unit._id}
                                                key={index}>
                                            {unit.name}
                                        </option>
                                    )}
                                </select>
                            </div>

                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={onClose}>
                            Закрыть
                        </Button>
                        <Button onClick={this.onAddGraph.bind(this)}
                                bsStyle="primary">
                            Добавить
                        </Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    }

    // Изменение инпута ввода названия графика
    onChangeName(e) {
        this.setState({name: e.target.value});
    }

    // Изменение селекта выбора единиц измерения
    onChangeUnit(e) {
        this.setState({unit: e.target.value});
    }

    // Кнопка добавить график
    onAddGraph() {
        this.props.onSave(this.state.name, this.state.unit);
    }

}

export default AddGraphModal;