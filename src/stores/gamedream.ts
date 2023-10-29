import { writable } from 'svelte/store';

export let gamedreamElemRef: HTMLDivElement | null = null;
export function assignGamedreamRef(ref: HTMLDivElement | null) {
	gamedreamElemRef = ref;
}

export function getGameLoadingSpotAbove() {
	if (!gamedreamElemRef) {
		return { top: 0, left: 0 };
	}
	const { top, left } = gamedreamElemRef.getBoundingClientRect();
	return { top: top - 60, left: left + 70 };
}

export function getGameLoadedSpot() {
	if (!gamedreamElemRef) {
		return { top: 0, left: 0 };
	}
	const { top, left } = gamedreamElemRef.getBoundingClientRect();
	return { top: top - 20, left: left + 70 };
}

export interface gamedreamStore {
	hue: number;
	sat: number;
}

export const gamedreamStore = writable<gamedreamStore>({
	hue: 0,
	sat: 0
});

export function updateHue(updates: Partial<gamedreamStore>) {
	gamedreamStore.update((value) => ({ ...value, ...updates }));
}

export function bumpHue() {
	gamedreamStore.update((value) => ({ ...value, hue: value.hue + 1 }));
}

export const isOn = writable(false);
