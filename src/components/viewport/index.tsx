import {h} from 'preact';

import {getShape} from 'core/shapes';
import {useApp} from 'hooks/useApp';
import {useViewportEvents} from 'hooks/useViewportEvents';

import styles from './style.scss';

export const Viewport = () => {
	const app = useApp();
	const shapes = app.shapes;
	const viewport = app.viewport;

	useViewportEvents();

	return (
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
	);
};
