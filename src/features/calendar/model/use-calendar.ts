import { computed, ref, watch } from 'vue';
import type { CalendarDay } from './types';

const getDayOfWeekStart = (date: Date) => {
	const currentDate = new Date(date);
	const day = currentDate.getDay();
	return new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		currentDate.getDate() - day + (day === 0 ? -6 : 1),
	);
};

const getDayOfWeekEnd = (date: Date) => {
	const currentDate = new Date(date);
	const day = currentDate.getDay();
	return new Date(currentDate.getFullYear(), currentDate.getMonth(), date.getDate() - day + (day === 0 ? 0 : 7));
};

const getDayOfMonthStart = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const getDayOfMonthEnd = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

const getDatesRange = (date: Date) => {
	const currentDate = new Date(date);
	return [getDayOfWeekStart(getDayOfMonthStart(currentDate)), getDayOfWeekEnd(getDayOfMonthEnd(currentDate))];
};

const getWeeksInMonth = <T>(start: Date, end: Date, cb: (date: Date) => T) => {
	const startDate = new Date(start);
	const endDate = new Date(end);

	const month: T[] = [];

	while (startDate <= endDate) {
		month.push(cb(new Date(startDate)));
		startDate.setDate(startDate.getDate() + 1);
	}

	return month;
};

const isCurrentMonth = (date: Date) => {
	const today = new Date();
	return today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth();
};

const isToday = (date: Date) => {
	const today = new Date();
	return isCurrentMonth(date) && today.getDate() === date.getDate();
};

const generateMonthCalendar = (generateFromDate: Date) => {
	const [start, end] = getDatesRange(generateFromDate);
	const today = new Date();

	return getWeeksInMonth<CalendarDay>(start, end, (date: Date) => {
		return {
			date,
			dayOfMonth: date.getDate(),
			isToday: isToday(date),
			isCurrentMonth: isCurrentMonth(date),
			dateInCurrentMonth:
				generateFromDate.getFullYear() === date.getFullYear() &&
				generateFromDate.getMonth() === date.getMonth(),
		} as CalendarDay;
	});
};

export function useCalendar(date?: string) {
	const selectedDate = ref(date ? new Date(date) : new Date());

	const month = computed(() => generateMonthCalendar(selectedDate.value));

	const selectDate = (newDate: Date) => {
		selectedDate.value = newDate;
	};

	const changeMonth = (dir: 1 | -1) => {
		selectedDate.value = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth() + dir);
	};

	const dateIsSelected = (date: Date) => {
		return (
			selectedDate.value.getMonth() === date.getMonth() &&
			selectedDate.value.getFullYear() === date.getFullYear() &&
			selectedDate.value.getDate() === date.getDate()
		);
	};

	const dateInSelectedMonth = (date: Date) =>
		selectedDate.value.getMonth() === date.getMonth() && selectedDate.value.getFullYear() === date.getFullYear();

	const prevMonth = () => changeMonth(-1);

	const nextMonth = () => changeMonth(1);

	watch(
		() => date,
		(newDate: string | undefined) => {
			if (newDate) {
				selectDate(new Date(newDate));
			}
		},
		{
			immediate: true,
		},
	);
	return {
		month,
		selectedDate,
		dateInSelectedMonth,
		dateIsSelected,
		selectDate,
		prevMonth,
		nextMonth,
	};
}
