import { controlsStore } from './controls-store';

type InputEvent = {
	id: number | string;
	control: string;
};

const activeEvents: InputEvent[] = [];

export const registerInputDown = (event: MouseEvent | TouchEvent, control: string) => {
	let id: number | string;

	if (event instanceof TouchEvent) {
		id = event.touches[0].identifier;
	} else {
		id = 'mouse'; // For mouse events, use a constant identifier
	}

	controlsStore.update((state) => ({ ...state, [control]: true }));

	activeEvents.push({ id, control });
};

export const handleInputUp = (event: MouseEvent | TouchEvent) => {
	let id: number | string;

	if (event instanceof TouchEvent && event.changedTouches.length > 0) {
		id = event.changedTouches[0].identifier;
	} else {
		id = 'mouse';
	}

	const index = activeEvents.findIndex((e) => e.id === id);
	if (index > -1) {
		const { control } = activeEvents[index];

		controlsStore.update((state) => ({ ...state, [control]: false }));

		activeEvents.splice(index, 1);
	}
};
