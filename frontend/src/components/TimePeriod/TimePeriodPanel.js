import React, { Component } from 'react';
import * as timePeriods from '../../constants/TimePeriods';
import TimePeriodButton from "./TimePeriodButton";

class TimePeriodPanel extends Component {

    render() {
        const { currentPeriodName, onSetPeriod } = this.props;

        return (
            <div>

                <TimePeriodButton currentPeriodName={ currentPeriodName }
                                  periodName={ timePeriods.PERIOD_ALL }
                                  onSetPeriod={ onSetPeriod }
                                  text="Вся история" />

                <TimePeriodButton currentPeriodName={ currentPeriodName }
                                  periodName={ timePeriods.PERIOD_YEAR }
                                  onSetPeriod={ onSetPeriod }
                                  text="Год" />

                <TimePeriodButton currentPeriodName={ currentPeriodName }
                                  periodName={ timePeriods.PERIOD_MONTH }
                                  onSetPeriod={ onSetPeriod }
                                  text="Месяц" />

                <TimePeriodButton currentPeriodName={ currentPeriodName }
                                  periodName={ timePeriods.PERIOD_WEEK }
                                  onSetPeriod={ onSetPeriod }
                                  text="Неделя" />

                { currentPeriodName }

            </div>
        );
    }
}

export default TimePeriodPanel;
