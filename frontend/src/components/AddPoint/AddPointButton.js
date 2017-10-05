import React from 'react';
import Modal from '../Modal/Modal';
import AddPointForm from './AddPointForm';

class AddPointButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newPointValue       : '',
            newPointRemark      : '',
            modalIsOpen         : false,
            newPointDisableSave : true
        };
    }

    render() {
        const { fetching } = this.props;

        return (
            <div className="add-point-container">

                <button className="adding"
                        disabled={ fetching }
                        onClick={ this.showModal.bind(this) }
                >
                    {
                        fetching
                            ? <span>Подождите...</span>
                            : <span>
                                    <i className="fa fa-plus"></i>
                                    Добавить точку
                                </span>

                    }
                </button>

                <Modal isOpen={ this.state.modalIsOpen }
                       onOk={ this.onAddPoint.bind(this) }
                       onCancel={ this.cancelModal.bind(this) }
                       textOk="Добавить"
                       textCancel="Отмена"
                       disabledOk={ this.state.newPointDisableSave }
                       content={
                           <AddPointForm ref="addPointForm"
                                         onChangeState={ this.updateNewPointState.bind(this) }
                           />
                       }
                />

            </div>
        );
    }

    // Открытие окна добавления новой точки
    showModal() {
        this.checkPointData();
        this.setState({ modalIsOpen : true });
    }

    // Закрытие окна добавления новой точки
    cancelModal() {
        this.setState({ modalIsOpen : false });
        this.refs.addPointForm.clearForm();
    }

    // Обновилось состояние формы добавления новой точки
    updateNewPointState(newPoint) {
        this.setState({
            newPointValue  : newPoint.value,
            newPointRemark : newPoint.remark
        }, () => {
            this.checkPointData();
        });
    }

    // Добавление новой точки
    onAddPoint() {
        this.checkPointData(() => {
            if ( !this.state.newPointDisableSave ) {
                this.props.onAddPoint(this.state.newPointValue, this.state.newPointRemark, this.props.graphId);
                this.cancelModal();
            }
        });
    }

    // Проверить корректность данных новой точки
    checkPointData(callback) {
        const { newPointValue } = this.state;

        let newPointDisableSave = false;

        if ( newPointValue.length === 0 ) {
            newPointDisableSave = true;
        }

        this.setState({
            newPointDisableSave : newPointDisableSave
        }, callback);

        return newPointDisableSave;
    }

    // При успешном добавлении точки очищать поля ввода
    componentWillReceiveProps(nextProps) {
        if ( nextProps.addingPointSuccess === true ) {
            this.setState({newPointValue : ''});
            this.setState({newPointRemark : ''});
        }
    }
}

export default AddPointButton;
