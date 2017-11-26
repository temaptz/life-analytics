import React from 'react';

class GetGraphHashButton extends React.Component {

    render() {

        const { onButtonClick } = this.props;

        return (
            <div>
                <button onClick={ onButtonClick }>
                    <i className="fa fa-lock" aria-hidden="true"></i>
                    Хэш для внешних источников
                </button>

            </div>
        );
    }

}

export default GetGraphHashButton;
