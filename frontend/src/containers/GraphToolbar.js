import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.scss';
import SelectGraph from '../components/SelectGraph';
import AddGraphButton from '../components/AddGraph/AddGraphButton';
import DeleteGraphButton from '../components/deleteGraphButton';
import AddGraphModal from '../components/AddGraph/AddGraphModal';
import * as actions from '../actions/GraphsActions';

class GraphToolbar extends React.Component {

    constructor(props) {
        super(props);

        this.props.getGraphList();
    }

    render() {
        return (
            <div>
                <div className="row">

                    <div className="col-md-6">

                        <SelectGraph graphList={ this.props.Graph.graphList }
                                     onSelectGraph={ this.props.selectGraph }
                                     selectedGraphId={ this.props.Graph.id }
                                     fetching={ this.props.Graph.fetching } />

                    </div>

                    <div className="col-md-6">

                        <div className="pull-right">
                            <DeleteGraphButton onClick={ this.deleteGraph.bind(this) } />
                        </div>

                        <div className="pull-right">
                            <AddGraphButton onButtonClick={ this.props.showAddGraphModal } />
                        </div>

                    </div>

                </div>

                <AddGraphModal showModal={ this.props.Graph.showAddGraphModal }
                               onSave={ this.props.addGraph }
                               onClose={ this.props.hideAddGraphModal }
                               unitList={ this.props.Graph.unitList } />
            </div>
        );
    }

    // Удаление графика
    deleteGraph() {
        this.props.deleteGraph(this.props.Graph.id);
    }
}

export default connect(
    (state) => {
        return state;
    },
    (dispatch) => {
        return bindActionCreators(actions, dispatch);
    })(GraphToolbar);
