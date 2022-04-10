import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('es-mx');

export const timeAgo = (date) => {
    const time = dayjs(date).fromNow(true)
    return time
}