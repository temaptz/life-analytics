import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectGraph from '../components/SelectGraph';
import AddGraphButton from '../components/AddGraph/AddGraphButton';
import DeleteGraphButton from '../components/DeleteGraphButton';
import AddGraphModal from '../components/AddGraph/AddGraphModal';
import TimePeriodPanel from '../components/TimePeriod/TimePeriodPanel';
import * as actions from '../actions/GraphsActions';

class GraphToolbar extends React.Component {

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

                <TimePeriodPanel currentPeriodName={ this.props.Graph.periodName }
                                   onSetPeriod={ this.props.setGraphPeriod } />

                <AddGraphModal showModal={ this.props.Graph.showAddGraphModal }
                               onSave={ this.props.addGraph }
                               onClose={ this.props.hideAddGraphModal }
                               unitList={ this.props.Unit.list } />
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
