import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import GraphTooltip from './GraphTooltip';
import moment from 'moment';

class RechartsGraph extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pointsData : []
        };
    }

    render() {

        const { graphName, unitName } = this.props;

        return (
            <div>
                <h5>{ graphName }</h5>

                <ResponsiveContainer width="100%"
                                     height={ 300 }>

                    <LineChart data={ this.state.pointsData }>

                        <XAxis dataKey="unixtime"
                               type="number"
                               domain={ ['dataMin', 'dataMax'] }
                               hide={ true } />

                        <YAxis domain={ ['dataMin', 'dataMax'] } />

                        <Tooltip content={ <GraphTooltip unitName={ unitName } /> } />

                        <Line type="monotone"
                              dataKey="value"
                              stroke="#0275d8" />

                    </LineChart>

                </ResponsiveContainer>
            </div>
        );
    }

    // Обновление точек графика
    componentWillReceiveProps(nextProps) {
        let pointsData = [];

        if ( nextProps.points && nextProps.points.length > 0 ) {
            nextProps.points.forEach((item) => {
                let itemMoment = moment(item.date);
                pointsData.push({
                    value    : parseFloat(item.value),
                    date     : itemMoment.format('DD.MM.YYYY HH:mm'),
                    unixtime : itemMoment.unix()
                });
            });
        }

        this.setState({ pointsData: pointsData });
    }


}

export default RechartsGraph;
