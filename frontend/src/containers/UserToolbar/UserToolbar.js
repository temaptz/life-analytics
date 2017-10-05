import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SignOutButton from '../../components/User/SignOutButton';
import './UserToolbar.css';

class UserToolbar extends React.Component {

    render() {
        return (
            <div className="user-toolbar">

                <div className="helper"></div>

                <div className="header">

                    <h1>Life Analytics</h1>

                </div>

                <div className="user">

                    { this.props.User.name }
                    <SignOutButton onSignOutClick={ this.props.signOut } />

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
    })(UserToolbar);
