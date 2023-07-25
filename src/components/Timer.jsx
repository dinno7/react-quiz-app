import { useEffect } from 'react';

function Timer({ dispatch, time }) {
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;
	useEffect(() => {
		const interval = setInterval(() => {
			dispatch({ type: 'tick' });
		}, 1000);

		return () => clearInterval(interval);
	}, []);
	return (
		<div className="timer">
			{time >= 60 && (
				<>
					<span>{minutes < 10 ? '0' + minutes : minutes}</span> <span> : </span>
				</>
			)}
			<span>{seconds < 10 ? '0' + seconds : seconds}</span>
		</div>
	);
}

export default Timer;
