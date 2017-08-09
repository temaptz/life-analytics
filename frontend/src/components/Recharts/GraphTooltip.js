import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GraphTooltip.scss';
import moment from 'moment';

class GraphTooltip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unitName   : props.Graph.unitName,
        };
    }

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
        if ( !this.props.payload || this.props.payload.length === 0 ) {
            return null;
        }

        let label = moment.unix(this.props.label).format('DD.MM.YYYY HH:mm'),
            value = this.props.payload[0].value;

        return (
            <div style={this.GraphTooltipStyle}>
                <p style={this.GraphTooltipLabelStyle}>{label}</p>
                <p style={this.GraphTooltipValueStyle}>{value} <span dangerouslySetInnerHTML={{__html: this.state.unitName}}></span></p>
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(GraphTooltip);
