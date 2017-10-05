import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectGraph from '../../components/SelectGraph/SelectGraph';
import GraphActions from '../../components/GraphActions/GraphActions';
import TimePeriodPanel from '../../components/TimePeriod/TimePeriodPanel';
import * as actions from '../../actions/GraphsActions';
import './GraphToolbar.css';

class GraphToolbar extends React.Component {

    render() {
        return (
            <div className="graph-toolbar">

                <div className="time-filter">

                    <TimePeriodPanel currentPeriodName={ this.props.Graph.periodName }
                                     onSetPeriod={ this.props.setGraphPeriod }
                    />

                </div>

                <div className="select-graph">

                    <SelectGraph graphList={ this.props.Graph.graphList }
                                 onSelectGraph={ this.props.selectGraph }
                                 selectedGraphId={ this.props.Graph.id }
                                 fetching={ this.props.Graph.fetching }
                    />

                </div>

                <div className="graph-actions">

                    <GraphActions onAddGraph={ this.props.addGraph }
                                  onDeleteGraph={ this.deleteGraph.bind(this) }
                                  unitList={ this.props.Unit.list }
                    />

                </div>

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
