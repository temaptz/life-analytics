import React, { Component } from 'react';

class SelectGraph extends Component {

    render() {
        const { graphList, onSelectGraph, selectedGraphId } = this.props;

        return (
            <div>
                <form className="form-inline">
                    <label htmlFor="selectGraphFormControl">
                        Выберите график
                    </label>
                    <select className="form-control"
                            id="selectGraphFormControl"
                            value={selectedGraphId}
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
                </form>
            </div>
        );
    }
}

export default SelectGraph;
