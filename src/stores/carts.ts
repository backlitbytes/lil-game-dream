import { writable } from 'svelte/store';
import type { SceneName } from '../games';
import { foundOne } from '../audio/sounds';
import { winnerChickenDinner } from './winner';

export interface CartData {
	hue: number;
	sat: number;
	scene: SceneName;
	selected: boolean;
	unlocked: boolean;
}

const createCartStore = () => {
	const { subscribe, update } = writable<Array<CartData>>([
		{ hue: 0, sat: 100, scene: 'Red', selected: false, unlocked: true },
		{ hue: 30, sat: 100, scene: 'Orange', selected: false, unlocked: false },
		{ hue: 60, sat: 100, scene: 'Yellow', selected: false, unlocked: false },
		{ hue: 120, sat: 100, scene: 'Green', selected: false, unlocked: false },
		{ hue: 240, sat: 60, scene: 'Blue', selected: false, unlocked: false },
		{ hue: 270, sat: 100, scene: 'Purple', selected: false, unlocked: false },
		{ hue: 0, sat: 0, scene: 'Black', selected: false, unlocked: false },
		{ hue: 0, sat: 0, scene: 'White', selected: false, unlocked: false },
		{ hue: 0, sat: 100, scene: 'RainbowForrest', selected: false, unlocked: false },
		{ hue: 0, sat: 100, scene: 'RainbowVillage', selected: false, unlocked: false },
		{ hue: 0, sat: 100, scene: 'RainbowOcean', selected: false, unlocked: false }
	]);

	return {
		subscribe,
		unlockCart: (name: SceneName) =>
			update((carts) => {
				let anyLocked = false;

				carts.forEach((cart) => {
					// unlock as needed
					if (cart.scene === name && !cart.unlocked) {
						cart.unlocked = true;
						foundOne.play();
					}

					// check if all are unlocked
					if (!cart.unlocked) {
						anyLocked = true;
					}
				});

				if (!anyLocked) {
					winnerChickenDinner.set(true);
				}

				return carts;
			}),
		removeCart: () =>
			update((carts) => {
				carts.forEach((cart) => (cart.selected = false));

				return carts;
			}),
		toggleSelect: (scene: string, select: boolean) =>
			update((carts) => {
				carts.forEach((cart) => {
					if (select && cart.scene === scene) {
						cart.selected = true;
					} else {
						cart.selected = false;
					}
				});

				return carts;
			})
	};
};

export const cartStore = createCartStore();
