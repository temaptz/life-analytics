import React from 'react';
import GraphActionsDropdown from './GraphActionsDropdown';
import AddGraphForm from './AddGraphForm';
import Modal from '../Modal/Modal';

class GraphActions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalDeleteConfirmIsOpen : false,
            modalAddGraphOpen        : false,
            modalHashIsOpen          : false,
            newGraphName             : '',
            newGraphUnitId           : '',
            newGraphDisableSave      : true
        };
    }

    render() {

        const { unitList } = this.props;

        return (
            <div>

                <GraphActionsDropdown onAddGraphClick={ this.showAddGraphModal.bind(this) }
                                      onDeleteGraphClick={ this.showDeleteConfirm.bind(this) }
                                      onGetGraphHashClick={ this.showGraphHashModal.bind(this) }
                />



                <Modal isOpen={ this.state.modalDeleteConfirmIsOpen }
                       onOk={ this.deleteConfirm.bind(this) }
                       onCancel={ this.cancelDeleteConfirm.bind(this) }
                       textOk="Да"
                       textCancel="Нет"
                       type="warning"
                       content="Вы действительно хотите удалить этот график?"
                />

                <Modal isOpen={ this.state.modalAddGraphOpen }
                       onOk={ this.addGraph.bind(this) }
                       onCancel={ this.cancelAddGraphModal.bind(this) }
                       textOk="Сохранить"
                       textCancel="Отмена"
                       disabledOk={ this.state.newGraphDisableSave }
                       content={
                           <AddGraphForm ref="addGraphForm"
                                         unitList={ unitList }
                                         onChangeState={ this.updateNewGraphState.bind(this) }
                           />
                       }
                />

                <Modal isOpen={ this.state.modalHashIsOpen }
                       onOk={ this.closeHashModal.bind(this) }
                       onCancel={ false }
                       textOk="Ok"
                       content="Хэш"
                />

            </div>
        );
    }

    // Открытие окна добавления нового графика
    showAddGraphModal() {
        this.checkNewGraphData();
        this.setState({ modalAddGraphOpen : true });
    }

    // Закрытие окна добавления нового графика
    cancelAddGraphModal() {
        this.setState({ modalAddGraphOpen : false });
        this.refs.addGraphForm.clearForm();
    }

    // Обновилось состояние формы добавления нового графика
    updateNewGraphState(newGraph) {
        this.setState({
            newGraphName   : newGraph.name,
            newGraphUnitId : newGraph.unitId
        }, () => {
            this.checkNewGraphData();
        });
    }

    // Добавление нового графика
    addGraph() {
        this.checkNewGraphData(() => {
            if ( !this.state.newGraphDisableSave ) {
                this.props.onAddGraph(this.state.newGraphName, this.state.newGraphUnitId);
                this.cancelAddGraphModal();
            }
        });
    }

    // Проверить корректность данных нового графика
    checkNewGraphData(callback) {
        const { newGraphName, newGraphUnitId } = this.state;

        let newGraphDisableSave = false;

        if ( newGraphName.length === 0 || newGraphUnitId.length === 0 ) {
            newGraphDisableSave = true;
        }

        this.setState({
            newGraphDisableSave : newGraphDisableSave
        }, callback);

        return newGraphDisableSave;
    }

    // Открытие подтверждения на удаление графика
    showDeleteConfirm() {
        this.setState({ modalDeleteConfirmIsOpen : true });
    }

    // Закрытие подтверждения на удаление графика
    cancelDeleteConfirm() {
        this.setState({ modalDeleteConfirmIsOpen : false });
    }

    // Подтверждение удаления графика
    deleteConfirm() {
        this.props.onDeleteGraph();
        this.cancelDeleteConfirm();
    }

    // Показать хэш графика
    showGraphHashModal() {
        this.setState({ modalHashIsOpen : true });

    }

    // Закрытие модального окна с хэшем графика
    closeHashModal() {
        this.setState({ modalHashIsOpen : false });
    }

}

export default GraphActions;