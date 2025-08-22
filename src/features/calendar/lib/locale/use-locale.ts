import { computed } from 'vue';
import { defaultLocale } from './default';
import type { CalendarLocale } from './types';

const blankLocale: CalendarLocale = {
	month: {
		long: [],
		short: [],
	},
	day: {
		long: [],
		short: [],
	},
};

const createLocale = (locale: Partial<CalendarLocale>): CalendarLocale => ({ ...defaultLocale, ...locale });

export function useLocale(locale?: Partial<CalendarLocale>) {
	return {
		locale: computed(() => createLocale(locale || defaultLocale)),
	};
}
