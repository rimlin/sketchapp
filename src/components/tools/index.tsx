import {h} from 'preact';

import {useApp} from 'hooks/useApp';

import styles from './style.scss';

export const Tools = () => {
	const {selectTool} = useApp();

	return (
		<div class={styles.tools}>
			<button onClick={() => selectTool('select')}>select</button>
			<button onClick={() => selectTool('hand')}>hand</button>
			<button onClick={() => selectTool('pencil')}>pencil</button>
		</div>
	);
};
