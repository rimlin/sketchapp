import {SessionType} from '../types';

import {PencilSession} from './PencilSession';
import {HandSession} from './HandSession';

export type TSession = PencilSession;

interface SessionMap {
	[SessionType.Pencil]: typeof PencilSession;
	[SessionType.Hand]: typeof HandSession;
}

export const getSession = <T extends SessionType>(type: T): SessionMap[T] => {
	const variants = {
		[SessionType.Pencil]: PencilSession,
		[SessionType.Hand]: HandSession,
	};

	return variants[type];
};
