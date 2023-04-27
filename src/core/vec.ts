export class Vec {
	/**
	 * Clamp a value into a range.
	 * @param n
	 * @param min
	 */
	static clamp(n: number, min: number): number;
	static clamp(n: number, min: number, max: number): number;
	static clamp(n: number, min: number, max?: number): number {
		return Math.max(min, typeof max !== 'undefined' ? Math.min(n, max) : n);
	}

	/**
	 * Clamp a value into a range.
	 * @param n
	 * @param min
	 */
	static clampV(A: number[], min: number): number[];
	static clampV(A: number[], min: number, max: number): number[];
	static clampV(A: number[], min: number, max?: number): number[] {
		return A.map((n) => (max ? Vec.clamp(n, min, max) : Vec.clamp(n, min)));
	}

	/**
	 * Negate a vector.
	 * @param A
	 */
	static neg = (A: number[]): number[] => {
		return [-A[0], -A[1]];
	};

	/**
	 * Add vectors.
	 * @param A
	 * @param B
	 */
	static add = (A: number[], B: number[]): number[] => {
		return [A[0] + B[0], A[1] + B[1]];
	};

	/**
	 * Add scalar to vector.
	 * @param A
	 * @param B
	 */
	static addScalar = (A: number[], n: number): number[] => {
		return [A[0] + n, A[1] + n];
	};

	/**
	 * Subtract vectors.
	 * @param A
	 * @param B
	 */
	static sub = (A: number[], B: number[]): number[] => {
		return [A[0] - B[0], A[1] - B[1]];
	};

	/**
	 * Subtract scalar from vector.
	 * @param A
	 * @param B
	 */
	static subScalar = (A: number[], n: number): number[] => {
		return [A[0] - n, A[1] - n];
	};

	/**
	 * Vector multiplication by scalar
	 * @param A
	 * @param n
	 */
	static mul = (A: number[], n: number): number[] => {
		return [A[0] * n, A[1] * n];
	};

	/**
	 * Multiple two vectors.
	 * @param A
	 * @param B
	 */
	static mulV = (A: number[], B: number[]): number[] => {
		return [A[0] * B[0], A[1] * B[1]];
	};

	/**
	 * Vector division by scalar.
	 * @param A
	 * @param n
	 */
	static div = (A: number[], n: number): number[] => {
		return [A[0] / n, A[1] / n];
	};

	/**
	 * Vector division by vector.
	 * @param A
	 * @param n
	 */
	static divV = (A: number[], B: number[]): number[] => {
		return [A[0] / B[0], A[1] / B[1]];
	};

	/**
	 * Round a vector to two decimal places.
	 * @param a
	 */
	static toFixed = (a: number[]): number[] => {
		return a.map((v) => Math.round(v * 100) / 100);
	};
}
