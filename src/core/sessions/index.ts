import {SessionType} from '../types';

import {PencilSession} from './PencilSession';

export type TSession = PencilSession;

interface SessionMap {
	[SessionType.Pencil]: typeof PencilSession;
}

export const getSession = <T extends SessionType>(type: T): SessionMap[T] => {
	const variants = {
		[SessionType.Pencil]: PencilSession,
	};

	return variants[type];
};
