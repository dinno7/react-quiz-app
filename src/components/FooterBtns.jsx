function FooterBtns({ questionIndex, questionsLength, answer, dispatch }) {
	if (answer === null) return;

	return (
		<>
			{questionIndex < questionsLength - 1 && (
				<button
					className="btn btn-ui"
					onClick={() => dispatch({ type: 'nextQuestion' })}>
					Next
				</button>
			)}
			{questionIndex === questionsLength - 1 && (
				<button
					className="btn btn-ui"
					onClick={() => dispatch({ type: 'finish' })}>
					Finish
				</button>
			)}
		</>
	);
}

export default FooterBtns;
