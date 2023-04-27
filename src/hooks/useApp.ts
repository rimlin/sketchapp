import {RefObject, createContext} from 'preact';
import {useContext} from 'preact/hooks';

import {SketchApp} from 'core/app';

export const AppContext = createContext<SketchApp>({} as SketchApp);

export const useApp = () => {
	const context = useContext(AppContext);
	return context;
};

export const CanvasRefContext = createContext<RefObject<HTMLDivElement>>(
	{} as RefObject<HTMLDivElement>,
);

export const useCanvasRef = () => {
	const context = useContext(CanvasRefContext);
	return context;
};
