import {signal} from '@preact/signals';

export const store = <T>(initialValue: T) => {
	const sig = signal<T>(initialValue);

	const set = (newValue: T): void => {
		if (newValue !== sig.peek()) {
			sig.value = newValue;
		}
	};

	const update = (updateFn: (value: T) => T) => {
		set(updateFn(sig.peek()));
	};

	const patch = (patch: Partial<T>) => {
		update((prevValue) => ({
			...prevValue,
			...patch,
		}));
	};

	const mutate = (mutator: (value: T) => void) => {
		const clone = structuredClone(sig.peek());
		mutator(clone);
		set(clone);
	};

	return Object.assign(sig, {
		set,
		update,
		patch,
		mutate,
	});
};
