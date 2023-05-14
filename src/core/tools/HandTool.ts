import {SessionType} from '../types';

import {BaseTool} from './BaseTool';

export class HandTool extends BaseTool {
	isActive = false;

	onPointerDown = () => {
		this.isActive = true;

		this.app.startSession(SessionType.Hand);
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
