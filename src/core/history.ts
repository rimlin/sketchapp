import {devFreeze} from './store';

type THistoryCommand<
	TData = unknown,
	FnPrepare = () => {
		data: TData;
		squashing?: boolean;
	},
> = {
	constructor: FnPrepare;
	action: (args: TData) => void;
	revert: (args: TData) => void;
	squash?: (
		prev: TData,
		next: TData,
	) => {
		data: TData;
	};
};

type THistoryStackCommand<TData = unknown> = {
	data: TData;
	action: (args: TData) => void;
	revert: (args: TData) => void;
};

export class AppHistory {
	// rename to "commands"
	// create data structure "stack"
	// commands should be array of stack
	// if i want "combine" commands, i push to current stack a new command
	// if i want "squashing" commands, i update data of "tail" object of current stack
	stack: THistoryStackCommand[] = [];
	position = -1;

	push = <T>(historyCommand: THistoryCommand<T>) => {
		const {data, squashing} = historyCommand.constructor();

		historyCommand.action(data);

		if (squashing) {
			const prev = this.stack[this.position].data as T;

			this.stack[this.position].data = devFreeze(
				historyCommand.squash(prev, data).data,
			);
		} else {
			if (this.position < this.stack.length - 1) {
				this.stack.splice(this.position + 1);
			}

			this.position++;

			this.stack.push({
				data: devFreeze(data),
				action: historyCommand.action,
				revert: historyCommand.revert,
			});
		}
	};

	forward = () => {
		if (this.position >= this.stack.length - 1) {
			return;
		}

		this.position++;

		const historyCommand = this.stack[this.position];

		historyCommand.action.call(historyCommand.action, historyCommand.data);

		console.log('forward', this.position, this.stack);
	};

	back = () => {
		if (this.position < 0) {
			this.position = -1;
			return;
		}

		const historyCommand = this.stack[this.position];

		historyCommand.revert.call(historyCommand.revert, historyCommand.data);

		this.position--;

		console.log('back', this.position, this.stack);
	};
}
