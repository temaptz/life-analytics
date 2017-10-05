import React  from 'react';
import './SelectGraph.css';

class SelectGraph extends React.Component {

    render() {
        const { graphList, onSelectGraph, selectedGraphId } = this.props;

        return (
            <div>

                <select value={selectedGraphId}
                        onChange={(e) => {
                            onSelectGraph(e.target.value);
                        }}>
                    {graphList.map((graph, index) =>
                        <option value={graph._id}
                                key={index}>
                            {graph.name}
                        </option>
                    )}
                </select>

            </div>
        );
    }
}

export default SelectGraph;
