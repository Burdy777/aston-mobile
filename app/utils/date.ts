import Moment from 'moment';

export const transformDate = (date, format)=> {
    return Moment(date).format(format)
}