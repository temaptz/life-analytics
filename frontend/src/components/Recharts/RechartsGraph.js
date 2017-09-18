import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import GraphTooltip from './GraphTooltip';
import moment from 'moment';
import { getTimeLimitsByPeriodName } from '../../helpers/timePeriod';

class RechartsGraph extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            points      : [],
            minValue    : 0,
            maxValue    : 0,
            minUnixtime : 0,
            maxUnixtime : 0
        };
    }

    render() {

        const { graphName, unitName } = this.props;

        return (
            <div>
                <h5>{ graphName }</h5>

                {this.state.minUnixtime} - {this.state.maxUnixtime}

                <ResponsiveContainer width="100%"
                                     height={ 300 }>

                    <LineChart data={ this.state.points }>

                        <XAxis dataKey="unixtime"
                               type="number"
                               domain={ [this.state.minUnixtime, this.state.maxUnixtime] }
                               hide={ false }
                               tickFormatter={this.tickFormatter} />

                        <YAxis domain={ [this.state.minValue, this.state.maxValue] } />

                        <Tooltip content={ <GraphTooltip unitName={ unitName } /> } />

                        <Line type="monotone"
                              dataKey="value"
                              stroke="#0275d8"
                              activeDot={{r: 7}} />

                    </LineChart>

                </ResponsiveContainer>
            </div>
        );
    }

    // Обновление точек графика
    componentWillReceiveProps(nextProps) {
        let points = [];

        const pointsSource = nextProps.points || null;

        const timeLimits   = getTimeLimitsByPeriodName(this.props.periodName);

        if ( pointsSource && pointsSource.length > 0 ) {

            pointsSource.forEach((pointSrc) => {

                points.push(this.formatPointData(pointSrc));

            });

        }

        const valuesLimits = this.getValuesLimits(points);

        this.setState({ points : points });
        this.setState({ minValue : valuesLimits.minValue });
        this.setState({ maxValue : valuesLimits.maxValue });
        this.setState({ minUnixtime : timeLimits.unixFrom });
        this.setState({ maxUnixtime : timeLimits.unixTo });
    }

    // Проверить, находится ли точка в заданном интервале времени
    pointInTimeLimits(point, timeLimits) {
        const pointUnixtime = moment(point.date).unix();

        // console.log(timeLimits.from, moment(point.date).format(), timeLimits.to);
        //
        // console.log(( pointUnixtime >= timeLimits.unixFrom && pointUnixtime <= timeLimits.unixTo ), timeLimits.unixFrom, pointUnixtime, timeLimits.unixTo);


        return ( pointUnixtime >= timeLimits.unixFrom && pointUnixtime <= timeLimits.unixTo );
    }

    // Преобразовать сущность точки
    formatPointData(point) {
        const pointMoment = moment(point.date);

        return {
            value    : parseFloat(point.value),
            date     : pointMoment.format('DD.MM.YYYY HH:mm'),
            unixtime : pointMoment.unix(),
            remark   : point.remark
        };
    }

    // Поиск минимального и максимального значений графика
    getValuesLimits(points) {
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

    // Форматирование меток на шкале времени
    tickFormatter(unixtime) {
        return moment(unixtime, 'X').format('DD.MM.YYYY');
    }

}

export default RechartsGraph;
