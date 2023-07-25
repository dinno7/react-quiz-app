import Options from './Options';

function Questions({ question, answer, dispatch }) {
	return (
		<div>
			<h4>{question.question}</h4>
			<div className="options">
				<Options question={question} answer={answer} dispatch={dispatch} />
			</div>
		</div>
	);
}

export default Questions;
