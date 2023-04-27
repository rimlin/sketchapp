import {h} from 'preact';

import {TPoints} from '../types';
import styles from '../../components/app/style.scss';

export class PencilShape {
	getPath = (points: number[][]) => {
		return points.length > 1
			? `M${points[0][0]},${points[0][1]} L${points
					.slice(1)
					.map((point) => `${point[0]},${point[1]}`)
					.join(' ')}`
			: '';
	};

	Component = ({points}: {points: TPoints}) => {
		return (
			<svg class={styles.svgContainer}>
				<path
					d={this.getPath(points)}
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					stroke="#333"
					strokeWidth="4px"
				/>
			</svg>
		);
	};
}
