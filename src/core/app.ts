import {TSession, getSession} from './sessions';
import {store} from './store';
import {HandTool} from './tools/HandTool';
import {PencilTool} from './tools/PencilTool';
import {SessionType, TBounds, TShape, ToolType, Viewport} from './types';
import {Utils} from './utils';
import {Vec} from './vec';

export class SketchApp {
	tools = {
		pencil: new PencilTool(this),
		hand: new HandTool(this),
	};

	session?: TSession;
	currentTool = this.tools.pencil;
	activeTool = store<ToolType>('pencil');
	currentPoint = [0, 0]; // Pointer relative viewport of canvas
	currentScreenPoint = [0, 0]; // Raw screen pointer

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

		this.currentScreenPoint = Utils.getPoint(event);
		this.currentPoint = Vec.sub(
			Vec.div(Utils.getRelativePoint(event, bounds), viewport.peek().zoom),
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

	get cameraCenterPoint() {
		const {offset} = this.viewport.value;
		const {bounds} = this;

		const abs = Vec.div(
			Vec.sub([bounds.bottom, bounds.right], [bounds.top, bounds.left]),
			2,
		);

		return Vec.add(abs, offset);
	}

	pan = (dx: number, dy: number) => {
		const {viewport} = this;
		const prev = viewport.peek();

		const diff = Vec.add(prev.offset, Vec.div([dx, dy], prev.zoom));

		this.updateViewport({
			offset: diff,
		});
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
