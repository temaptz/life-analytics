import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GraphToolbar from '../GraphToolbar/GraphToolbar';
import AddPointButton from '../../components/AddPoint/AddPointButton';
import RechartsGraph from '../../components/Recharts/RechartsGraph';
import * as actions from '../../actions';
import UserToolbar from '../UserToolbar/UserToolbar';
import './MainContainer.css';

class MainContainer extends React.Component {

    render() {
        return (
            <div className="main-container">

                <UserToolbar />

                <GraphToolbar />

                <RechartsGraph points={ this.props.Point.points }
                               unitName={ this.props.Unit.name }
                               periodName={ this.props.Graph.periodName }
                />

                <AddPointButton graphId={ this.props.Graph.id }
                                fetching={ this.props.Point.fetching }
                                onAddPoint={ this.props.addPoint }
                                addingPointSuccess={ this.props.Point.addingPointSuccess }
                />

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
