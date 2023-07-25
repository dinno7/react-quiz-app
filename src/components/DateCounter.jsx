import { useReducer, useState } from 'react';

const initials = { count: 0, step: 1 };

function reducer(state, action) {
	const actions = {
		dec: () => ({ ...state, count: state.count - state.step }),
		inc: () => ({ ...state, count: state.count + state.step }),
		counterSet: () => ({ ...state, count: action.payload }),
		stepSet: () => ({ ...state, step: action.payload }),

		reset: () => initials,
	};
	return actions[action?.type]?.();

	// switch (action.type) {
	// 	case 'dec':
	// 		return { ...state, count: state.count - state.step };
	// 	case 'inc':
	// 		return { ...state, count: state.count + state.step };
	// 	case 'counterSet':
	// 		return { ...state, count: action.payload };
	// 	case 'stepSet':
	// 		return { ...state, step: action.payload };
	// 	case 'reset':
	// 		return initials;
	// 	default:
	// 		throw new Error('Something went wrong.');
	// }
}

function DateCounter() {
	const [store, dispatch] = useReducer(reducer, initials);

	const { count, step } = store;

	// This mutates the date object.
	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + count);

	const dec = function () {
		dispatch({ type: 'dec' });
	};

	const inc = function () {
		dispatch({ type: 'inc' });
	};

	const defineCount = function (e) {
		dispatch({ type: 'counterSet', payload: +e.target.value });
	};

	const defineStep = function (e) {
		dispatch({ type: 'stepSet', payload: +e.target.value });
	};

	const reset = function () {
		dispatch({ type: 'reset' });
	};

	return (
		<div className="counter">
			<div>
				<input
					type="range"
					min="0"
					max="10"
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
