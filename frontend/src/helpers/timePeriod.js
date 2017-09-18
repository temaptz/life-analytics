import * as timePeriods from '../constants/TimePeriods';
import moment from 'moment';

// Получить пределы времени из названия временного промежутка
export function getTimeLimitsByPeriodName(periodName) {

    const timeFrom = moment(),
        timeTo = moment();

    let noLimit = false;

    switch ( periodName ) {
        case ( timePeriods.PERIOD_WEEK ):
            timeFrom.subtract(1, 'weeks');
            break;

        case ( timePeriods.PERIOD_MONTH ):
            timeFrom.subtract(1, 'months');
            break;

        case ( timePeriods.PERIOD_YEAR ):
            timeFrom.subtract(1, 'years');
            break;

        case ( timePeriods.PERIOD_ALL ):
            timeFrom.subtract(0, 'days');
            noLimit = true;
            break;

        default:
            timeFrom.subtract(0, 'days');
            break;
    }

    return {
        momentFrom : timeFrom,
        momentTo   : timeTo,
        from       : timeFrom.format(),
        to         : timeTo.format(),
        unixFrom   : timeFrom.unix(),
        unixTo     : timeTo.unix(),
        noLimit    : noLimit
    }
}