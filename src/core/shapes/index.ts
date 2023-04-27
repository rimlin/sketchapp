import {TShapeType} from '../types';

import {PencilShape} from './PencilShape';

export const getShape = (type: TShapeType) => {
	const pencilShape = new PencilShape();

	const variants: Record<TShapeType, PencilShape> = {
		pencil: pencilShape,
	};

	return variants[type];
};
