import React from 'react';
import moment from 'moment';

class GraphTooltip extends React.Component {

    GraphTooltipStyle = {
        padding : '5px',
        backgroundColor : '#fff',
        border : '1px solid #eee',
        borderRadius : '5px'
    };

    GraphTooltipLabelStyle = {
        margin : '0',
        fontSize : '.7em'
    };

    GraphTooltipValueStyle = {
        margin : '0'
    };

    render() {

        const { payload, label, unitName } = this.props;

        if ( !payload || payload.length === 0 ) {
            return null;
        }

        let date  = moment.unix(label).format('DD.MM.YYYY HH:mm'),
            value = payload[0].value;

        return (
            <div style={this.GraphTooltipStyle}>
                <p style={ this.GraphTooltipLabelStyle }>{ date }</p>
                <p style={ this.GraphTooltipValueStyle }>{ value } { unitName }</p>
            </div>
        );
    }
}

export default GraphTooltip;
