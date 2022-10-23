import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
export const dayJsFrom = (date: Date) => {
	return dayjs().to(dayjs(date));
};
