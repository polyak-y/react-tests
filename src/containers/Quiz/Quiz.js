import React, { Component } from 'react';
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz"
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/actionQuiz';
 
class Qiuz extends Component {

  componentDidMount(){
    this.props.fetchQuizById(this.props.match.params.id)
    console.log("Quiz ID = " + this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={classes.Quiz}>

        <div className={classes.QuizWrapper}>

          {!this.props.isFinished ? <h1>Ответьте на все вопросы</h1> : <h1>Опрос окончен</h1>} 

          {
            this.props.loading  || !this.props.quiz
             ? <Loader />
             : this.props.isFinished 
                ? <FinishedQuiz  /* Когда закончен опрос - вывод результатов */
                    results={this.props.results}
                    quiz={this.props.quiz} /* массив из всех вопросов (с ответами) */
                    onRepeat={this.props.retryQuiz}
                  />
                : <ActiveQuiz /* Когда не окончен опрос - вывод вопросов */
                    onAnswerClick={this.props.quizAnswerClick} 
                    answers={this.props.quiz[this.props.activeQuestion].answers} //один массив из ответов
                    question={this.props.quiz[this.props.activeQuestion].question} //один вопрос
                    quizLength = {this.props.quiz.length} // количество вопросов в анкете
                    answerNumber = {this.props.activeQuestion + 1} // номер элемента массива
                    classColor = {this.props.answerState}
                  />  
          } 
          
        </div>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results, 
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState, // { [id]: 'success' 'error' } Подсветка правильных и неправильных ответов
    quiz: state.quiz.quiz
  }
}

function mapDispatchtoProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect (mapStateToProps, mapDispatchtoProps)(Qiuz);  //подключается в App.js
