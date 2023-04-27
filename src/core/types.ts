export type ToolType = 'hand' | 'select' | 'pencil';

export type TVec = number[];
export type TPoints = TVec[];
export type TShapeType = 'pencil';

export type TShape = {
	type: TShapeType;
	startPoint: TVec;
	points: number[][];
};

export type TBounds = {
	top: number;
	left: number;
	right: number;
	bottom: number;
};

export type Viewport = {
	offset: TVec;
	zoom: number;
};

export enum SessionType {
	Pencil = 'pencil',
}
