<script setup lang="ts">
import { computed, ref } from 'vue';
import { UiCalendar } from './features';
import AppPage from './shared/ui/AppPage.vue';
import { formatDate } from './features/calendar/lib/utils';

const currentDate = ref(new Date('2025-06-05'));

const formattedDate = computed(() => formatDate(currentDate.value));

const selectDateHandler = (date: Date) => {
	currentDate.value = date;
};
</script>

<template>
	<AppPage style="padding: 1rem">
		<div style="padding: 1rem 0">
			Выбрана дата: <b>{{ formattedDate }}</b>
		</div>
		<UiCalendar :date="formattedDate" @select="selectDateHandler" />
	</AppPage>
</template>

<style scoped></style>
