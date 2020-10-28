
import moment from 'moment';

export const getDayReminders = ( day, allReminders ) => {

    allReminders.push({date: moment()})


    return allReminders.filter(({date}) => {

        console.log(date.isBetween(date.startOf('day'),date.endOf('day')))

        return date.isBetween(
            moment(day.startOf('day')),
            moment(day.endOf('day'))
        )
    })
}