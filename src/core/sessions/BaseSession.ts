import {SketchApp} from '../app';

export abstract class BaseSession {
	constructor(public app: SketchApp) {}
	abstract start: () => void;
	abstract update: () => void;
	abstract complete: () => void;
}
