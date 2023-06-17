import {h} from 'preact';

import {useApp} from 'hooks/useApp';
import {useViewportEvents} from 'hooks/useViewportEvents';
import {Shape} from 'components/shape';

import styles from './style.scss';

export const Viewport = () => {
	const app = useApp();
	const shapes = app.pageState.value.shapes;
	const viewport = app.viewport;
	app.shapes.value;

	useViewportEvents();

	console.log('render shapes', shapes);
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
			{shapes.map((shapeId) => (
				<Shape key={shapeId} shape={app.getShapeById(shapeId)} />
			))}
		</div>
	);
};
