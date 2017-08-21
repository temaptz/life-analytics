import React from 'react';

class DeleteGraphButton extends React.Component {

    render() {

        const { onClick } = this.props;

        return (
            <div>
                <button className="btn btn-danger pull-right"
                        onClick={ onClick }>
                    Удалить этот график
                </button>
            </div>
        );
    }
}

export default DeleteGraphButton;
