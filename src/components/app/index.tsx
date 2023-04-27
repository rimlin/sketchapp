import {useRef} from 'preact/hooks';
import {h} from 'preact';

import {SketchApp} from 'core/app';
import {ToolType} from 'core/types';
import {Viewport} from 'components/viewport';
import {AppContext, CanvasRefContext} from 'hooks/useApp';
import {useCanvasEvents} from 'hooks/useCanvasEvents';
import {Tools} from 'components/tools';

import styles from './style.scss';

const cursorByTool: Record<ToolType, string> = {
	pencil: 'default',
	hand: 'move',
	select: 'default',
};

const sketchApp = new SketchApp();

export const App = () => {
	const canvasRef = useRef<HTMLDivElement>(null);
	const app = useRef(sketchApp).current;

	const canvasEvents = useCanvasEvents(app);

	return (
		<AppContext.Provider value={app}>
			<CanvasRefContext.Provider value={canvasRef}>
				<div
					class={styles.container}
					style={{
						'--cursor': cursorByTool[app.activeTool.value],
					}}
				>
					<div class={styles.canvas} ref={canvasRef} {...canvasEvents}>
						<Viewport />
					</div>
					<Tools />
				</div>
			</CanvasRefContext.Provider>
		</AppContext.Provider>
	);
};
