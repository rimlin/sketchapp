import {signal} from '@preact/signals';
import {useEffect, useRef} from 'preact/hooks';
import {h} from 'preact';

import {SketchApp} from 'core/app';
import {getShape} from 'core/shapes';
import {ToolType} from 'core/types';
import {Utils} from 'core/utils';
import {Vec} from 'core/vec';

import styles from './style.scss';

const selectedTool = signal<ToolType>('hand');

const Tools = () => {
	return (
		<div class={styles.tools}>
			<button onClick={() => (selectedTool.value = 'select')}>select</button>
			<button onClick={() => (selectedTool.value = 'hand')}>hand</button>
			<button onClick={() => (selectedTool.value = 'pencil')}>pencil</button>
		</div>
	);
};

const cursorByTool: Record<ToolType, string> = {
	pencil: 'default',
	hand: 'move',
	select: 'default',
};

const sketchApp = new SketchApp();

const App = () => {
	const canvasRef = useRef<HTMLDivElement>(null);

	const app = useRef(sketchApp).current;
	const shapes = app.shapes;
	const viewport = app.viewport;

	useEffect(() => {
		const rect = canvasRef.current?.getBoundingClientRect();

		app.updateBounds(rect);
	}, []);

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

				const center = Utils.getPoint(event, app.bounds);
				const point = prev.offset;

				const p0 = Vec.sub(Vec.div(center, prev.zoom), point);
				const p1 = Vec.sub(Vec.div(center, zoom), point);

				app.updateViewport({
					offset: Vec.toFixed(Vec.add(point, Vec.sub(p1, p0))),
					zoom,
				});
			} else {
				const prev = viewport.peek();

				app.updateViewport({
					offset: Vec.sub(
						prev.offset,
						Vec.div([event.deltaX, event.deltaY], prev.zoom),
					),
				});
			}
		};
	}, []);

	return (
		<div
			class={styles.container}
			style={{
				'--cursor': cursorByTool[selectedTool.value],
			}}
		>
			<div
				class={styles.canvas}
				ref={canvasRef}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerLeave={onPointerLeave}
			>
				<div
					class={styles.layer}
					style={{
						transform: `
				translate(
				  ${viewport.value.offset[0] * viewport.value.zoom}px, 
				  ${viewport.value.offset[1] * viewport.value.zoom}px
				) 
				scale(${viewport.value.zoom})
			  `,
					}}
				>
					{shapes.value.map((shape, index) => {
						const {Component} = getShape(shape.type);

						return (
							<div
								key={index}
								class={styles.shape}
								style={{
									transform: `translate(${shape.startPoint[0]}px, ${shape.startPoint[1]}px)`,
									width: 100,
									height: 100,
								}}
							>
								<Component points={shape.points} />
							</div>
						);
					})}
				</div>
			</div>
			<Tools />
		</div>
	);
};

export default App;
