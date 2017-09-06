import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SignOutButton from '../components/User/SignOutButton';

class UserToolbar extends React.Component {

    render() {
        return (
            <div>
                
                <span className="pull-right">
                    { this.props.User.name }
                </span>

                <SignOutButton onSignOutClick={ this.props.signOut } />

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
