import React from 'react';
import moment from 'moment';

class GraphTooltip extends React.Component {

    TooltipStyle = {
        padding : '5px',
        backgroundColor : '#fff',
        border : '1px solid #eee',
        borderRadius : '5px'
    };

    LabelStyle = {
        margin : '0',
        fontSize : '.7em'
    };

    ValueStyle = {
        margin : '5px 0',
        fontSize: '1.4em'
    };

    RemarkStyle = {
        margin : '0',
        fontSize: '1em'
    };

    render() {

        const { payload, unitName } = this.props;

        if ( !payload || payload.length === 0 ) {
            return null;
        }

        const point = payload[0].payload,
            date    = moment.unix(point.unixtime).format('DD.MM.YYYY HH:mm'),
            value   = point.value,
            remark  = point.remark;

        return (
            <div style={this.TooltipStyle}>
                <p style={ this.LabelStyle }>{ date }</p>
                <p style={ this.ValueStyle }>{ value } { unitName }</p>
                <p style={ this.RemarkStyle }>{ remark }</p>
            </div>
        );
    }
}

export default GraphTooltip;
