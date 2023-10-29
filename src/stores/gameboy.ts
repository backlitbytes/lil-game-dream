import { writable } from 'svelte/store';

export let gameboyElemRef: HTMLDivElement | null = null;
export function assignGameboyRef(ref: HTMLDivElement | null) {
	gameboyElemRef = ref;
}

export function getGameLoadingSpotAbove() {
	if (!gameboyElemRef) {
		return { top: 0, left: 0 };
	}
	const { top, left } = gameboyElemRef.getBoundingClientRect();
	return { top: top - 60, left: left + 70 };
}

export function getGameLoadedSpot() {
	if (!gameboyElemRef) {
		return { top: 0, left: 0 };
	}
	const { top, left } = gameboyElemRef.getBoundingClientRect();
	return { top: top - 20, left: left + 70 };
}

export interface GameboyStore {
	hue: number;
	sat: number;
}

export const gameboyStore = writable<GameboyStore>({
	hue: 0,
	sat: 0
});

export function updateHue(updates: Partial<GameboyStore>) {
	gameboyStore.update((value) => ({ ...value, ...updates }));
}

export function bumpHue() {
	gameboyStore.update((value) => ({ ...value, hue: value.hue + 1 }));
}

export const isOn = writable(false);
