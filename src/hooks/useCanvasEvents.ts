import {useMemo} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';

import {SketchApp} from 'core/app';

export const useCanvasEvents = (
	app: SketchApp,
): Partial<JSXInternal.DOMAttributes<HTMLDivElement>> => {
	const onPointerDown = (event: PointerEvent) => {
		if (event.buttons > 1) {
			return;
		}

		app.onPointerDown(event);

		event.preventDefault();
	};

	const onPointerMove = (event: PointerEvent) => {
		app.onPointerMove(event);
	};

	const onPointerUp = (event: PointerEvent) => {
		app.onPointerUp(event);
	};

	const onPointerLeave = (event: PointerEvent) => {
		console.log(event);
	};

	const memo = useMemo(
		() => ({
			onPointerDown,
			onPointerMove,
			onPointerUp,
			onPointerLeave,
		}),
		[],
	);

	return memo;
};
