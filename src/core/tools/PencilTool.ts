import {SessionType} from '../types';

import {BaseTool} from './BaseTool';

export class PencilTool extends BaseTool {
	isActive = false;

	onPointerDown = () => {
		this.isActive = true;

		this.app.addShape({
			type: 'pencil',
			startPoint: this.app.currentPoint,
			points: [[0, 0]],
		});
		this.app.startSession(SessionType.Pencil);
	};

	onPointerMove = () => {
		if (this.isActive) {
			this.app.updateSession();
		}
	};

	onPointerUp = () => {
		this.isActive = false;
		this.app.completeSession();
	};
}
