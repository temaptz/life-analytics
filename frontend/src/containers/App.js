import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.scss';
import GoogleSignInButton from '../components/User/GoogleSignInButton';
import MainContainer from './MainContainer';
import * as actions from '../actions';

class App extends Component {

    render() {
        return (
            <div>
                <h1>Life Analytics</h1>

                { this.props.User.authorized ? (

                    <MainContainer />

                ) : (

                    <GoogleSignInButton onSignInSuccess={ this.props.signIn }
                                        onSignInError={ this.props.signInError }
                    />

                )}

            </div>
        );
    }

    // После подключения компонента нужно запросить список графиков
    componentWillMount() {
        this.props.checkUserAuth();
    }
}

export default connect(
    (state) => {
        return state;
    },
    (dispatch) => {
        return bindActionCreators(actions, dispatch);
    })(App);
