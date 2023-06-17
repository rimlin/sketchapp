import Vec from 'core/vec';

import {TVec} from '../types';

import {BaseTool} from './BaseTool';

export class HandTool extends BaseTool {
	isActive = false;
	prevPoint: TVec;

	onPointerDown = () => {
		this.isActive = true;
	};

	onPointerMove = () => {
		if (this.isActive) {
			this.updatePosition();
		}
	};

	onPointerUp = () => {
		this.isActive = false;
	};

	private updatePosition = () => {
		const {currentScreenPoint} = this.app;
		const delta = Vec.sub(currentScreenPoint, this.prevPoint);

		this.app.pan(delta[0], delta[1]);

		this.prevPoint = currentScreenPoint;
	};
}
