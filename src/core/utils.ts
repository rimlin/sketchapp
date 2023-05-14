import {TBounds} from './types';
import Vec from './vec';

let globalId = 0;

export class Utils {
	static getPoint = (e: PointerEvent | Touch | WheelEvent): number[] => {
		return [+e.clientX.toFixed(2), +e.clientY.toFixed(2)];
	};

	static getRelativePoint = (
		e: PointerEvent | Touch | WheelEvent,
		rect: TBounds,
	): number[] => {
		return Vec.sub(Utils.getPoint(e), [rect.left, rect.top]);
	};

	static getId = () => {
		return globalId++;
	};
}
