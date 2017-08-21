import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AddPointForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
        };
    }

    render() {
        const { fetching } = this.props;

        return (
            <div>
                {fetching}
                <form className="form-inline">
                    <label htmlFor="addPointFormVal">
                        Значение
                    </label>
                    <input type="number"
                           className="form-control"
                           id="addPointFormVal"
                           placeholder="Новое значение"
                           value={this.state.value}
                           onChange={this.onChange.bind(this)} />
                    <Button bsStyle="primary"
                            onClick={this.onSubmit.bind(this)}
                            disabled={fetching}>
                        {
                            fetching
                                ? <span>Подождите...</span>
                                : <span>Добавить точку</span>

                        }
                    </Button>
                </form>
            </div>
        );
    }

    // При успешном добавлении точки очищать поле ввода
    componentWillReceiveProps(nextProps) {
        if ( nextProps.addingPointSuccess === true ) {
            this.setState({value : ''});
        }
    }

    // Изменение поля ввода
    onChange(e) {
        this.setState({value: e.target.value});
    }

    // Кнопка добавления точки
    onSubmit() {
        this.props.onAddPoint(this.state.value, this.props.graphId);
    }
}

export default AddPointForm;
