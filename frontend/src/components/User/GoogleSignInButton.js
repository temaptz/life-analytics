import React from 'react';
import GoogleLogin from 'react-google-login';
import FontAwesome from 'react-fontawesome';
import { googleClientId } from '../../config';

class GoogleSignInButton extends React.Component {

    render() {

        const buttonStyle = {
            display: 'inline-block',
            background: 'rgb(209, 72, 54)',
            color: '#fff',
            width: '300px',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderRadius: '3px',
            border: '1px solid transparent',
            fontSize: '16px'
        };

        return (
            <div className="login-button">
                <GoogleLogin
                    clientId={ googleClientId }
                    onSuccess={ this.onSuccess.bind(this) }
                    onFailure={ this.onError.bind(this) }
                    style={ buttonStyle }
                >

                    <FontAwesome  name='google-plus-official'
                                  fixedWidth={ true }
                    />

                    <span>Войти как пользователь Google</span>

                </GoogleLogin>
            </div>
        );
    }

    onSuccess(e) {
        this.props.onSignInSuccess(e.profileObj.googleId, e.profileObj.name, 'google');
    }

    onError() {
        this.props.onSignInError();
    }
}

export default GoogleSignInButton;
