export let startSound: HTMLAudioElement;
export let foundOne: HTMLAudioElement;

export function loadAudio() {
	startSound = new Audio('/audio/lilgamedream-on.mp3');
	startSound.preload = 'auto';

	foundOne = new Audio('/audio/found-one.mp3');
	foundOne.preload = 'auto';
}
