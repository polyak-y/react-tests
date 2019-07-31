import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = (props) => { 
  return (    
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{props.answerNumber}. </strong>
          {props.question}
        </span>
        <small>{props.answerNumber} из {props.quizLength}</small>
      </p>

      <AnswersList 
        onAnswerClick={props.onAnswerClick} 
        answers={props.answers} 
        classColor={props.classColor}
      />
    </div>
  )
}

export default ActiveQuiz //подключается в Quiz.js