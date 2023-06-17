import {AppHistory} from './history';
import {store} from './store';
import {SelectTool, HandTool, PencilTool} from './tools';
import {BaseTool} from './tools/BaseTool';
import {TBounds, TPageState, TShape, TVec, ToolType, Viewport} from './types';
import {Utils} from './utils';
import {Vec} from './vec';

export class SketchApp {
	tools: Record<ToolType, BaseTool> = {
		pencil: new PencilTool(this),
		hand: new HandTool(this),
		select: new SelectTool(this),
	};

	currentTool = this.tools.pencil;
	activeTool = store<ToolType>('pencil');
	currentPoint: TVec = [0, 0]; // Pointer relative viewport of canvas
	currentScreenPoint: TVec = [0, 0]; // Raw screen pointer

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

	history = new AppHistory();

	pageState = store<TPageState>({
		shapes: [],
	});

	shapes = store(new Map<number, TShape>());

	// Viewport management
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

	// Shapes management
	createShapes = (shapes: TShape[]) => {
		this.history.push({
			constructor: () => {
				return {
					data: {
						shapes,
						createdIds: shapes.map((item) => item.id),
					},
				};
			},
			action: ({shapes, createdIds}) => {
				this.shapes.mutate((state) => {
					shapes.forEach((shape) => {
						state.set(shape.id, shape);
					});
				});

				this.pageState.mutate((state) => {
					state.shapes.push(...createdIds);
				});
			},
			revert: ({createdIds}) => {
				this.shapes.mutate((state) => {
					createdIds.forEach((id) => {
						state.delete(id);
					});
				});

				this.pageState.mutate((state) => {
					createdIds.forEach((shapeId) => {
						state.shapes.splice(state.shapes.indexOf(shapeId), 1);
					});
				});
			},
		});
	};

	updateShapes = (patches: Partial<TShape>[], squashing?: boolean) => {
		this.history.push({
			constructor: () => {
				const updates = Object.fromEntries(
					patches.map((patch) => [patch.id, patch]),
				);
				const snapshots = Object.fromEntries(
					patches.map((patch) => [patch.id, this.getShapeById(patch.id)]),
				);

				return {
					data: {updates, snapshots},
					squashing,
				};
			},
			action: ({updates}) => {
				this.shapes.mutate((state) => {
					Object.values(updates).forEach((patch) => {
						state.set(patch.id, {
							...this.getShapeById(patch.id),
							...patch,
						});
					});
				});
			},
			revert: ({snapshots}) => {
				this.shapes.mutate((state) => {
					Object.values(snapshots).forEach((snapshot) => {
						state.set(snapshot.id, snapshot);
					});
				});
			},
			squash: (prev, next) => {
				return {
					data: {
						// keep the newest updates
						updates: {
							...prev.updates,
							...next.updates,
						},
						// keep the oldest snapshot
						snapshots: {
							...next.snapshots,
							...prev.snapshots,
						},
					},
				};
			},
		});
	};

	getShapeById = (id: number): TShape => {
		return this.shapes.peek().get(id);
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

	// Movement
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
