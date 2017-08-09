import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AddGraphButton extends Component {

    render() {

        const { onButtonClick } = this.props;

        return (
            <div>
                <Button onClick={onButtonClick}
                        bsStyle="default">
                    Добавить график
                </Button>
            </div>
        );
    }

}

export default AddGraphButton;