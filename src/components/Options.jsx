function Options({ question, answer, dispatch }) {
	return (
		<>
			{question.options.map((opt, index) => (
				<button
					className={`btn btn-option ${
						answer === null
							? ''
							: index === question.correctOption
							? 'correct'
							: 'wrong'
					} ${answer === index ? 'answer' : ''}`}
					key={opt}
					disabled={answer !== null}
					onClick={() => dispatch({ type: 'answered', payload: index })}>
					{opt}
				</button>
			))}
		</>
	);
}

export default Options;
