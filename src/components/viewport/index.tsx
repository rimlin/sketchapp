import {h} from 'preact';

import {useApp} from 'hooks/useApp';
import {useViewportEvents} from 'hooks/useViewportEvents';
import {Shape} from 'components/shape';

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
			{shapes.value.map((shape) => (
				<Shape key={shape.id} shape={shape} />
			))}
		</div>
	);
};
