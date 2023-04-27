import {h} from 'preact';

import {TPoints} from 'core/types';

export class PencilShape {
	getPath = (points: number[][]) => {
		return points.length > 1
			? `M${points[0][0]},${points[0][1]} L${points
					.slice(1)
					.map((point) => `${point[0]},${point[1]}`)
					.join(' ')}`
			: '';
	};

	component = ({points}: {points: TPoints}) => {
		return (
			<svg class="svgContainer">
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
