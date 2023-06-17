import Vec from 'core/vec';
import {Utils} from 'core/utils';

import {TShape, TVec} from '../types';

import {BaseTool} from './BaseTool';

export class PencilTool extends BaseTool {
	prevPoint: TVec;
	isActive = false;
	initialShape: TShape;
	canSquash = false;

	onPointerDown = () => {
		this.canSquash = false;
		this.isActive = true;

		const newShape: TShape = {
			id: Utils.getId(),
			type: 'pencil',
			startPoint: this.app.currentPoint,
			points: [[0, 0]],
		};

		this.initialShape = newShape;

		this.app.createShapes([newShape]);
	};

	onPointerMove = () => {
		if (this.isActive) {
			this.updateShape();
		}
	};

	onPointerUp = () => {
		this.isActive = false;
	};

	private updateShape = () => {
		const {currentPoint} = this.app;
		const {id} = this.initialShape;

		const currentShape = structuredClone(this.app.getShapeById(id));

		const pointer = Vec.sub(currentPoint, currentShape.startPoint);
		currentShape.points.push(pointer);

		if (this.canSquash) {
			this.app.updateShapes([currentShape], true);
		} else {
			this.app.updateShapes([currentShape]);
			this.canSquash = true;
		}
	};
}
