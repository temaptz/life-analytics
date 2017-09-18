import React, { Component } from 'react';

class TimePeriodButton extends Component {

    render() {
        const { currentPeriodName, periodName, onSetPeriod, text } = this.props;

        return (
            <button className={ currentPeriodName === periodName ? 'active' : ''}
                    onClick={ () => { onSetPeriod(periodName) } }>
                { text }
            </button>
        );
    }
}

export default TimePeriodButton;
