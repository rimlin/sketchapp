import {Vec} from '../vec';

import {BaseSession} from './BaseSession';

export class PencilSession extends BaseSession {
	start = () => {};
	update = () => {
		const {currentShape, currentPoint} = this.app;

		const pointer = Vec.sub(currentPoint, currentShape.startPoint);
		currentShape.points.push(pointer);
		this.app.updateCurrentShape(currentShape);
	};
	complete = () => {};
}
