import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.scss';
import AddPointForm from '../components/AddPointForm';
import RechartsGraph from '../components/Recharts/RechartsGraph';
import SelectGraph from '../components/SelectGraph';
import AddGraphButton from '../components/AddGraph/AddGraphButton';
import AddGraphModal from '../components/AddGraph/AddGraphModal';
import * as actions from '../actions/index'

class App extends Component {

    constructor(props) {
        super(props);

        this.props.getGraphList();
    }

    render() {
        return (
            <div>
                <h1>Life Analytics</h1>

                <AddGraphButton onButtonClick={this.props.showAddGraphModal}/>


                <SelectGraph graphList={this.props.Graph.graphList}
                             onSelectGraph={this.props.selectGraph}
                             selectedGraphId={this.props.Graph.id}
                             fetching={this.props.Graph.fetching}/>

                <RechartsGraph pointsData={this.props.Point.pointsData}
                               graphName={this.props.Graph.name}/>
                <hr/>
                <AddPointForm graphId={this.props.Graph.id}
                              fetching={this.props.Point.fetching}
                              onSetValue={this.props.addPoint}/>
                <p>New value: {this.props.Point.value}</p>

                <AddGraphModal showModal={this.props.Graph.showAddGraphModal}
                               onSave={this.props.addGraph}
                               onClose={this.props.hideAddGraphModal}/>
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
