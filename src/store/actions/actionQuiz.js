import axios from '../../axios/axios-quiz'
import {FETCH_QUIZES_START, 
        FETCH_QUIZES_SUCCESS, 
        FETCH_QUIZES_ERROR, 
        FETCH_QUIZ_SUCCES, 
        QUIZ_SET_STATE, 
        FINISH_QUIZ, 
        QUIZ_NEXT_QUESTION,
        QUIZ_RETRY} from './actionTypes';

export function fetchQuizes() { //эта функция делает несколько диспатчей (изменяет состояние нескольк раз )
  return async (dispatch) => {

    dispatch(fetchQuizesStart()) //таким образмо меняем состояние

    try{
      const response = await axios.get('https://react-quiz-2b791.firebaseio.com/quizes.json') //response.data - объект внутри которого массивы с объектами

      console.log("QuizList ", response.data)

      const quizes = []

      Object.keys(response.data).forEach((key, index)=> {
        quizes.push({
          id: key,
          name: `Тест № ${index+1}`
        }) 
      })

      dispatch(fetchQuizesSuccess(quizes))
    
    } catch(e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(`/quizes/${quizId}.json`)
     
      const quiz = response.data
      
      dispatch(fetchQuizSuccess(quiz))
    
    } catch(e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCES,
    quiz: quiz
  }
}

export function fetchQuizesStart(){
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes){
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes: quizes

  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function quizSetState(answerState, results){
  return {
    type: QUIZ_SET_STATE,
    answerState: answerState,
    results: results
  }
}

export function finishQuiz(){
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(number){
  return {
    type: QUIZ_NEXT_QUESTION, 
    number: number
  }
}

export function quizAnswerClick(answerId) {

  return (dispatch, getState) => {

    const state = getState().quiz
    console.log(state)
    if(state.answerState) { // отмена двойного(или больше) нажатия на правильный ответ
      const key = Object.keys(state.answerState)[0]

      if(state.answerState[key] === 'succes') {
        return
      }
    }    

    const question = state.quiz[state.activeQuestion] // один объект с ответами и вопросом
    const results = state.results

    if(question.rightAnswerId === answerId) { //если ответ правильный

      if(!results[question.id]) {
        results[question.id] = 'green'
      }

      dispatch( quizSetState({[answerId] : 'succes'}, results))

      const timeout = window.setTimeout(() => {
        if(isQuizFinished(state)){ //если вопросы закончились
          dispatch(finishQuiz())
        
        }else { //если вопросы не закончились
        
          dispatch(quizNextQuestion(state.activeQuestion + 1))
          
        }
        window.clearTimeout(timeout)
      }, 1000)      
     
    } else { //если ответили неправильно
      results[question.id] = 'error'

      dispatch(quizSetState({[answerId] : 'error'}, results))

    }  
    
    console.log(state.results)
  }
}

export function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz(){
  return {
    type: QUIZ_RETRY
  }
}





