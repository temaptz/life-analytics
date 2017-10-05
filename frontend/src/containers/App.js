import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainer from './MainContainer/MainContainer';
import LoginContainer from './LoginContainer/LoginContainer';
import * as actions from '../actions';

class App extends Component {

    render() {
        return (
            <div>

                { this.props.User.authorized ? (

                    <MainContainer />

                ) : (

                    <LoginContainer />

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
