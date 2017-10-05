import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import GraphTooltip from './GraphTooltip';
import moment from 'moment';
import { getTimeLimitsByPeriodName } from '../../helpers/timePeriod';
import './RechartsGraph.css';

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

        const { unitName } = this.props,
            axisColor = '#333',
            lineColor = '#005bcc',
            lineWidth = 1.5,
            axisStyle = {stroke: axisColor, strokeWidth: 1},
            tickStyle = {stroke: axisColor, strokeWidth: 1, fontSize: 14, fill: '#fff', fillOpacity: 0.5};

        return (
            <div className="recharts-graph-container">

                <ResponsiveContainer width="100%"
                                     height={ 300 }>

                    <LineChart data={ this.state.points }>

                        <XAxis dataKey="unixtime"
                               type="number"
                               domain={ [this.state.minUnixtime, this.state.maxUnixtime] }
                               hide={ false }
                               tickFormatter={this.tickTimeFormatter}
                               tick={ tickStyle }
                               axisLine={ axisStyle }
                               tickLine={ axisStyle }
                               tickSize={ 5 }
                        />

                        <YAxis domain={ [this.state.minValue, this.state.maxValue] }
                               tick={ tickStyle }
                               tickFormatter={ this.tickValueFormatter }
                               axisLine={ axisStyle }
                               tickLine={ axisStyle }
                               tickSize={ 5 }
                        />

                        <Tooltip content={ <GraphTooltip unitName={ unitName } /> }
                        />

                        <Line type="monotone"
                              dataKey="value"
                              stroke={ lineColor }
                              strokeWidth={ lineWidth }
                              dot={{ stroke: lineColor, strokeWidth: lineWidth, fill: '#fff', r: 3 }}
                              activeDot={{r: 5}}
                        />

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
    tickTimeFormatter(unixtime) {
        return moment(unixtime, 'X').format('DD.MM.YYYY');
    }

    // Форматирование меток на шкале значений
    tickValueFormatter(value) {
        let float = parseFloat(value);

        if ( float < 10 && float % 1 !== 0 ) {

            float = float.toFixed(2);

        } else {

            float = Math.round(float);

        }

        return float;
    }

}

export default RechartsGraph;
