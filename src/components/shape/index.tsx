import {h} from 'preact';
import {memo} from 'preact/compat';

import {getShape} from 'core/shapes';
import {TShape} from 'core/types';

import styles from './style.scss';

type Props = {
	shape: TShape;
};

export const Shape = memo(({shape}: Props) => {
	const {component} = getShape(shape.type);

	return (
		<div
			class={styles.shape}
			style={{
				transform: `translate(${shape.startPoint[0]}px, ${shape.startPoint[1]}px)`,
				width: 100,
				height: 100,
			}}
		>
			{component({points: shape.points})}
		</div>
	);
});
