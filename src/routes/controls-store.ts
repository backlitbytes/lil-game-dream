import { writable } from 'svelte/store';

export type ValidDPad = 'ArrowRight' | 'ArrowDown' | 'ArrowLeft' | 'ArrowUp';

export type ValidInput = ValidDPad | 'a' | 'b' | 'Escape' | 'Enter' | 'None';

const buttons: ValidInput[] = [
	'ArrowRight',
	'ArrowDown',
	'ArrowLeft',
	'ArrowUp',
	'a',
	'b',
	'Escape',
	'Enter'
];

export type ControlState = Partial<Record<ValidInput, boolean>>;

const createControlsStore = () => {
	const { subscribe, update } = writable<ControlState>({});
	buttons.forEach((button) => {
		update((n) => ({ ...n, [button]: false }));
	});

	if (typeof window !== 'undefined') {
		window.addEventListener('keydown', (event) => {
			if (buttons.includes(event.key as ValidInput)) {
				update((n) => ({ ...n, [event.key]: true }));
			}
		});

		window.addEventListener('keyup', (event) => {
			if (buttons.includes(event.key as ValidInput)) {
				update((n) => ({ ...n, [event.key]: false }));
			}
		});
	}

	return {
		subscribe,
		update
	};
};

export const controlsStore = createControlsStore();
