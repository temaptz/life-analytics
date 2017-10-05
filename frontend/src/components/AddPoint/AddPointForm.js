import React from 'react';

class AddPointButton extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            value  : '',
            remark : ''
        };

        this.state = this.initialState;
    }

    render() {

        return (
            <div className="add-point-form">

                <h2>Добавление новой точки</h2>

                <form>

                    <label htmlFor="addPointFormVal">
                        Значение
                    </label>

                    <input type="number"
                           id="addPointFormVal"
                           placeholder="Новое значение"
                           value={ this.state.value }
                           required
                           onChange={ this.onChangeValue.bind(this) }
                    />

                    <label htmlFor="addPointFormRemark">
                        Комментарий
                    </label>

                    <input type="text"
                           className="form-control"
                           id="addPointFormRemark"
                           placeholder="Введите комментарий"
                           value={ this.state.remark}
                           onChange={ this.onChangeRemark.bind(this) }
                    />

                </form>

            </div>
        );
    }

    // При успешном добавлении точки очищать поля ввода
    componentWillReceiveProps(nextProps) {
        if ( nextProps.addingPointSuccess === true ) {
            this.setState({value : ''});
            this.setState({remark : ''});
        }
    }

    // Изменение значения
    onChangeValue(e) {
        this.setState({value: e.target.value}, this.translateState);
    }

    // Изменение комментария
    onChangeRemark(e) {
        this.setState({remark: e.target.value}, this.translateState);
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

export default AddPointButton;
