import React from 'react';

class SignOutButton extends React.Component {

    render() {

        const { onSignOutClick } = this.props;

        return (
            <i className="button sign-out-button fa fa-sign-out"
               aria-hidden="true"
               onClick={ onSignOutClick }></i>
        );
    }
}

export default SignOutButton;
