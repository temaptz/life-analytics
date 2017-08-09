import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AddGraphForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : ''
        };
    }

    render() {

        return (
            <div>
                <form className="form-inline">
                    <label htmlFor="addGraphFormName">
                        Название
                    </label>
                    <input type="text"
                           className="form-control"
                           id="addGraphFormName"
                           placeholder="Название нового графика"
                           value={this.state.name}
                           onChange={this.onChange.bind(this)} />
                    <Button bsStyle="success"
                            onClick={this.onSubmit.bind(this)}>
                        Добавить график
                    </Button>
                </form>
            </div>
        );
    }

    onChange(e) {
        this.setState({name: e.target.value});
    }

    onSubmit() {
        this.props.onAddGraph(this.state.name);
    }
}

export default AddGraphForm;
