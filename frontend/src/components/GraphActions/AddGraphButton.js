import React from 'react';

class AddGraphButton extends React.Component {

    render() {

        const { onButtonClick } = this.props;

        return (
            <div>
                <button onClick={ onButtonClick }>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    Добавить график
                </button>
            </div>
        );
    }

}

export default AddGraphButton;