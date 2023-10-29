import Phaser from 'phaser';
import { controlsStore, type ControlState } from '../stores/controls';
import { cartStore } from '../stores/carts';

export const colorHex = {
	red: '#FF0000',
	green: '#008000',
	blue: '#0000FF',
	yellow: '#FFFF00',
	orange: '#FFA500',
	purple: '#800080',
	pink: '#FFC0CB',
	teal: '#008080',
	brown: '#A52A2A',
	gray: '#808080',
	darkgray: '#2f2f2f',
	white: '#FFFFFF',
	black: '#000000'
};

let controlsState: Partial<ControlState> = {};
controlsStore.subscribe((state) => {
	controlsState = state;
});

export type SceneName =
	| 'Blank'
	| 'Red'
	| 'Orange'
	| 'Yellow'
	| 'Green'
	| 'Blue'
	| 'Purple'
	| 'Black'
	| 'White'
	| 'RainbowLake'
	| 'RainbowForrest'
	| 'RainbowVillage'
	| 'RainbowOcean';

let SPEED = 1;

class ColoredSquare extends Phaser.GameObjects.Rectangle {
	public hexColor: number;

	constructor(scene: Phaser.Scene, x: number, y: number, color: string) {
		super(scene, x, y, 32, 32, Phaser.Display.Color.HexStringToColor(color).color);
		this.hexColor = Phaser.Display.Color.HexStringToColor(color).color;

		// Add a black outline
		this.setStrokeStyle(2, 0x000000); // 2 is the line width, 0x000000 is black in hex

		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setInteractive();
	}
}

