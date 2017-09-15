import React from 'react';

class AddPointForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value  : '',
            remark : ''
        };
    }

    render() {
        const { fetching } = this.props;

        return (
            <div>
                <form className="form-inline">

                    <label htmlFor="addPointFormVal">
                        Значение
                    </label>

                    <input type="number"
                           className="form-control"
                           id="addPointFormVal"
                           placeholder="Новое значение"
                           value={ this.state.value }
                           onChange={ this.onChangeValue.bind(this) } />

                    <input type="text"
                           className="form-control"
                           id="addPointFormRemark"
                           placeholder="Комментарий"
                           value={ this.state.remark}
                           onChange={ this.onChangeRemark.bind(this) } />

                    <button className="primary"
                            type="button"
                            onClick={ this.onSubmit.bind(this) }
                            disabled={ fetching } >
                        {
                            fetching
                                ? <span>Подождите...</span>
                                : <span>Добавить точку</span>

                        }
                    </button>

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
        this.setState({value: e.target.value});
    }

    // Изменение комментария
    onChangeRemark(e) {
        this.setState({remark: e.target.value});
    }

    // Кнопка добавления точки
    onSubmit() {
        this.props.onAddPoint(this.state.value, this.state.remark, this.props.graphId);
    }
}

export default AddPointForm;
