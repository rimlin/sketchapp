import {SketchApp} from '../app';

abstract class EventCallbacks {
	onPointerDown?: () => void;
	onPointerMove?: () => void;
	onPointerUp?: () => void;
}

export class BaseTool extends EventCallbacks {
	constructor(public app: SketchApp) {
		super();
	}
}
