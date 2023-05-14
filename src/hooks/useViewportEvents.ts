import {useEffect} from 'preact/hooks';

import {Utils} from 'core/utils';
import {Vec} from 'core/vec';

import {useApp, useCanvasRef} from './useApp';

export const useViewportEvents = () => {
	const {viewport, bounds, updateBounds, updateViewport, pan} = useApp();
	const canvasRef = useCanvasRef();

	useEffect(() => {
		const rect = canvasRef.current?.getBoundingClientRect();
		updateBounds(rect);
	}, []);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		canvasRef.current.onwheel = (event: WheelEvent) => {
			event.preventDefault();
			event.stopPropagation();

			if (event.ctrlKey) {
				const speedFactor =
					(event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 10;

				const prev = viewport.peek();

				const pinchDelta = -event.deltaY * speedFactor;
				const zoom = Math.min(
					2,
					Math.max(0.1, prev.zoom * Math.pow(2, pinchDelta)),
				);

				const center = Utils.getRelativePoint(event, bounds);
				const point = prev.offset;

				const p0 = Vec.sub(Vec.div(center, prev.zoom), point);
				const p1 = Vec.sub(Vec.div(center, zoom), point);

				updateViewport({
					offset: Vec.toFixed(Vec.add(point, Vec.sub(p1, p0))),
					zoom,
				});
			} else {
				const delta = Vec.neg([event.deltaX, event.deltaY]);

				pan(delta[0], delta[1]);
			}
		};
	}, []);
};
