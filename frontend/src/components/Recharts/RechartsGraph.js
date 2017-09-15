import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import GraphTooltip from './GraphTooltip';
import moment from 'moment';

class RechartsGraph extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            points   : [],
            minValue : 0,
            maxValue : 0
        };
    }

    render() {

        const { graphName, unitName } = this.props;

        return (
            <div>
                <h5>{ graphName }</h5>

                <ResponsiveContainer width="100%"
                                     height={ 300 }>

                    <LineChart data={ this.state.points }>

                        <XAxis dataKey="unixtime"
                               type="number"
                               domain={ ['dataMin', 'dataMax'] }
                               hide={ true } />

                        <YAxis domain={ [this.state.minValue, this.state.maxValue] } />

                        <Tooltip content={ <GraphTooltip unitName={ unitName } /> } />

                        <Line type="monotone"
                              dataKey="value"
                              stroke="#0275d8"
                              activeDot={{r: 7}}
                              onClick={ this.pointClick.bind(this) } />

                    </LineChart>

                </ResponsiveContainer>
            </div>
        );
    }

    // Обновление точек графика
    componentWillReceiveProps(nextProps) {
        let points = [];

        const pointsSource = nextProps.points || null;

        if ( pointsSource && pointsSource.length > 0 ) {

            pointsSource.forEach((pointSrc) => {

                let point = this.formatPointData(pointSrc);

                points.push(point);

            });

        }

        const limits = this.getPointsLimits(points);

        this.setState({ points: points });
        this.setState({ minValue: limits.minValue });
        this.setState({ maxValue: limits.maxValue });
    }

    // Преобразовать сущность точки
    formatPointData(point) {
        let pointMoment = moment(point.date);

        return {
            value    : parseFloat(point.value),
            date     : pointMoment.format('DD.MM.YYYY HH:mm'),
            unixtime : pointMoment.unix(),
            remark   : point.remark
        };
    }

    // Поиск минимального и максимального значений графика
    getPointsLimits(points) {
        let minValue = null,
            maxValue = null;

        points.forEach((point) => {

            if ( minValue === null && maxValue === null ) {

                minValue = point.value;
                maxValue = point.value;

            } else {

                minValue = Math.min(minValue, point.value);
                maxValue = Math.max(maxValue, point.value);

            }

        });

        let avgValue = ( maxValue - minValue ) / 2;

        let limits = {
            minValue : minValue - avgValue * 0.1,
            maxValue : maxValue + avgValue * 0.1
        };

        return limits;
    }

    // Клик по точке графика
    pointClick(data, index) {
        console.log(data, index);
    }

}

export default RechartsGraph;
