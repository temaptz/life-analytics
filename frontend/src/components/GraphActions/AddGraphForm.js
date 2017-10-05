import React from 'react';

class AddGraphForm extends React.Component {

    constructor(props) {
        super(props);

        this.initialState = {
            name   : '',
            unitId : 0
        };

        this.state = this.initialState;
    }

    render() {

        const { unitList } = this.props;

        return (
            <div className="add-graph-form">

                <h2>Добавление нового графика</h2>

                <form>

                    <label htmlFor="newGraphName">Название графика</label>

                    <input type="text"
                           id="newGraphName"
                           placeholder="Введите название"
                           required
                           onChange={this.onChangeName.bind(this)}
                    />

                    <label htmlFor="newGraphUnitId">Единицы измерения</label>

                    <select type="text"
                            id="newGraphUnitId"
                            value={this.state.unitId}
                            required
                            onChange={this.onChangeUnit.bind(this)}
                    >
                        {unitList.map((unit, index) =>
                            <option value={unit._id}
                                    key={index}
                            >
                                {unit.name}
                            </option>
                        )}
                    </select>

                </form>

            </div>
        );
    }

    // Изменение инпута ввода названия графика
    onChangeName(e) {
        this.setState({name: e.target.value}, this.translateState);
    }

    // Изменение селекта выбора единиц измерения
    onChangeUnit(e) {
        this.setState({unitId: e.target.value}, this.translateState);
    }

    // Передать состояние выше
    translateState() {
        this.props.onChangeState(this.state);
    }

    // Очистка формы
    clearForm() {
        this.setState(this.initialState, this.translateState);
    }

}

export default AddGraphForm;