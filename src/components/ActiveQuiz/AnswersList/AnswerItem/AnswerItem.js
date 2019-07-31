import React from 'react'
import classes from './AnswerItem.css'

const AnswerItem = props => {
  const cls = [classes['AnswerItem']]/*  добавили класс AnswerItem */
  if(props.classColor) {
    cls.push(classes[props.classColor]) /* classes[props.classColor] - error или succes */
  } 
  
  return (
    <li className={cls.join(' ')} onClick={() => props.onAnswerClick(props.answerOne.id)}>
      {props.answerOne.text} 
    </li>
  )
}

export default AnswerItem  //подключается в AnswersList.js 