import {SketchApp} from '../app';

abstract class EventCallbacks {
	onPointerDown?: (event: PointerEvent) => void;
	onPointerMove?: (event: PointerEvent) => void;
	onPointerUp?: (event: PointerEvent) => void;
}

export class BaseTool extends EventCallbacks {
	constructor(public app: SketchApp) {
		super();
	}
}
