import type { CalendarLocale } from '../../lib/locale/types';

export interface CalendarProps {
	date?: string;
	locale?: Partial<CalendarLocale>;
}
