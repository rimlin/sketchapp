import {TVec} from 'core/types';

import {Vec} from '../vec';

import {BaseSession} from './BaseSession';

export class HandSession extends BaseSession {
	prevPoint: TVec;

	start = () => {
		this.prevPoint = this.app.currentScreenPoint;
	};

	update = () => {
		const {currentScreenPoint} = this.app;
		const delta = Vec.sub(currentScreenPoint, this.prevPoint);

		this.app.pan(delta[0], delta[1]);

		this.prevPoint = currentScreenPoint;
	};
	complete = () => {};
}
