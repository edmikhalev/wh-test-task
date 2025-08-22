# test-task-wh-calendar

Тестовое задание "Календарь" развернут на: https://edmikhalev.github.io/wh-test-task/

# Как использовать UiCalendar

Импортировать компонент UiCalendar из features:

```TypeScript
import { UiCalendar } from '@/features'
```

Добавить компонент в шаблон

```html
<UiCalendar :date="formattedDate" @select="selectHandle" :locale="{}" />
```

```TypeScript

/**
Ожидает строку формат может быть любой удобоваримый для создания даты(валидации не добавлял)
:date

 * locale:
 * ожидает объект формата(валидации и прочего нет,поэтому, для другого языка нужно заполнить short-поля полностью):
	month: {
		short: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
		long: [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		],
	},
	day: {
		short: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
		long: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
	},
    @select - вернёт выбранную дату
 * */
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
