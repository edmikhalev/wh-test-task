<script setup lang="ts">
import type { CalendarProps, CalendarEmits } from './types';
import { useCalendar } from '../model/use-calendar';
import { useLocale } from '../lib/locale/use-locale';

const emit = defineEmits<CalendarEmits>();
const props = defineProps<CalendarProps>();

const { month, selectedDate, dateIsSelected, selectDate, prevMonth, nextMonth } = useCalendar(props.date);
const { locale: calendarLocale } = useLocale(props.locale);

const selectDateHandle = (date: Date) => {
	selectDate(date);
	emit('select', date);
};
</script>
<template>
	<div class="ui-calendar-wrapper">
		<div class="ui-calendar">
			<div class="ui-calendar__header">
				<div class="ui-calendar__month-control">
					<button class="ui-button month-change-btn" @click="prevMonth">
						<span class="ui-icon">⯇</span>
					</button>
					<div class="month-view">
						{{ calendarLocale.month.short[selectedDate.getMonth()] }} {{ selectedDate.getFullYear() }}
					</div>
					<button class="ui-button month-change-btn" @click="nextMonth">
						<span class="ui-icon">⯈</span>
					</button>
				</div>
			</div>
			<div class="ui-calendar__body ui-calendar__grid">
				<div class="ui-calendar__cell --col" v-for="(day, idx) of calendarLocale.day.short" :key="`day_${idx}`">
					{{ day }}
				</div>
				<div
					v-for="date of month"
					:key="`date_${date.date}`"
					class="ui-calendar__cell --selecable"
					:class="{
						'--today': date.isToday,
						'--selected': dateIsSelected(date.date),
						'--isnt-selected-month': !date.dateInCurrentMonth,
					}"
					@click="selectDateHandle(date.date)"
				>
					{{ date.dayOfMonth }}
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.ui-calendar-wrapper {
	width: 360px;
	padding: 8px;
	border-radius: 6px;
	border: 1px solid var(--secondary-color);
}

.ui-calendar__month-control {
	display: flex;
	width: 100%;
	align-items: center;
	flex-grow: 1;
}
.month-view {
	flex-grow: 1;
	text-align: center;
}
.ui-calendar__grid {
	display: grid;
	grid: auto / repeat(7, 1fr);
}

.ui-calendar__cell {
	display: flex;
	justify-content: center;
	cursor: pointer;
	padding: 8px 6px;
	box-sizing: border-box;
	border-radius: 4px;

	&.--selecable {
		&:hover {
			background-color: var(--primary-color);
			color: white;
			opacity: 0.8;
		}
	}

	&.--selected {
		color: white;
		background-color: var(--primary-color);
	}

	&.--today {
		position: relative;

		&::before {
			content: '';
			width: 6px;
			height: 6px;
			top: 3px;
			border-radius: 50%;
			position: absolute;
			background-color: var(--primary-color);
		}
	}

	&.--isnt-selected-month {
		opacity: 0.6;
	}

	&.--col {
		opacity: 0.8;
		font-size: 13px;
	}
}

.month-change-btn {
	width: 52px;
}
</style>
