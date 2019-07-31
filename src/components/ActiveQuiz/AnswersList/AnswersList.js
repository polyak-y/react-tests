import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => {
 /*  console.log(props.answers); - массив ответов*/
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((elem, index) => {
       
        return (
          <AnswerItem 
            key={index} 
            answerOne={elem} /* elem - один элемент массива - объект с одним ответом */
            onAnswerClick = {props.onAnswerClick}
            classColor={props.classColor ? props.classColor[elem.id] : null} /* props.classColor[elem.id] - succes или error */
          />
        )
      })}
    </ul>
  )
}
 
export default AnswersList //подключается в ActiveQuiz.js 