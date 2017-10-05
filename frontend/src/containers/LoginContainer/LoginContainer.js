import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GoogleSignInButton from '../../components/User/GoogleSignInButton';
import * as actions from '../../actions';
import './LoginContainer.css'

class LoginContainer extends Component {

    render() {
        return (
            <div className="login-container">

                <div className="login-panel">

                    <h1 className="login-header">Life Analytics</h1>

                    <GoogleSignInButton onSignInSuccess={ this.props.signIn }
                                        onSignInError={ this.props.signInError }
                    />

                </div>

            </div>
        );
    }
}

export default connect(
    (state) => {
        return state;
    },
    (dispatch) => {
        return bindActionCreators(actions, dispatch);
    })(LoginContainer);
