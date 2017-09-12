import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GraphToolbar from './GraphToolbar';
import AddPointForm from '../components/AddPointForm';
import RechartsGraph from '../components/Recharts/RechartsGraph';
import * as actions from '../actions';
import UserToolbar from './UserToolbar';

class MainContainer extends React.Component {

    render() {
        return (
            <div>

                <UserToolbar />

                <GraphToolbar />

                <RechartsGraph points={ this.props.Point.points }
                               graphName={ this.props.Graph.name }
                               unitName={ this.props.Graph.unitName } />
                <hr />
                <AddPointForm graphId={ this.props.Graph.id }
                              fetching={ this.props.Point.fetching }
                              onAddPoint={ this.props.addPoint }
                              addingPointSuccess={ this.props.Point.addingPointSuccess } />

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
    })(MainContainer);
