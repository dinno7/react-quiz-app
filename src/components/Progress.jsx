function Progress({
	questionsLength,
	questionIndex,
	maxPointsPossible,
	points,
	answer,
}) {
	return (
		<header className="progress">
			<progress
				max={questionsLength}
				value={questionIndex + Number(answer !== null)}
			/>
			<p>
				<strong>{questionIndex + 1}</strong> / {questionsLength}
			</p>
			<p>
				<strong>{points}</strong> / {maxPointsPossible}
			</p>
		</header>
	);
}

export default Progress;
