import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import GraphTooltip from './GraphTooltip';

class RechartsGraph extends React.Component {

    render() {

        const { pointsData, graphName, unitName } = this.props;

        return (
            <div>
                <h5>{graphName}</h5>

                <ResponsiveContainer width="100%"
                                     height={ 300 }>

                    <LineChart data={ pointsData }>

                        <XAxis dataKey="unixtime"
                               type="number"
                               domain={ ['dataMin', 'dataMax'] }
                               hide={ true } />

                        <YAxis domain={ [0, 'dataMax'] } />

                        <Tooltip content={ <GraphTooltip unitName={ unitName } /> } />

                        <Line type="monotone"
                              dataKey="value"
                              stroke="#0275d8" />

                    </LineChart>

                </ResponsiveContainer>
            </div>
        );
    }

}

export default RechartsGraph;
