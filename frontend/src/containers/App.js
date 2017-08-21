import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.scss';
import GraphToolbar from './GraphToolbar';
import AddPointForm from '../components/AddPointForm';
import RechartsGraph from '../components/Recharts/RechartsGraph';
import * as actions from '../actions/index'

class App extends Component {

    render() {
        return (
            <div>
                <h1>Life Analytics</h1>

                <GraphToolbar />

                <RechartsGraph pointsData={ this.props.Point.pointsData }
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
    })(App);
