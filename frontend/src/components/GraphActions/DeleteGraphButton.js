import React from 'react';

class DeleteGraphButton extends React.Component {

    render() {

        const { onButtonClick } = this.props;

        return (
            <div>
                <button onClick={ onButtonClick }>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    Удалить этот график
                </button>

            </div>
        );
    }

}

export default DeleteGraphButton;
