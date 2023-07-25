import { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Loader from './components/Loader';
import Error from './components/Error';
import Main from './components/Main';
import StartScreen from './components/StartScreen';
import Questions from './components/Questions';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import FooterBtns from './components/FooterBtns';
import Footer from './components/Footer';
import Timer from './components/Timer';

const SEC_PER_QUESTION = 30;
const initialArg = {
	questions: [],

	// >> loading, error, ready, active, finished
	status: 'loading',
	questionIndex: 0,
	answer: null,
	points: 0,
	highestScore: 0,
	remainingTime: null,
};

function reducer(state, action) {
	function setDate(data) {
		return { ...state, ...data };
	}

	switch (action.type) {
		case 'dataReceived':
			return setDate({
				questions: action.payload,
				status: 'ready',
			});
		case 'dataFailed':
			return setDate({ status: 'error' });
		case 'start':
			return setDate({
				status: 'active',
				remainingTime: SEC_PER_QUESTION * state.questions.length,
			});
		case 'answered': {
			const question = state.questions[state.questionIndex];
			const userAnswer = action.payload;
			return setDate({
				answer: userAnswer,
				points:
					userAnswer == question.correctOption
						? state.points + question.points
						: state.points,
			});
		}
		case 'nextQuestion':
			return setDate({
				answer: null,
				questionIndex: state.questionIndex + 1,
			});
		case 'finish':
			return setDate({
				status: 'finished',
				highestScore:
					state.highestScore > state.points ? state.highestScore : state.points,
			});

		case 'restart':
			return setDate({
				...initialArg,
				questions: state.questions.sort(() => Math.random() - 0.5),
				status: 'ready',
				highestScore: state.highestScore,
			});
		case 'tick':
			return setDate({
				remainingTime: state.remainingTime - 1,
				status: state.remainingTime === 0 ? 'finished' : state.status,
			});

		default:
			throw new Error('There is some problem!');
	}
}

function App() {
	const [
		{
			questions,
			questionIndex,
			status,
			answer,
			points,
			highestScore,
			remainingTime,
		},
		dispatch,
	] = useReducer(reducer, initialArg);

	useEffect(() => {
		fetch('http://localhost:3000/questions')
			.then((res) => res.json())
			.then((data) => {
				if (!data || !data?.length) {
					throw new Error('There is something wrong');
				}
				return dispatch({ type: 'dataReceived', payload: data });
			})
			.catch(() => dispatch({ type: 'dataFailed' }));
		return () => {};
	}, []);

	const maxPointsPossible = questions.reduce(
		(prev, curr) => prev + curr.points,
		0,
	);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen
						numQuestion={questions?.length || 0}
						dispatch={dispatch}
					/>
				)}
				{status === 'active' && (
					<>
						<Progress
							questionIndex={questionIndex}
							questionsLength={questions.length}
							maxPointsPossible={maxPointsPossible}
							points={points}
							answer={answer}
						/>
						<Questions
							question={questions[questionIndex]}
							answer={answer}
							dispatch={dispatch}
						/>
						<Footer>
							<>
								<Timer dispatch={dispatch} time={remainingTime} />
								<FooterBtns
									answer={answer}
									dispatch={dispatch}
									questionsLength={questions.length}
									questionIndex={questionIndex}
								/>
							</>
						</Footer>
					</>
				)}

				{status === 'finished' && (
					<FinishScreen
						dispatch={dispatch}
						highscore={highestScore}
						maxPossiblePoints={maxPointsPossible}
						points={points}
					/>
				)}
			</Main>
		</div>
	);
}

export default App;
