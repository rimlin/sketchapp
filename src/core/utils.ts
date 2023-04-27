import {TBounds} from './types';

export class Utils {
	static getPoint = (
		e: PointerEvent | Touch | WheelEvent,
		rect: TBounds,
	): number[] => {
		return [+e.clientX.toFixed(2) - rect.left, +e.clientY.toFixed(2) - rect.top];
	};
}
