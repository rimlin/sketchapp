import {Vec} from '../vec';

import {BaseSession} from './BaseSession';

export class PencilSession extends BaseSession {
	start = () => {};
	update = () => {
		const {currentShape, currentPoint, updateCurrentShape} = this.app;

		const pointer = Vec.sub(currentPoint, currentShape.startPoint);
		currentShape.points.push(pointer);
		updateCurrentShape(currentShape);
	};
	complete = () => {};
}