let game: Phaser.Game;
export function initializeGame(parent: string): Phaser.Game {
	const config: Phaser.Types.Core.GameConfig = {
		type: Phaser.AUTO,
		scale: {
			mode: Phaser.Scale.RESIZE,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		physics: {
			default: 'arcade',
			arcade: {
				debug: false
			}
		},
		width: 100,
		height: 100,
		parent,
		backgroundColor: '#000',
		scene: [
			Blank,
			Red,
			Orange,
			Yellow,
			Green,
			Blue,
			Purple,
			Black,
			White,
			RainbowForrest,
			RainbowOcean,
			RainbowVillage
		]
	};

	game = new Phaser.Game(config);

	return game;
}

let currentScene: SceneName = 'Blank';
export function switchScene(newSceneKey: SceneName) {
	game.scene.stop(currentScene);
	currentScene = newSceneKey;
	game.scene.start(newSceneKey);
}

let square: Phaser.GameObjects.Rectangle;

function controlSquare() {
	const speed = controlsState.b ? SPEED / 2 : controlsState.a ? SPEED * 2 : SPEED;

	if (controlsState.ArrowLeft) {
		square.x -= speed;
	} else if (controlsState.ArrowRight) {
		square.x += speed;
	}

	if (controlsState.ArrowUp) {
		square.y -= speed;
	} else if (controlsState.ArrowDown) {
		square.y += speed;
	}
}

class Blank extends Phaser.Scene {
	constructor() {
		super({ key: 'Blank' });
	}
}

let lastUnlocked: SceneName;
function unlock(name: SceneName, boot = true) {
	if (name !== lastUnlocked) {
		lastUnlocked = name;
		cartStore.unlockCart(name);
		if (boot) {
			cartStore.removeCart();
		}
	}
}

class Red extends Phaser.Scene {
	constructor() {
		super({ key: 'Red' });
	}

	preload() {
		this.load.image('Red', '/images/Red.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'Red').setOrigin(0, 0);
		square = new ColoredSquare(this, 500, 192, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.7);

		this.physics.add.overlap(square, [new ColoredSquare(this, 500, 900, colorHex.orange)], () => {
			unlock('Orange');
		});
	}

	update() {
		controlSquare();
	}
}

class Orange extends Phaser.Scene {
	constructor() {
		super({ key: 'Orange' });
	}

	preload() {
		this.load.image('Orange', '/images/Orange.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'Orange').setOrigin(0, 0);
		square = new ColoredSquare(this, 552, 886, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.7);

		this.physics.add.overlap(square, [new ColoredSquare(this, 532, 156, colorHex.yellow)], () => {
			unlock('Yellow');
		});
	}

	update() {
		controlSquare();
	}
}

class Yellow extends Phaser.Scene {
	constructor() {
		super({ key: 'Yellow' });
	}

	preload() {
		this.load.image('Yellow', '/images/Yellow.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'Yellow').setOrigin(0, 0);
		square = new ColoredSquare(this, 512, 984, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.7);

		this.physics.add.overlap(square, [new ColoredSquare(this, 532, 156, colorHex.green)], () => {
			unlock('Green');
		});
	}

	update() {
		controlSquare();
	}
}

class Green extends Phaser.Scene {
	constructor() {
		super({ key: 'Green' });
	}

	preload() {
		this.load.image('Green', '/images/Green.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'Green').setOrigin(0, 0);
		square = new ColoredSquare(this, 362, 188, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.7);

		this.physics.add.overlap(square, [new ColoredSquare(this, 724, 850, colorHex.blue)], () => {
			unlock('Blue');
		});
	}

	update() {
		controlSquare();
	}
}

class Blue extends Phaser.Scene {
	constructor() {
		super({ key: 'Blue' });
	}

	preload() {
		this.load.image('Blue', '/images/Blue.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'Blue').setOrigin(0, 0);
		square = new ColoredSquare(this, 470, 60, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.7);

		this.physics.add.overlap(square, [new ColoredSquare(this, 452, 744, colorHex.purple)], () => {
			unlock('Purple');
		});
	}

	update() {
		controlSquare();
	}
}

class Purple extends Phaser.Scene {
	constructor() {
		super({ key: 'Purple' });
	}

	preload() {
		this.load.image('Purple', '/images/Purple.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'Purple').setOrigin(0, 0);
		square = new ColoredSquare(this, 514, 344, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.7);

		this.physics.add.overlap(square, [new ColoredSquare(this, 514, 882, colorHex.black)], () => {
			unlock('Black');
		});
	}

	update() {
		controlSquare();
	}
}

class Black extends Phaser.Scene {
	constructor() {
		super({ key: 'Black' });
	}

	preload() {
		this.load.image('Black', '/images/Black.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'Black').setOrigin(0, 0);
		square = new ColoredSquare(this, 380, 802, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.7);

		this.physics.add.overlap(square, [new ColoredSquare(this, 510, 60, colorHex.white)], () => {
			unlock('White');
		});
	}

	update() {
		controlSquare();
	}
}

class White extends Phaser.Scene {
	constructor() {
		super({ key: 'White' });
	}

	preload() {
		this.load.image('White', '/images/White.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'White').setOrigin(0, 0);
		square = new ColoredSquare(this, 808, 50, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.7);

		this.physics.add.overlap(square, [new ColoredSquare(this, 264, 98, colorHex.white)], () => {
			unlock('RainbowForrest', false);
		});

		this.physics.add.overlap(square, [new ColoredSquare(this, 416, 954, colorHex.white)], () => {
			unlock('RainbowOcean', false);
		});

		this.physics.add.overlap(square, [new ColoredSquare(this, 118, 438, colorHex.white)], () => {
			unlock('RainbowVillage', false);
		});
	}

	update() {
		controlSquare();
	}
}

class RainbowForrest extends Phaser.Scene {
	constructor() {
		super({ key: 'RainbowForrest' });
	}

	preload() {
		this.load.image('RainbowForrest', '/images/RainbowForrest.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'RainbowForrest').setOrigin(0, 0);
		square = new ColoredSquare(this, 380, 802, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.4);
	}

	update() {
		this.cameras.main.setZoom(this.cameras.main.zoom - 0.001);
		controlSquare();
	}
}

class RainbowOcean extends Phaser.Scene {
	constructor() {
		super({ key: 'RainbowOcean' });
	}

	preload() {
		this.load.image('RainbowOcean', '/images/RainbowOcean.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'RainbowOcean').setOrigin(0, 0);
		square = new ColoredSquare(this, 380, 802, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.4);
		this.cameras.main.setZoom(this.cameras.main.zoom - 0.001);
	}

	update() {
		controlSquare();
	}
}

class RainbowVillage extends Phaser.Scene {
	constructor() {
		super({ key: 'RainbowVillage' });
	}

	preload() {
		this.load.image('RainbowVillage', '/images/RainbowVillage.png');
	}

	create(this: Phaser.Scene) {
		this.add.image(0, 0, 'RainbowVillage').setOrigin(0, 0);
		square = new ColoredSquare(this, 380, 802, colorHex.white);
		this.cameras.main.startFollow(square);
		this.cameras.main.setZoom(0.4);
		this.cameras.main.setZoom(this.cameras.main.zoom - 0.001);
	}

	update() {
		controlSquare();
	}
}
