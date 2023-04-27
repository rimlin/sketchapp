import {TSession, getSession} from './sessions';
import {store} from './store';
import {PencilTool} from './tools/PencilTool';
import {SessionType, TBounds, TShape, ToolType, Viewport} from './types';
import {Utils} from './utils';
import {Vec} from './vec';

export class SketchApp {
	tools = {
		pencil: new PencilTool(this),
	};

	session?: TSession;
	currentTool = this.tools.pencil;
	activeTool = store<ToolType>('pencil');
	currentPoint = [0, 0];

	bounds: TBounds = {
		top: 0,
		left: 0,
		right: 100,
		bottom: 100,
	};
	viewport = store<Viewport>({
		offset: [0, 0],
		zoom: 1,
	});

	shapes = store<TShape[]>([]);

	startSession = (type: SessionType) => {
		const Session = getSession(type);
		this.session = new Session(this);
		this.session.start();
	};

	updateSession = () => {
		const {session} = this;

		if (!session) return;

		session.update();
	};

	completeSession = () => {
		const {session} = this;

		if (!session) return;

		this.session = undefined;
		session.complete();
	};

	updateCurrentPoint = (event: PointerEvent) => {
		const {bounds, viewport} = this;

		this.currentPoint = Vec.sub(
			Vec.div(Utils.getPoint(event, bounds), viewport.peek().zoom),
			viewport.peek().offset,
		);
	};

	updateBounds = (bounds: DOMRect) => {
		this.bounds = bounds;
	};

	updateViewport = (viewport: Partial<Viewport>) => {
		this.viewport.patch(viewport);
	};

	addShape = (shape: TShape) => {
		this.shapes.mutate((shapes) => {
			shapes.push(shape);
		});
	};

	get currentShape() {
		return this.shapes.peek().at(-1);
	}

	updateCurrentShape = (patch: Partial<TShape>) => {
		this.shapes.mutate((shapes) => {
			shapes[shapes.length - 1] = {
				...this.currentShape,
				...patch,
			};
		});
	};

	selectTool = (tool: ToolType) => {
		this.activeTool.set(tool);
		this.currentTool = this.tools[tool];
	};

	// Events
	onPointerDown = (event: PointerEvent) => {
		this.updateCurrentPoint(event);
		this.currentTool.onPointerDown();
	};

	onPointerMove = (event: PointerEvent) => {
		this.updateCurrentPoint(event);
		this.currentTool.onPointerMove();
	};

	onPointerUp = (event: PointerEvent) => {
		this.updateCurrentPoint(event);
		this.currentTool.onPointerUp();
	};
}
