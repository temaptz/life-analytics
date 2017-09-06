import React from 'react';

class SignOutButton extends React.Component {

    render() {

        const { onSignOutClick } = this.props;

        return (
            <div>
                <button className="btn btn-default"
                        onClick={ onSignOutClick } >
                    Выход
                </button>
            </div>
        );
    }
}

export default SignOutButton;
